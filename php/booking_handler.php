<?php
header('Content-Type: application/json');
require_once 'db_config.php';

// Example: expecting POST data: name, email, checkin, checkout
$name     = $_POST['name']     ?? '';
$email    = $_POST['email']    ?? '';
$checkin  = $_POST['checkin']  ?? '';
$checkout = $_POST['checkout'] ?? '';

if ($name && $email && $checkin && $checkout) {
    $stmt = $conn->prepare("INSERT INTO bookings (name, email, checkin, checkout) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $checkin, $checkout);

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'message' => 'Booking saved!']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $stmt->error]);
    }
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Missing required fields.']);
}

$conn->close();
?>
