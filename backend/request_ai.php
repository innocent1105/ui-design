<?php
// Replace with your actual API key
$apiKey = 'GEMINI_API_KEY';
$url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// The data payload
$data = [
    'contents' => [
        [
            'parts' => [
                ['text' => 'Explain how AI works in a few words']
            ]
        ]
    ]
];

// Initialize cURL
$ch = curl_init($url);

// Set cURL options
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-goog-api-key: ' . $apiKey
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

$response = curl_exec($ch);

if (curl_errno($ch)) {
    echo 'Request Error: ' . curl_error($ch);
} else {

    echo $response;
}

curl_close($ch);
