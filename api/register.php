<?php
/**
 * User Registration Handler - Saves to Supabase users table
 * Updated with improved error handling and logging
 */

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to user
ini_set('log_errors', 1);
ini_set('error_log', '/tmp/php_errors.log');

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

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

// Log the input for debugging
error_log("Registration attempt: " . json_encode($input));

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
$validRoles = ['faculty', 'hod'];
if (!in_array($role, $validRoles)) {
    $role = 'faculty';
}

/**
 * Make Supabase REST API request with improved error handling
 */
function supabaseRequest($endpoint, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . $endpoint;
    
    $headers = [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json',
        'Prefer: return=representation'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 30);
    
    if ($data && ($method === 'POST' || $method === 'PUT' || $method === 'PATCH')) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    // Log the response
    error_log("Supabase $method $endpoint - Status: $httpCode");
    error_log("Supabase Response: " . $response);
    
    if ($error) {
        error_log("cURL Error: " . $error);
        return ['status' => 500, 'data' => null, 'error' => $error];
    }
    
    $decodedResponse = json_decode($response, true);
    
    return [
        'status' => $httpCode,
        'data' => $decodedResponse,
        'raw' => $response
    ];
}

try {
    // Step 1: Check if email already exists
    error_log("Checking if email exists: $email");
    $checkResponse = supabaseRequest('/rest/v1/users?email=eq.' . urlencode($email) . '&select=id', 'GET');
    
    if ($checkResponse['status'] === 200 && !empty($checkResponse['data']) && count($checkResponse['data']) > 0) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }
    
    // Step 2: Hash password using BCRYPT
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    error_log("Password hashed successfully");
    
    // Step 3: Prepare user data for Supabase
    // roles column is text[] (PostgreSQL array), so send as array directly
    $userData = [
        'name' => $name,
        'email' => $email,
        'password_hash' => $password_hash,
        'roles' => [$role] // Send as array for PostgreSQL text[] column
    ];
    
    error_log("Attempting to insert user: " . json_encode($userData));
    
    // Step 4: Insert new user into Supabase
    $insertResponse = supabaseRequest('/rest/v1/users', 'POST', $userData);
    
    // Check if insertion was successful
    if ($insertResponse['status'] >= 200 && $insertResponse['status'] < 300) {
        // Success! User created
        $newUser = isset($insertResponse['data'][0]) ? $insertResponse['data'][0] : $insertResponse['data'];
        $userId = $newUser['id'] ?? null;
        
        error_log("User created successfully with ID: " . $userId);
        
        echo json_encode([
            'success' => true,
            'message' => 'Registration successful! Please login.',
            'user' => [
                'id' => $userId,
                'name' => $name,
                'email' => $email,
                'role' => $role
            ]
        ]);
    } else {
        // Failed to insert
        $errorMsg = 'Registration failed';
        
        if (isset($insertResponse['data']['message'])) {
            $errorMsg = $insertResponse['data']['message'];
        } elseif (isset($insertResponse['data']['error'])) {
            $errorMsg = $insertResponse['data']['error'];
        } elseif (isset($insertResponse['data']['hint'])) {
            $errorMsg = $insertResponse['data']['hint'];
        }
        
        error_log("Registration failed: " . $errorMsg);
        error_log("Full response: " . json_encode($insertResponse));
        
        echo json_encode([
            'success' => false,
            'message' => 'Registration failed: ' . $errorMsg
        ]);
    }
    
} catch (Exception $e) {
    error_log("Exception in registration: " . $e->getMessage());
    error_log("Stack trace: " . $e->getTraceAsString());
    
    echo json_encode([
        'success' => false,
        'message' => 'Server error. Please try again later.'
    ]);
}
