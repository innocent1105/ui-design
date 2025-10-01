<?php

use BcMath\Number;

    include("./connection.php");

    header("Access-Control-Allow-Origin: *"); // Allow from all domains (for dev)
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");

    // Receive JSON
    $data = json_decode(file_get_contents("php://input"), true);

    $user_id = $data['user_id'];
    $other_user_id = $data['otherUser'];

   
    
    $qry = "select * from chats where sender = '$user_id' and reciever = '$other_user_id'";
    $result = mysqli_query($con,$qry);

    if($result -> num_rows < 0){
        $qry = "UPDATE messages 
        SET status = 'seen' 
        WHERE sender = ? AND reciever = ?
    ";

        $stmt = mysqli_prepare($con, $qry);
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ss",  $other_user_id, $user_id);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(["error" => "Failed to prepare statement"]);
        }

        $qry = "UPDATE chats 
            SET status = 'seen' 
            WHERE sender = ? AND reciever = ?";

        $stmt = mysqli_prepare($con, $qry);
        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "ss",  $other_user_id, $user_id);
            mysqli_stmt_execute($stmt);
            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(["error" => "Failed to prepare statement"]);
        }
    }




   















    $messages = [];
    $query = "SELECT * FROM messages 
        WHERE (sender = '$user_id' AND reciever = '$other_user_id') 
        OR (sender = '$other_user_id' AND reciever = '$user_id') 
        ORDER BY date_created ASC
    "; 
    $result = mysqli_query($con, $query);
    
    $key = 0;
    if($result -> num_rows > 0){
        while($row = $result->fetch_assoc()){
            $sender = $row['sender'];
            $reciever = $row['reciever'];
            $message = $row['message'];
            $message_type = $row['message_type'];
            $status = $row['status'];
            $date = $row['date_created'];
            
            if($user_id == $sender){
                $sender = true;
            }else{
                $sender = false;
            }
            
            $key++;
            $message_data = [
                "id" =>  $row['id'],
                "text" => $message,
                "fromMe" => $sender,
                "to" => $reciever,
                "message_type" => $message_type,
                "status" => $status,
                "date" => $date
            ];
            array_push($messages, $message_data);
        }
    }

    echo json_encode($messages);

?>
