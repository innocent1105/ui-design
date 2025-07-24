<?php

use BcMath\Number;

use function PHPSTORM_META\type;

    include("./connection.php");

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");

    // Receive JSON
    $data = json_decode(file_get_contents("php://input"), true);

    $userId = $data['user_id'];
    $recieverId = $data['otherUser'];
    $message = $data['message'];
    $date = $data['date'];



    $query = "SELECT * FROM chats 
        WHERE (sender = '$userId' AND reciever = '$recieverId') 
        OR (sender = '$recieverId' AND reciever = '$userId')
    ";

    $result = mysqli_query($con, $query);

    if ($result -> num_rows === 0){
        $qry = "INSERT INTO chats (sender, reciever, message, message_type, status) 
            VALUES (?, ?, ?, 'text', 'sent')
        ";

        $stmt = mysqli_prepare($con, $qry);
        mysqli_stmt_bind_param($stmt, "sss", $userId, $recieverId, $message);
        $inserted = mysqli_stmt_execute($stmt);

        if (!$inserted) {
            echo json_encode(["error" => "Failed to add to chats"]);
        }
    } else {
        $qry = "UPDATE chats 
            SET message = ?, message_type = 'text', status = 'sent' 
            WHERE (sender = ? AND reciever = ?) OR (sender = ? AND reciever = ?)
        ";
        $stmt = mysqli_prepare($con, $qry);
        mysqli_stmt_bind_param($stmt, "sssss", $message, $userId, $recieverId, $recieverId, $userId);

        $updated = mysqli_stmt_execute($stmt);

        if (!$updated) {
            echo json_encode(["error" => "Failed to update chats"]);
        }
        
    }




    

    $qry = "insert into messages (sender, reciever, message, message_type, status) values ('$userId', '$recieverId', '$message', 'text', 'sent')";
    $result = mysqli_query($con, $qry);
    
    if($result){
        echo json_encode("sent");
    }else{
        echo json_encode("error");
    }


?>
