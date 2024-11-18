<?php
include 'config.php';

// Error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Input validation
    if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['churchName']) || empty($_POST['phone']) || empty($_POST['boardingStatus']) || empty($_POST['role'])) {
        die("<script>alert('All fields are required!'); window.history.back();</script>");
    }

    // Collect and sanitize form data
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $churchName = $conn->real_escape_string($_POST['churchName']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $boardingStatus = $conn->real_escape_string($_POST['boardingStatus']);
    $role = $conn->real_escape_string($_POST['role']);

    // Insert into database
    $sql = "INSERT INTO registrations (name, email, church_name, phone, boarding_status, role) 
            VALUES ('$name', '$email', '$churchName', '$phone', '$boardingStatus', '$role')";

    if ($conn->query($sql) === TRUE) {
        echo "<script>
                alert('Registration successful!\\n\\nDetails:\\nName: " . htmlspecialchars($name) . "\\nEmail: " . htmlspecialchars($email) . "\\nChurch: " . htmlspecialchars($churchName) . "\\nPhone: " . htmlspecialchars($phone) . "\\nBoarding Status: " . htmlspecialchars($boardingStatus) . "\\nRole: " . htmlspecialchars($role) . "');
                window.location.href = '../index.html';
              </script>";
    } else {
        echo "<script>
                alert('Error: " . htmlspecialchars($conn->error) . "');
                window.history.back();
              </script>";
    }
}

// Close connection
$conn->close();
?>
