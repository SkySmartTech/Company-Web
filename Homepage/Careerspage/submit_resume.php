<?php
// submit_resume.php

// Enable error reporting for development
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $job_title = $_POST['job_title'] ?? '';
    $full_name = $_POST['full_name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';

    // Check required fields
    if (empty($job_title) || empty($full_name) || empty($phone) || empty($email) || !isset($_FILES['resume'])) {
        echo json_encode(['success' => false, 'message' => 'All fields including resume are required.']);
        exit;
    }

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
        exit;
    }

    // Validate file
    $file = $_FILES['resume'];
    $allowed_extensions = ['pdf', 'doc', 'docx'];
    $file_ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    if (!in_array($file_ext, $allowed_extensions)) {
        echo json_encode(['success' => false, 'message' => 'Only PDF, DOC, DOCX files are allowed.']);
        exit;
    }

    if ($file['size'] > 5 * 1024 * 1024) {
        echo json_encode(['success' => false, 'message' => 'File size must be less than 5MB.']);
        exit;
    }

    $upload_dir = 'uploads/resumes/';
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0775, true);
    }

    $unique_name = time() . '_' . uniqid() . '.' . $file_ext;
    $target_path = $upload_dir . $unique_name;

    if (!move_uploaded_file($file['tmp_name'], $target_path)) {
        echo json_encode(['success' => false, 'message' => 'Failed to upload resume.']);
        exit;
    }

    // Save to database
    $stmt = $conn->prepare("INSERT INTO job_applications (job_title, full_name, phone, email, resume_path, submitted_at) VALUES (?, ?, ?, ?, ?, NOW())");
    $stmt->bind_param("sssss", $job_title, $full_name, $phone, $email, $target_path);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Application submitted successfully!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
    }

    $stmt->close();
    $conn->close();

} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}
?>
