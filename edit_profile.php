<?php

    include("./connection.php");

    header("Access-Control-Allow-Origin: *"); 
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");

    // Receive JSON
    $data = json_decode(file_get_contents("php://input"), true);

    $user_id = stripslashes($data['user_id']);
    $request = stripslashes($data['request_type']);
 
    
    function getUserData($user_id, $con){
        $users = [];

        $sql = "select * from users where user_id = '$user_id' limit 1 ";
        $result = mysqli_query($con, $sql);

        if($result -> num_rows > 0) { 
            while($row = $result -> fetch_assoc()){ 
                $user = [];
                $user_id = $row['user_id'];
                $username = $row['username'];
                $fullnames = $row['fullname'];
                $email = $row['email'];
                $phone_number = $row['phone_number'];
                $profile_picture = $row['pp'];
            
                $country = $row['country'];
                $city = $row['city'];


                $user = [$user_id, $username, $fullnames, $email, $phone_number, $profile_picture, $country, $city];
                array_push($users, $user);
            }

            echo json_encode($users);
        }else{
            echo json_encode([$user_id]);
        }
    }

 



    if($request == "getUserData"){
        getUserData($user_id, $con);
    }










