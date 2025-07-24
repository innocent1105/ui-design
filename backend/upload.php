<?php

include("./connection.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user_id = $_POST['userId'] ?? '';
    $post_text = $_POST['postText'] ?? '';
    $feeling = $_POST['feeling'] ?? '';
    $location = $_POST['location'] ?? '';

    if (empty($user_id) || empty($post_text)) {
        echo json_encode(["success" => false, "message" => "Missing userId or postText"]);
        exit;
    }

    $uploaded_image_paths = [];

    if (!empty($_FILES['images']['name'][0])) {
        $upload_dir = "uploads/";

        foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
            $file_name = basename($_FILES['images']['name'][$key]);
            $file_tmp = $_FILES['images']['tmp_name'][$key];
            $new_file_name = uniqid() . "_" . $file_name;
            $file_path = $upload_dir . $new_file_name;

            if (move_uploaded_file($file_tmp, $file_path)) {
                $uploaded_image_paths[] =  $new_file_name;
            }
        }
    }

    // Convert images array to JSON string
    $images_json = json_encode($uploaded_image_paths);

    // Insert post with image paths as JSON string
    $stmt = $con->prepare("INSERT INTO posts (user_id, post_text, location, images) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $user_id, $post_text, $location, $images_json);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Post uploaded successfully"]);
    } else {
        echo json_encode(["success" => false, "message" => "Failed to upload post"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid request method"]);
}
?>
