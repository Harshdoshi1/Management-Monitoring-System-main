<?php
/**
 * User Registration Handler - Saves to Supabase users table
 * Working version with proper PostgreSQL array handling
 */

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgxNzI2MCwiZXhwIjoyMDg2MzkzMjYwfQ.v6CtYSuS3QoWARS_OQi-SS_t4-ftxaIEjXJo5PxJ_Sc');

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';
$role = strtolower(trim($input['role'] ?? 'faculty'));

// Validation
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

// Validate role - must be 'faculty' or 'hod' (lowercase)
if (!in_array($role, ['faculty', 'hod'])) {
    $role = 'faculty';
}

// Step 1: Check if email already exists
$checkUrl = SUPABASE_URL . '/rest/v1/users?email=eq.' . urlencode($email) . '&select=id';
$ch = curl_init($checkUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . SUPABASE_ANON_KEY,
    'Authorization: Bearer ' . SUPABASE_ANON_KEY
]);
$checkResponse = curl_exec($ch);
$checkData = json_decode($checkResponse, true);
curl_close($ch);

if (!empty($checkData) && count($checkData) > 0) {
    echo json_encode(['success' => false, 'message' => 'Email already registered']);
    exit;
}

// Step 2: Hash password using BCRYPT
$password_hash = password_hash($password, PASSWORD_BCRYPT);

// Step 3: Prepare user data - roles as PostgreSQL array
$userData = [
    'name' => $name,
    'email' => $email,
    'password_hash' => $password_hash,
    'roles' => [$role]  // PostgreSQL text[] array
];

// Step 4: Insert user into Supabase
$insertUrl = SUPABASE_URL . '/rest/v1/users';
$ch = curl_init($insertUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . SUPABASE_ANON_KEY,
    'Authorization: Bearer ' . SUPABASE_ANON_KEY,
    'Content-Type: application/json',
    'Prefer: return=representation'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Check response
if ($httpCode >= 200 && $httpCode < 300) {
    $newUser = json_decode($response, true);
    $newUser = isset($newUser[0]) ? $newUser[0] : $newUser;
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful! Please login.',
        'user' => [
            'id' => $newUser['id'] ?? null,
            'name' => $name,
            'email' => $email,
            'role' => $role
        ]
    ]);
} else {
    $errorData = json_decode($response, true);
    $errorMsg = $errorData['message'] ?? $errorData['error'] ?? 'Registration failed';
    
    echo json_encode([
        'success' => false,
        'message' => $errorMsg
    ]);
}
