<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Add logging
error_log("submit-review.php called at " . date('Y-m-d H:i:s'));

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);
error_log("Received input: " . print_r($input, true));

if (!$input) {
    echo json_encode(['success' => false, 'message' => 'Invalid input data']);
    exit;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$required_fields = ['name', 'email', 'rating', 'message', 'dateStay'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize input
$name = trim($input['name']);
$email = strtolower(trim($input['email']));
$location = trim($input['location'] ?? ''); // Allow empty location
$rating = intval($input['rating']);
$message = trim($input['message']);
$dateStay = trim($input['dateStay']);

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

// Validate rating
if ($rating < 1 || $rating > 5) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Rating must be between 1 and 5']);
    exit;
}

// Load guest list for validation
$guestListPath = 'data/GuestList.json';
if (!file_exists($guestListPath)) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Guest validation system unavailable']);
    exit;
}

$guestListData = json_decode(file_get_contents($guestListPath), true);
if (!$guestListData || !isset($guestListData['guests'])) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Guest validation data error']);
    exit;
}

// Validate guest credentials
$isValidGuest = false;
$matchedGuest = null;

foreach ($guestListData['guests'] as $guest) {
    // Check email match (exact)
    if (strtolower($guest['email']) === $email) {
        // Check name match (fuzzy - allows for variations)
        $guestNameNormalized = strtolower(preg_replace('/[^a-z0-9\s]/', '', $guest['name']));
        $inputNameNormalized = strtolower(preg_replace('/[^a-z0-9\s]/', '', $name));

        // Allow partial name matches (first name, last name, or both)
        $nameWords = explode(' ', $inputNameNormalized);
        $guestWords = explode(' ', $guestNameNormalized);
        $nameMatch = false;

        foreach ($nameWords as $inputWord) {
            foreach ($guestWords as $guestWord) {
                if (strlen($inputWord) > 2 && strpos($guestWord, $inputWord) !== false) {
                    $nameMatch = true;
                    break 2;
                }
            }
        }

        if ($nameMatch) {
            // Check if date of stay falls within their booking period
            $checkIn = new DateTime($guest['checkIn']);
            $checkOut = new DateTime($guest['checkOut']);
            $stayDate = new DateTime($dateStay);

            if ($stayDate >= $checkIn && $stayDate <= $checkOut) {
                $isValidGuest = true;
                $matchedGuest = $guest;
                break;
            }
        }
    }
}

if (!$isValidGuest) {
    http_response_code(403);
    echo json_encode([
        'success' => false,
        'message' => 'Unable to verify your stay. Please ensure your name, email, and date of stay match our records. Contact us directly if you need assistance.'
    ]);
    exit;
}

// Load existing reviews
$reviewsPath = 'data/GuestBook.json';
$reviewsData = ['entries' => []];

if (file_exists($reviewsPath)) {
    $existingData = json_decode(file_get_contents($reviewsPath), true);
    if ($existingData && isset($existingData['entries'])) {
        $reviewsData = $existingData;
    }
}

// Check for duplicate review from same email
foreach ($reviewsData['entries'] as $existingReview) {
    if (isset($existingReview['email']) && strtolower($existingReview['email']) === $email) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'You have already submitted a review. Thank you for your feedback!'
        ]);
        exit;
    }
}

// Create new review entry
$newReview = [
    'name' => $name,
    'email' => $email, // Store for duplicate checking (won't be displayed)
    'location' => $location,
    'rating' => $rating,
    'message' => $message,
    'date' => date('Y-m-d'),
    'dateStay' => $dateStay,
    'verified' => true,
    'bookingRef' => $matchedGuest['bookingRef']
];

// Add to beginning of entries array (newest first)
array_unshift($reviewsData['entries'], $newReview);

// Save updated reviews
if (file_put_contents($reviewsPath, json_encode($reviewsData, JSON_PRETTY_PRINT))) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your verified review! It will appear on the website shortly.'
    ]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to save review']);
}
?>
