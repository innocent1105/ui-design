<?php

include("./connection.php");

header("Access-Control-Allow-Origin: *"); 
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");

// Receive JSON
$data = json_decode(file_get_contents("php://input"), true);

$auth_user_id = stripslashes($data['user_id']);

$users = [];

$query = "
    SELECT * FROM chats 
    WHERE sender = '$auth_user_id' OR reciever = '$auth_user_id' 
    ORDER BY date_created ASC
"; 

$res = mysqli_query($con, $query);  

if ($res && $res->num_rows > 0) {
    while ($chat_row = $res->fetch_assoc()) {
        // Identify the other user in the chat
        $other_user_id = ($chat_row['sender'] === $auth_user_id) ? $chat_row['reciever'] : $chat_row['sender'];

        $sql = "SELECT * FROM users WHERE user_id = '$other_user_id' LIMIT 1";
        $result = mysqli_query($con, $sql);

        if ($result && $result->num_rows > 0) {
            $row = $result->fetch_assoc();

            $chat_user_id = $row['user_id'];
            $username = $row['username'];
            $profile_picture = $row['pp'];
            $time = date('d M , h:i A', strtotime($chat_row['date_created']));

            $message = $chat_row['message'];
            $message_type = $chat_row['message_type'];
            $status = $chat_row['status'];

            $is_sender = $chat_row['sender'] === $auth_user_id;

            $user = [
                $chat_user_id,
                $username,
                $profile_picture,
                $time,
                $message,
                $message_type,
                $status,
                $is_sender
            ];

            array_push($users, $user);
        }
    }
}

echo json_encode(array_reverse($users));
exit();

?>
