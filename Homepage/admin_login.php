<?php
session_start();
$conn = new mysqli("localhost", "root", "", "your_db");

$email = $_POST['email'];
$pass = $_POST['password'];

$res = $conn->query("SELECT * FROM admin_users WHERE email='$email'");
$row = $res->fetch_assoc();

if ($row && hash('sha256', $pass) === $row['password']) {
    $_SESSION['admin'] = $email;
    header("Location: admin_dashboard.php");
} else {
    echo "Invalid credentials";
}
?>
