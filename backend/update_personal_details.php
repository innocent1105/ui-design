<?php

include("./connection.php");

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Receive JSON input
$data = json_decode(file_get_contents("php://input"), true);

// Check if required fields exist
if (!isset($data['user_id']) || !isset($data['request']) || !isset($data['data'])) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required parameters"
    ]);
    exit;
}

$user_id = mysqli_real_escape_string($con, $data['user_id']);
$request = mysqli_real_escape_string($con, $data['request']);
$userData = $data['data'];

if ($request === "save-personal-data") {
    $username = mysqli_real_escape_string($con, $userData['username']);
    $fullname = mysqli_real_escape_string($con, $userData['fullname']);
    $email = mysqli_real_escape_string($con, $userData['email']);
    $phone = mysqli_real_escape_string($con, $userData['phoneNumber']);

    $query = "UPDATE users 
              SET username = '$username', 
                  fullname = '$fullname', 
                  email = '$email', 
                  phone_number = '$phone' 
              WHERE user_id = '$user_id'";

    $res = mysqli_query($con, $query);

    if ($res) {
        echo json_encode([
            "status" => "success",
            "message" => "User details updated successfully"
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Failed to update user details"
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request type"
    ]);
}

?>
