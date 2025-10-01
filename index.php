<?php
    include("./connection.php");

    // Set response headers
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    // Decode JSON body
    $input = json_decode(file_get_contents("php://input"), true);

    if (!$input || !isset($input['data'])) {
        echo json_encode([
            "success" => false,
            "message" => "Invalid input data."
        ]);
        exit;
    }

    $data = $input['data'];

    // Extract data
    $name = $data['name'] ?? '';
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    $confirmPassword = $data['confirmPassword'] ?? '';
    $termsAccepted = $data['termsAndConditions'] ?? false;

    // Validate required fields
    if (!$name || !$email || !$password || !$confirmPassword || !$termsAccepted) {
        echo json_encode([
            "success" => false,
            "message" => "All fields are required and terms must be accepted."
        ]);
        exit;
    }

    // Check password match
    if ($password !== $confirmPassword) {
        echo json_encode([
            "success" => false,
            "message" => "Passwords do not match."
        ]);
        exit;
    }

    // Hash password (you can use bcrypt or password_hash)
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    $user_id = random_int(200, 7000);

    // Prepare SQL (Assuming you have a `users` table with `name`, `email`, `password`)
    $stmt = $con->prepare("INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("isss", $user_id, $name, $email, $hashedPassword);

    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "User registered successfully."
        ]);
    } else {
        echo json_encode([
            "success" => false,
            "message" => "Registration failed. Email might already be taken."
        ]);
    }

    $stmt->close();
    $con->close();
?>
