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

    $qry = "select * from users where user_id = '$user_id' limit 1";
    $result = mysqli_query($con, $qry);

    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            $user_name = $row['username'];
            $active_project = $row['active_project'];

            if(empty($active_project) || $active_project == ""){
                $active_project = "none";
            }

            echo json_encode([
                "username" => $user_name,
                "active_project" => $active_project
            ]);

        }
    }else{
        echo json_encode(["error"]);
    }


    exit();
?>























