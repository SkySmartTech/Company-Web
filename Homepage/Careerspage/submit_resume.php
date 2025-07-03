<?php
// Display errors for debugging
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Include PHPMailer
require __DIR__ . '/PHPMailer/PHPMailer.php';
require __DIR__ . '/PHPMailer/SMTP.php';
require __DIR__ . '/PHPMailer/Exception.php';

// Include your DB connection
require_once 'db_connection.php';

// Validate method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Get form data
$job_title = $_POST['job_title'] ?? '';
$full_name = $_POST['full_name'] ?? '';
$phone     = $_POST['phone'] ?? '';
$email     = $_POST['email'] ?? '';

// Validate fields
if (empty($job_title) || empty($full_name) || empty($phone) || empty($email) || !isset($_FILES['resume'])) {
    echo json_encode(['success' => false, 'message' => 'All fields including resume are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format.']);
    exit;
}

// Validate and upload resume
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

$upload_dir = __DIR__ . '/uploads/resumes/';
if (!is_dir($upload_dir)) {
    mkdir($upload_dir, 0775, true);
}

$unique_name = time() . '_' . uniqid() . '.' . $file_ext;
$target_path = $upload_dir . $unique_name;

if (!move_uploaded_file($file['tmp_name'], $target_path)) {
    echo json_encode(['success' => false, 'message' => 'Failed to upload resume.']);
    exit;
}

// Save to MySQL
$stmt = $conn->prepare("INSERT INTO job_applications (job_title, full_name, phone, email, resume_path, submitted_at) VALUES (?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("sssss", $job_title, $full_name, $phone, $email, $target_path);

if (!$stmt->execute()) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
    exit;
}
$stmt->close();
$conn->close();

// Send Email via PHPMailer
try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'sewminihewage1999@gmail.com';  
    $mail->Password   = 'wjgv fyqj ztgr hsbo';           
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom('sewminihewage1999@gmail.com', 'Sky Smart Technology');
    $mail->addAddress($email, $full_name);

    $mail->isHTML(true);
    $mail->Subject = 'We have Received Your Application Successfully' . $job_title;
    $mail->Body = "
        <h3>Hello {$full_name},</h3>

        <p>Thank you for applying for the <strong>{$job_title}</strong> position at <strong>Sky Smart Technology</strong>.</p>

        <p>We're excited to have received your application and appreciate your interest in joining our team!</p>

        <p>Our hiring team is currently reviewing all applications to identify the best fit for the role. Since each application is carefully reviewed by real people (not automated systems), this process might take a little time—we truly value your patience.</p>

        <p>If your qualifications match what we're looking for, we will reach out to schedule an interview and discuss your skills and experiences further. If there’s no immediate match, we’ll keep your profile in our records and may contact you about future opportunities.</p>

        <p>We’ll be in touch soon. Wishing you all the best in the meantime! 🚀</p>

        <br>

        <p>Warm regards,<br>
        HR Team<br>
        Sky Smart Technology</p>

    ";

    $mail->addAttachment($target_path, basename($target_path));
    $mail->send();

    echo json_encode(['success' => true, 'message' => 'Application submitted and email sent.']);
} catch (Exception $e) {
    echo json_encode([
        'success' => true, 
        'message' => 'Application submitted, but email failed.',
        'debug' => $mail->ErrorInfo
    ]);
}
