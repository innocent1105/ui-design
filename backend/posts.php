<?php

    include("./connection.php");

    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");

    $qry = "select * from posts limit 10";
    $result = mysqli_query($con, $qry);

    $posts = [];

    if($result -> num_rows > 0){
        while($row = $result -> fetch_assoc()){
            $post_id = $row['id'];
            $post_user_id = $row['user_id'];
            $post_text = $row['post_text'];
            $post_images = $row['images'];
            $views = $row['views'];
            $likes = $row['likes'];
            $comments = $row['comments'];
            $shares = $row['shares'];
            $date = $row['date_created'];
           
            $sql = "select * from users where user_id = '$post_user_id' limit 1";
            $sql_result = mysqli_query($con, $sql);
            
            if($sql_result -> num_rows > 0){
                while($user_det = $sql_result -> fetch_assoc()){
                    $username = $user_det['username'];
                    $profile_pp = $user_det['pp'];
                }
            }

            $post_data = [
                "id" => $post_id ,
                "user_id" => $post_user_id,
                "username" => $username,
                "pp" => $profile_pp,
                "text" => $post_text,
                "images" => $post_images,
                "views" => $views,
                "likes" => $likes,
                "comments" => $comments,
                "shares" => $shares,
                "date" => $date
            ];
            array_push($posts, $post_data);
        }

        echo json_encode($posts);
    }

?>
