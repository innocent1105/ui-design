<?php

    include "connection.php";
    header("Content-Type: application/json");
    $rawInput = file_get_contents("php://input");
    $data = json_decode($rawInput, true);

    $user_id = $data['data']['user_id'];
   
    $qry = "select * from users where user_id = $user_id limit 1";
    $result = mysqli_query($con, $qry);

    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            $model_id = $row['active_project'];

            $qry2 = "select * from datasets where model_id = '$model_id' limit 1";
            $res = mysqli_query($con, $qry2);

            if($res -> num_rows > 0){
                while($model_data = $res -> fetch_assoc()){
                    $dataset_ = $model_data['dataset'];

                    echo json_encode($dataset_);
                }
            }else{
                echo json_encode(["error 2"]);
            }
        }
    }else{
        echo json_encode(["error 1"]);
    }

























   