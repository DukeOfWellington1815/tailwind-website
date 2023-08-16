<?php

// Allow from any origin
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}

// Access-Control headers are received during OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    }

    exit(0);
}

require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Dotenv\Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

$SECRET_KEY = $_ENV['SECRET_KEY'];
$mysqli = new mysqli($_ENV['DB_HOST'], $_ENV['DB_USER'], $_ENV['DB_PASSWORD'], $_ENV['DB_DATABASE']);

if ($mysqli->connect_error) {
    die('Database connection failed: ' . $mysqli->connect_error);
}

function verifyToken($token) {
    global $SECRET_KEY;

    try {
        $decoded = JWT::decode($token, $SECRET_KEY, array('HS256'));
        return $decoded->userId;
    } catch (Exception $e) {
        return false;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SERVER['CONTENT_TYPE'] !== 'application/json') {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid Content-Type header'));
        exit;
    }

    $requestData = json_decode(file_get_contents('php://input'), true);

    $username = isset($requestData['username']) ? trim($requestData['username']) : '';
    $password = isset($requestData['password']) ? $requestData['password'] : '';

    if (!empty($username) && !empty($password)) {
        $username = $mysqli->real_escape_string($username);

        $query = 'SELECT * FROM users WHERE username = ?';
        $stmt = $mysqli->prepare($query);
        $stmt->bind_param('s', $username);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        $stmt->close();

        if ($user && password_verify($password, $user['password'])) {
            $tokenPayload = array(
                'userId' => $user['id'],
            );

            $token = JWT::encode($tokenPayload, $SECRET_KEY, 'HS256');

            $response = array(
                'token' => $token,
                'message' => 'Login successful',
                'user' => array('username' => $user['username'])
            );
            echo json_encode($response);
        } else {
            http_response_code(401);
            echo json_encode(array('error' => 'Invalid username or password'));
        }
    } else {
        http_response_code(400);
        echo json_encode(array('error' => 'Username and password are required'));
    }
}

$mysqli->close();
?>
