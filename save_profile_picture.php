<?php

    include("./connection.php");

    header("Access-Control-Allow-Origin: *"); 
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");

    // Receive JSON
    $data = json_decode(file_get_contents("php://input"), true);

    
 


    function updateProfilePicture($data, $con){
        $user_id = stripslashes($_POST['user_id']);
        $request = stripslashes($_POST['request_type']);
      

        if (!empty($_FILES['image']['name'])) {
            $upload_dir = "profilepictures/";
        
            $file_name = basename($_FILES['image']['name']);
            $file_tmp = $_FILES['image']['tmp_name'];
            $new_file_name = uniqid() . "_" . $file_name;
            $file_path = $upload_dir . $new_file_name;
        
            if (move_uploaded_file($file_tmp, $file_path)) {
                $qry = "UPDATE users SET pp = '$new_file_name' WHERE user_id = '$user_id'";
                $res = mysqli_query($con, $qry);

                if($res){
                    echo json_encode([
                        "status" => "success",
                        "file" => $new_file_name
                    ]);
                }else{
                    echo json_encode([
                        "status" => "error",
                        "message" => "Failed to upload image"
                    ]);
                } 
            } else {
                echo json_encode([
                    "status" => "error",
                    "message" => "Failed to upload image."
                ]);
            }
        } else {
            echo json_encode([
                "status" => "error",
                "message" => "No image uploaded."
            ]);
        }
    }


    updateProfilePicture($data, $con);











