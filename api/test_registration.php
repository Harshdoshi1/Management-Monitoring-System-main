<?php
/**
 * Test Registration Endpoint - Debug version
 */

// Enable all errors for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

header('Content-Type: application/json');

echo json_encode(['status' => 'Starting test...']) . "\n";

// Test data
$name = 'Test User From PHP';
$email = 'testphp_' . time() . '@example.com';
$password = 'test123456';
$role = 'faculty';

echo json_encode(['step' => 1, 'message' => 'Creating password hash']) . "\n";
$password_hash = password_hash($password, PASSWORD_BCRYPT);
echo json_encode(['step' => 2, 'hash' => substr($password_hash, 0, 20) . '...']) . "\n";

// Prepare user data
$userData = [
    'name' => $name,
    'email' => $email,
    'password_hash' => $password_hash,
    'roles' => [$role]
];

echo json_encode(['step' => 3, 'userData' => $userData]) . "\n";

// Make request to Supabase
$url = SUPABASE_URL . '/rest/v1/users';
$headers = [
    'apikey: ' . SUPABASE_ANON_KEY,
    'Authorization: Bearer ' . SUPABASE_ANON_KEY,
    'Content-Type: application/json',
    'Prefer: return=representation'
];

echo json_encode(['step' => 4, 'url' => $url]) . "\n";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($userData));
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);

echo json_encode(['step' => 5, 'message' => 'Sending request to Supabase...']) . "\n";

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

echo json_encode([
    'step' => 6,
    'httpCode' => $httpCode,
    'response' => $response,
    'error' => $error,
    'curlError' => $error ? true : false
]) . "\n";

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true, 'message' => 'User created successfully!', 'data' => json_decode($response)]) . "\n";
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to create user', 'response' => json_decode($response)]) . "\n";
}
