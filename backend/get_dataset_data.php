<?php

    $user_id = isset($data['user_id']) ? $data['user_id'] : null;
   
    $qry = "select * from users where user_id = '$user_id' limit 1";
    $result = mysqli_query($con, $qry);

    $dataset_ = [];
    if($result -> num_rows > 0){
        while($user_row = $result -> fetch_assoc()){
            $model_id = $user_row['active_project'];

            $project_req = "select *  from projects where model_id = '$model_id' limit 1";
            $project_res = mysqli_query($con, $project_req);

            if($project_res -> num_rows > 0){
                while($project_row = $project_res -> fetch_assoc()){
                    $project_name = $project_row['project_name'];
                    $project_des = $project_row['project_des'];

                    

                    $model_req = "select * from models where model_id = '$model_id' limit 1";
                    $model_res = mysqli_query($con, $model_req);

                    if($model_res -> num_rows > 0){
                        while($model_row = $model_res -> fetch_assoc()){
                            $model_name = $model_row['model_name'];
                            $model_type = $model_row['model_type'];

                            $metric_name = $model_row['metric_name'];
                            $metric = $model_row['metric'];
                            $accuracy = $model_row['accuracy'];

                            $training_dataset = $model_row['training_dataset'];

                            $dataArray = json_decode($training_dataset, true);

                            $training_dataset_ = array_slice($dataArray, -50);


                            $pred_req = "select * from predictions where model_id = '$model_id' limit 1";
                            $pred_res = mysqli_query($con, $pred_req);

                            if($pred_res -> num_rows > 0){
                                while($pred_row = $pred_res -> fetch_assoc()){
                                    $predictions = $pred_row['predictions'];
                                    $interval = $pred_row['forecast_interval'];

                                    $dataset_ = [
                                        "project_name" => $project_name,
                                        "project_des" => $project_des,
                                        "model_name" => $model_name,
                                        "model_type" => $model_type,
                                        "metric_name" => $metric_name,
                                        "metric" => $metric,
                                        "accuracy" => $accuracy,
                                        "dataset" => $training_dataset_,
                                        "predictions" => $predictions,
                                        "interval" => $interval
                                    ];

                                    $dataset_ = json_encode($dataset_);
                                    
                                }
                            }
                        }
                    }
                }
            }
        }
    }

























   