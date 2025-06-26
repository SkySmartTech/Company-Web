<?php
// submit_resume.php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
$servername = "localhost";
$username = "root";   
$password = "";    
$dbname = "smartskycareersdb";  

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Check if request is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

try {
    // Get form data
    $job_title = mysqli_real_escape_string($conn, $_POST['job_title']);
    $full_name = mysqli_real_escape_string($conn, $_POST['full_name']);
    $phone = mysqli_real_escape_string($conn, $_POST['phone']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    
    // Validate required fields
    if (empty($full_name) || empty($phone) || empty($email)) {
        echo json_encode(['success' => false, 'message' => 'All fields are required']);
        exit;
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['success' => false, 'message' => 'Invalid email format']);
        exit;
    }
    
    // Handle file upload
    $resume_path = null;
    if (isset($_FILES['resume']) && $_FILES['resume']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/resumes/';
        
        // Create directory if it doesn't exist
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        $file_tmp = $_FILES['resume']['tmp_name'];
        $file_name = $_FILES['resume']['name'];
        $file_size = $_FILES['resume']['size'];
        $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        
        // Validate file type
        $allowed_types = ['pdf', 'doc', 'docx'];
        if (!in_array($file_ext, $allowed_types)) {
            echo json_encode(['success' => false, 'message' => 'Invalid file type. Only PDF, DOC, and DOCX files are allowed']);
            exit;
        }
        
        // Validate file size (5MB max)
        if ($file_size > 5 * 1024 * 1024) {
            echo json_encode(['success' => false, 'message' => 'File size too large. Maximum 5MB allowed']);
            exit;
        }
        
        // Generate unique filename
        $unique_name = time() . '_' . uniqid() . '.' . $file_ext;
        $resume_path = $upload_dir . $unique_name;
        
        // Move uploaded file
        if (!move_uploaded_file($file_tmp, $resume_path)) {
            echo json_encode(['success' => false, 'message' => 'Failed to upload file']);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Resume file is required']);
        exit;
    }
    
    // Insert data into database
    $sql = "INSERT INTO job_applications (job_title, full_name, phone, email, resume_path, submitted_at) 
            VALUES (?, ?, ?, ?, ?, NOW())";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sssss", $job_title, $full_name, $phone, $email, $resume_path);
    
    if ($stmt->execute()) {
        echo json_encode([
            'success' => true, 
            'message' => 'Application submitted successfully',
            'application_id' => $conn->insert_id
        ]);
    } else {
        // Delete uploaded file if database insert fails
        if ($resume_path && file_exists($resume_path)) {
            unlink($resume_path);
        }
        echo json_encode(['success' => false, 'message' => 'Failed to save application']);
    }
    
    $stmt->close();
    
} catch (Exception $e) {
    // Delete uploaded file if error occurs
    if (isset($resume_path) && $resume_path && file_exists($resume_path)) {
        unlink($resume_path);
    }
    echo json_encode(['success' => false, 'message' => 'An error occurred: ' . $e->getMessage()]);
}

$conn->close();
?>