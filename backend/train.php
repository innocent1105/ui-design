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

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid or missing JSON"]);
    exit();
}

// === Extract user info ===
$user_data = $data['user_data']['data'];
$user_id   = $user_data['user_id'] ?? null;
$email     = $user_data['email'] ?? null;
$status    = $user_data['status'] ?? null;

function cleanAndPrepareForProphet($ds_raw, $y_raw) {
    $data = [];

    $maxIndex = min(count($ds_raw), count($y_raw));

    for ($i = 0; $i < $maxIndex; $i++) {
        $dateVal = trim($ds_raw[$i]);
        $yVal    = trim($y_raw[$i]);

        if (strtotime($dateVal)) {
            $parsedDate = date('Y-m-d', strtotime($dateVal));
        } elseif (ctype_digit($dateVal) && strlen($dateVal) == 4) {
            $parsedDate = $dateVal . '-01-01';
        } else {
            continue; // skip invalid date rows
        }

        // Parse numeric value
        if (!is_numeric($yVal)) {
            preg_match('/\d+(\.\d+)?/', $yVal, $matches);
            $yVal = $matches[0] ?? null;
        }

        if ($parsedDate && is_numeric($yVal)) {
            $data[] = [
                'ds' => $parsedDate,
                'y'  => (float)$yVal
            ];
        }
    }

    // Sort chronologically
    usort($data, fn($a, $b) => strtotime($a['ds']) - strtotime($b['ds']));

    return $data;
}

if ($status === "success") {

    $targetColumn = $data['targetColumn']['data'] ?? [];
    $datetime = $data['import_data']['data']['data'][$data['datetime']['id']] ?? [];

    $main_dataset_ = json_encode($data['import_data']['data']['data'] ?? []);


   

    array_shift($targetColumn);
    array_shift($datetime);
    $alignedDates = [];
    $alignedValues = [];
    $maxIndex = min(count($targetColumn), count($datetime));

    for ($i = 0; $i < $maxIndex; $i++) {
        if (is_numeric($targetColumn[$i]) && strtotime($datetime[$i])) {
            $alignedValues[] = (float)$targetColumn[$i];
            $alignedDates[]  = $datetime[$i];
        }
    }


    file_put_contents('debug.log', json_encode([
        'aligned_dates_count' => count($alignedDates),
        'aligned_values_count' => count($alignedValues),
        'sample_dates' => array_slice($alignedDates, 0, 5),
        'sample_values' => array_slice($alignedValues, 0, 5)
    ], JSON_PRETTY_PRINT));

    
    $clean_dataset = cleanAndPrepareForProphet($alignedDates, $alignedValues);

    $projectData    = json_decode($data['project_data']['data'] ?? '{}', true);
    $projectDetails = $projectData['projectDetails'] ?? [];
    $projectId      = rand(1000, 7000);
    $ProjectName    = $projectDetails['projectName'] ?? 'Untitled Project';
    $projectDes     = $projectDetails['projectDes'] ?? '';

    $payload = [
        "system"      => "Precision-ai",
        "dataset"     => $alignedValues,
        "date_values" => $alignedDates,
        "project_id"  => $projectId
    ];

    $ch = curl_init("http://127.0.0.1:7000/api");
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    http_response_code($httpCode);

    $responseData = json_decode($response, true);
    if (!$responseData) {
        echo json_encode(["error" => "Invalid JSON response from Python"]);
        exit();
    }

    // === Save model and project ===
    $accuracy     = $responseData['message']['accuracy'];
    $mape         = $responseData['message']['mape'];
    $modelName    = $responseData['message']['model_name'];
    $modelType    = $responseData['message']['model_type'];
    $forecastData = $responseData['message']['forecasts'];
    $model_id     = (rand(20000, 700000) / 4) * rand(100, 500);

    $clean_dataset = json_encode($clean_dataset);

    $sql = "INSERT INTO models (user_id, model_id, model_name, model_type, accuracy, metric, training_dataset) 
            VALUES ('$user_id', '$model_id', '$modelName', '$modelType', '$accuracy', '$mape', '$clean_dataset')";
    if (mysqli_query($con, $sql)) {
        $qry = "INSERT INTO projects (user_id, project_name, project_des, model_name, model_id) 
                VALUES ('$user_id', '$ProjectName', '$projectDes', '$modelName', '$model_id')";
        if (mysqli_query($con, $qry)) {

            $save_dataset = "insert into datasets (user_id, model_id, dataset, dataset_type)
                values ('$user_id', '$model_id', '$main_dataset_', 'excel-data') 
            ";
            $save_result = mysqli_query($con, $save_dataset);
            if ($save_result) {
                echo json_encode([
                    "accuracy"   => $accuracy,
                    "mape"       => $mape,
                    "model_name" => $modelName,
                    "model_id"   => $model_id,
                    "model_type" => $modelType,
                    "forecasts"  => $forecastData,
                    "dataset"    => $clean_dataset,
                    "status"     => "success"
                ]);
            }


           
        } else {
            echo json_encode(["status" => "error - failed to save project"]);
        }
    } else {
        echo json_encode(["status" => "error - failed to save model"]);
    }

} else {
    echo json_encode(["status" => "unknown user"]);
}
