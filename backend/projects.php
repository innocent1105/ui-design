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

    $qry = "select * from projects where user_id = '$user_id'";
    $result = mysqli_query($con, $qry);

    $projects = [];
    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            $id = $row['model_id'];
            $project_name = $row['project_name'];
            $project_des = $row['project_des'];
            $model_name = $row['model_name'];
            $date = $row['date_created'];

            
            array_push($projects, [
                "id" => $id,
                "project_name" => $project_name,
                "project_des" => $project_des,
                "model_name" => $model_name,
                "date" => $date
            ]);
        }
    
        echo json_encode($projects);
    }else{
        echo json_encode(["error"]);
    }


    exit();
?>























