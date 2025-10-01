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

    // === Read and decode raw input ===
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    $user_id = isset($data['user_id']) ? $data['user_id'] : null;
    $model_id = isset($data['model_id']) ? $data['model_id'] : null;
    $model_name = isset($data['model_name']) ? $data['model_name'] : null;
    $interval = isset($data['interval']) ? $data['interval'] : null;
    $predictions = isset($data['predictions']) ? $data['predictions'] : null;

    $qry = "select * from predictions where model_id = '$model_id' limit 1";
    $result = mysqli_query($con ,$qry);

    if($result -> num_rows > 0){
        $del = "delete from predictions where model_id = '$model_id' ";
        $del_res = mysqli_query($con, $del);
        if(!$del_res){
            
        }
    }

    
    $qry = "insert into predictions (user_id, model_id, predictions, forecast_interval) values ('$user_id', '$model_id', '$predictions', '$interval')";
    $res = mysqli_query($con, $qry);

    if($res){
        $sql = "update users set active_project = '$model_id' where user_id = '$user_id' ";
        $update_res = mysqli_query($con, $sql);

        if($update_res){
            echo json_encode(["status" => "success", "message" => "Prediction saved successfully"]);
            exit();
        }


       
    }else{
        echo json_encode(["status" => "failed", "message" => "An error occurred, failed to save predictions"]);
        exit;
    }


?>

















