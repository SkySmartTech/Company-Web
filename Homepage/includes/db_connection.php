<?php
// db_connection.php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "smartskycareersdb";

// Create the connection
$conn = new mysqli($servername, $username, $password, $dbname);

// If connection fails, return JSON and stop further execution
if ($conn->connect_error) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed',
        'debug' => 'Connection error: ' . $conn->connect_error
    ]);
    exit;
}
?>
