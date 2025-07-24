<?php

    include("./connection.php");

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");
    $data = json_decode(file_get_contents("php://input"), true);

    $user_id = $data['user_id'];

    $qry = "select * from matches where user_id = '$user_id'";
    $result = mysqli_query($con, $qry);

    $users = [];

    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            $liked_user = $row['other_user'];

            $sql = "select * from users where user_id = '$liked_user' limit 1";
            $res = mysqli_query($con, $sql);
            if($res->num_rows > 0){
                while($user = $res->fetch_assoc()){
                    $username = $user['username'];
                    $email = $user['email'];
                    $phone_number = $user['phone_number'];
                    $whatsapp = $user['whatsapp'];
                    $pp = $user['pp'];
                    $dob = $user['dob'];
                    $gender = $user['gender'];
                    $occupation = $user['occupation'];
                    $country = $user['country'];
                    $city = $user['city'];
                    $long = $user['long'];
                    $lat = $user['lat'];

                    $years = 23;
                    
                    $user_det = [
                        "user_id" => $liked_user,
                        "username" => $username,
                        "email" => $email,
                        "phone_number" => $phone_number,
                        "whatsapp" => $whatsapp,
                        "pp" => $pp,
                        "dob" => $dob,
                        "years" => $years,
                        "gender" => $gender,
                        "occcupation" => $occupation,
                        "country" => $country,
                        "city" => $city,
                        "long" => $long,
                        "lat" => $lat
                    ];

                    array_push($users, [$user_det]);
                }
            }
        }

        echo json_encode($users);
    }else{
        echo "no matches";
    }

    exit();
?>
