<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    include("connection.php");
    header("Content-Type: application/json");

    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);
    $data = $data['data'];

    $user_id = isset($data['user_id']) ? $data['user_id'] : null;
    $model_name = isset($data['model_name']) ? $data['model_name'] : "gemini-2.0-flash";
    $message = isset($data['message']) ? $data['message'] : null;
    $conversations = isset($data['conversations']) ? $data['conversations'] : null;

    include "./get_dataset_data.php";

    $qry = "INSERT INTO ai_chats (user_id, prompt, ai_response, sender, model_name) 
            VALUES ('$user_id', '$message', '', 'user', '$model_name')";
    $result = mysqli_query($con, $qry);

    if (!$result) {
        echo json_encode(["error" => "failed to save prompt"]);
        http_response_code(400);
        exit();
    }

    $apiKey = 'AIzaSyCQHCDQsFF5YGFh9xMxgPK0Z-Tdo8wuWXI'; 
    $url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

    $system_settings = "
        You are Precision AI — a smart, friendly forecasting assistant here to help users make sense of their data,
        spot business trends, and find real ways to boost sales and revenue.
        
        Your main priorities:
        - Always keep the user's business goals front and center.
        - Always answer their questions directly and clearly.
        
        How you should respond:
        1. Take into account what the user has shared before (past chats, project details, datasets) so your advice feels connected and relevant.
        2. Keep your tone business-friendly but warm and approachable — like a helpful teammate, not a textbook.
        3. Only ask follow-up questions when they genuinely help; don’t overload the user.
        4. Stick to the facts — never make up data or assumptions.
        5. If the user asks about something outside business or datasets, just help them like a normal assistant would, and end there, dont say anything about the data, but free to ask questions.
        6. Be honest and realistic. Users value transparency over sugar-coating.
        7. Present your ideas in a clean way (headings, bullet points, short paragraphs) to make them easy to read.
        8. When talking about forecasts, explain the 'why' behind trends and explore simple 'what if' scenarios so users can see possible outcomes.
        9. Point out important risks and opportunities clearly so the user knows where to focus.
        10. Keep things simple. Avoid technical jargon unless the user specifically asks for a deeper, more technical explanation.
    ";
    

    $payload = [
        'contents' => [
            [
                'parts' => [
                    ['text' => $system_settings], 
                    ['text' => $conversations], 
                    ['text' => $message], 
                    ['text' => $dataset_]    
                ]
            ]
        ]
    ];


    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'X-goog-api-key: ' . $apiKey
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

    $apiResponse = curl_exec($ch);
    if (curl_errno($ch)) {
        echo json_encode(["error" => "Gemini API error: " . curl_error($ch)]);
        exit();
    }
    curl_close($ch);

    $decoded = json_decode($apiResponse, true);
    $aiMessage = $decoded['candidates'][0]['content']['parts'][0]['text'] ?? "No response";

    $aiMessageEscaped = mysqli_real_escape_string($con, $aiMessage);

    $qry = "INSERT INTO ai_chats (user_id, prompt, ai_response, sender, model_name) 
    VALUES ('$user_id', '$aiMessageEscaped', '', 'precision-gemini', '$model_name')";

    $result = mysqli_query($con, $qry);

    if (!$result) {
        echo json_encode(["error" => "failed to save prompt"]);
        http_response_code(400);
        exit();
    }




    $response = [
        "sender" => "precision",
        "message" => $aiMessage,
        "model_name" => $model_name,
        "status" => 200
    ];

    echo json_encode($response);
    exit(200);
?>
