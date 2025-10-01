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

    $user_id = isset($data['data']['user_id']) ? $data['data']['user_id'] : null;
    $id = isset($data['data']['id']) ? $data['data']['id'] : null;

    $qry = "update users set active_project = '$id' where user_id = '$user_id' limit 1";
    $result = mysqli_query($con, $qry);

    if($result){
        echo json_encode("success");
    }else{
        echo json_encode("error");
    }

    exit();
?>

