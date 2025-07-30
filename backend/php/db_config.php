<?php
// db_config.php
$host = 'localhost';
$db   = 'booking_system';
$user = 'manager';
$pass = 'Kill2Kill';

// Tell mysqli to throw exceptions
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $conn = new mysqli($host, $user, $pass, $db);
    $conn->set_charset('utf8mb4');
} catch (mysqli_sql_exception $e) {
    error_log('MySQL connect error: '.$e->getMessage());
    http_response_code(500);
    exit('Database connection failed');
}
?>
