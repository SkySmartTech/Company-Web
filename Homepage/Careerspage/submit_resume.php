<?php
// submit_resume.php - Debug Version
// Turn off all output buffering and error display to ensure clean JSON
ob_clean();
ini_set('display_errors', 0);
error_reporting(0);

// Ensure we always return JSON
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Function to safely output JSON and exit
function jsonResponse($data) {
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

// Database configuration - UPDATE THESE VALUES
$servername = "localhost";
$username = "root";     // Replace with your database username
$password = "";     // Replace with your database password
$dbname = "smartskycareersdb";  // Replace with your database name

try {
    // Check if request is POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        jsonResponse(['success' => false, 'message' => 'Invalid request method']);
    }

    // Create connection with error handling
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        jsonResponse([
            'success' => false, 
            'message' => 'Database connection failed',
            'debug' => 'Connection error: ' . $conn->connect_error
        ]);
    }

    // Debug: Check if POST data exists
    if (empty($_POST)) {
        jsonResponse([
            'success' => false, 
            'message' => 'No form data received',
            'debug' => 'POST array is empty'
        ]);
    }

    // Get form data with fallback values
    $job_title = isset($_POST['job_title']) ? mysqli_real_escape_string($conn, $_POST['job_title']) : '';
    $full_name = isset($_POST['full_name']) ? mysqli_real_escape_string($conn, $_POST['full_name']) : '';
    $phone = isset($_POST['phone']) ? mysqli_real_escape_string($conn, $_POST['phone']) : '';
    $email = isset($_POST['email']) ? mysqli_real_escape_string($conn, $_POST['email']) : '';
    
    // Debug: Log received data
    error_log("Received data - Name: $full_name, Email: $email, Phone: $phone, Job: $job_title");
    
    // Validate required fields
    if (empty($full_name) || empty($phone) || empty($email)) {
        jsonResponse([
            'success' => false, 
            'message' => 'All fields are required',
            'debug' => "Missing fields - Name: '$full_name', Phone: '$phone', Email: '$email'"
        ]);
    }
    
    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        jsonResponse(['success' => false, 'message' => 'Invalid email format']);
    }
    
    // Handle file upload
    $resume_path = null;
    
    // Debug file upload
    if (!isset($_FILES['resume'])) {
        jsonResponse([
            'success' => false, 
            'message' => 'No file uploaded',
            'debug' => 'FILES array: ' . print_r($_FILES, true)
        ]);
    }
    
    if ($_FILES['resume']['error'] !== UPLOAD_ERR_OK) {
        $error_messages = [
            UPLOAD_ERR_INI_SIZE => 'File too large (server limit)',
            UPLOAD_ERR_FORM_SIZE => 'File too large (form limit)',
            UPLOAD_ERR_PARTIAL => 'File partially uploaded',
            UPLOAD_ERR_NO_FILE => 'No file uploaded',
            UPLOAD_ERR_NO_TMP_DIR => 'Missing temporary folder',
            UPLOAD_ERR_CANT_WRITE => 'Failed to write file',
            UPLOAD_ERR_EXTENSION => 'File upload stopped by extension'
        ];
        
        $error_code = $_FILES['resume']['error'];
        $error_message = isset($error_messages[$error_code]) ? $error_messages[$error_code] : 'Unknown upload error';
        
        jsonResponse([
            'success' => false, 
            'message' => 'File upload error: ' . $error_message,
            'debug' => 'Upload error code: ' . $error_code
        ]);
    }
    
    // Process file upload
    $upload_dir = 'uploads/resumes/';
    
    // Create directory if it doesn't exist
    if (!file_exists($upload_dir)) {
        if (!mkdir($upload_dir, 0755, true)) {
            jsonResponse([
                'success' => false, 
                'message' => 'Failed to create upload directory',
                'debug' => 'Cannot create directory: ' . $upload_dir
            ]);
        }
    }
    
    // Check if directory is writable
    if (!is_writable($upload_dir)) {
        jsonResponse([
            'success' => false, 
            'message' => 'Upload directory not writable',
            'debug' => 'Directory permissions: ' . substr(sprintf('%o', fileperms($upload_dir)), -4)
        ]);
    }
    
    $file_tmp = $_FILES['resume']['tmp_name'];
    $file_name = $_FILES['resume']['name'];
    $file_size = $_FILES['resume']['size'];
    $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
    
    // Validate file type
    $allowed_types = ['pdf', 'doc', 'docx'];
    if (!in_array($file_ext, $allowed_types)) {
        jsonResponse([
            'success' => false, 
            'message' => 'Invalid file type. Only PDF, DOC, and DOCX files are allowed',
            'debug' => 'File extension: ' . $file_ext
        ]);
    }
    
    // Validate file size (5MB max)
    if ($file_size > 5 * 1024 * 1024) {
        jsonResponse([
            'success' => false, 
            'message' => 'File size too large. Maximum 5MB allowed',
            'debug' => 'File size: ' . round($file_size / 1024 / 1024, 2) . 'MB'
        ]);
    }
    
    // Generate unique filename
    $unique_name = time() . '_' . uniqid() . '.' . $file_ext;
    $resume_path = $upload_dir . $unique_name;
    
    // Move uploaded file
    if (!move_uploaded_file($file_tmp, $resume_path)) {
        jsonResponse([
            'success' => false, 
            'message' => 'Failed to upload file',
            'debug' => 'Cannot move file from ' . $file_tmp . ' to ' . $resume_path
        ]);
    }
    
    // Insert data into database
    $sql = "INSERT INTO job_applications (job_title, full_name, phone, email, resume_path, submitted_at) 
            VALUES (?, ?, ?, ?, ?, NOW())";
    
    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        // Delete uploaded file if prepare fails
        if (file_exists($resume_path)) {
            unlink($resume_path);
        }
        jsonResponse([
            'success' => false, 
            'message' => 'Database prepare failed',
            'debug' => 'SQL error: ' . $conn->error
        ]);
    }
    
    $stmt->bind_param("sssss", $job_title, $full_name, $phone, $email, $resume_path);
    
    if ($stmt->execute()) {
        jsonResponse([
            'success' => true, 
            'message' => 'Application submitted successfully!',
            'application_id' => $conn->insert_id,
            'file_uploaded' => $unique_name
        ]);
    } else {
        // Delete uploaded file if database insert fails
        if (file_exists($resume_path)) {
            unlink($resume_path);
        }
        jsonResponse([
            'success' => false, 
            'message' => 'Failed to save application',
            'debug' => 'Execute error: ' . $stmt->error
        ]);
    }
    
} catch (Exception $e) {
    // Delete uploaded file if error occurs
    if (isset($resume_path) && file_exists($resume_path)) {
        unlink($resume_path);
    }
    
    jsonResponse([
        'success' => false, 
        'message' => 'Server error occurred',
        'debug' => 'Exception: ' . $e->getMessage()
    ]);
} finally {
    // Clean up
    if (isset($stmt)) $stmt->close();
    if (isset($conn)) $conn->close();
}
?>