<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

// Test Supabase connection
$url = 'https://ijdeeyylabqrsgdebliz.supabase.co';
$anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY';

$results = [];

// Test 1: Check if we can connect to Supabase
$results['test1_connection'] = 'Testing...';
$ch = curl_init($url . '/rest/v1/');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . $anonKey,
    'Authorization: Bearer ' . $anonKey
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
$results['test1_connection'] = [
    'status' => $httpCode,
    'response' => substr($response, 0, 200)
];

// Test 2: Check if we can read from users table
$results['test2_read_users'] = 'Testing...';
$ch = curl_init($url . '/rest/v1/users?select=id&limit=1');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . $anonKey,
    'Authorization: Bearer ' . $anonKey
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);
$results['test2_read_users'] = [
    'status' => $httpCode,
    'response' => $response,
    'decoded' => json_decode($response, true)
];

// Test 3: Try to INSERT a test user
$results['test3_insert_user'] = 'Testing...';
$testEmail = 'diagnostic_test_' . time() . '@test.com';
$testData = [
    'name' => 'Diagnostic Test',
    'email' => $testEmail,
    'password_hash' => password_hash('test123', PASSWORD_BCRYPT),
    'roles' => ['faculty']
];

$ch = curl_init($url . '/rest/v1/users');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($testData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'apikey: ' . $anonKey,
    'Authorization: Bearer ' . $anonKey,
    'Content-Type: application/json',
    'Prefer: return=representation'
]);
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

$results['test3_insert_user'] = [
    'status' => $httpCode,
    'request_data' => $testData,
    'response' => $response,
    'decoded' => json_decode($response, true),
    'curl_error' => $error ?: 'none'
];

// Final verdict
if ($httpCode >= 200 && $httpCode < 300) {
    $results['VERDICT'] = '✅ INSERT WORKS! The issue might be in the frontend.';
} else {
    $results['VERDICT'] = '❌ INSERT FAILED! Check the error below.';
    $results['NEXT_STEPS'] = 'You need to provide the SERVICE ROLE KEY (not anon key) or fix database permissions.';
}

echo json_encode($results, JSON_PRETTY_PRINT);
