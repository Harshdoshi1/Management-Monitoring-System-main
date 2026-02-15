<?php
/**
 * Supabase Database Connection
 * Using PostgreSQL with Supabase
 */

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

// Database connection details (extracted from Supabase)
// Format: postgresql://postgres:[YOUR-PASSWORD]@db.ijdeeyylabqrsgdebliz.supabase.co:5432/postgres
$DB_HOST = 'db.ijdeeyylabqrsgdebliz.supabase.co';
$DB_PORT = '5432';
$DB_NAME = 'postgres';
$DB_USER = 'postgres';
$DB_PASS = getenv('SUPABASE_DB_PASSWORD') ?: ''; // Set this in environment or here

// PDO options for better error handling and security
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    // PostgreSQL connection string
    $dsn = "pgsql:host={$DB_HOST};port={$DB_PORT};dbname={$DB_NAME};sslmode=require";
    $pdo = new PDO($dsn, $DB_USER, $DB_PASS, $options);
} catch (PDOException $e) {
    // Log error securely in production
    error_log("Database connection failed: " . $e->getMessage());
    die("Database connection failed. Please contact the administrator.");
}

/**
 * Helper function to make Supabase API calls
 * @param string $endpoint The API endpoint (e.g., '/rest/v1/users')
 * @param string $method HTTP method (GET, POST, PUT, DELETE)
 * @param array $data Data to send (for POST/PUT)
 * @return array Response from Supabase
 */
function supabaseRequest($endpoint, $method = 'GET', $data = null) {
    $url = SUPABASE_URL . $endpoint;
    
    $headers = [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json',
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    
    if ($data && ($method === 'POST' || $method === 'PUT' || $method === 'PATCH')) {
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    }
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'status' => $httpCode,
        'data' => json_decode($response, true)
    ];
}

/**
 * Set session cookie for authentication
 */
function setAuthCookie($userId, $userEmail, $userRole) {
    setcookie('auth_user_id', $userId, time() + (86400 * 30), '/'); // 30 days
    setcookie('auth_user_email', $userEmail, time() + (86400 * 30), '/');
    setcookie('auth_user_role', $userRole, time() + (86400 * 30), '/');
}

/**
 * Clear authentication cookies
 */
function clearAuthCookies() {
    setcookie('auth_user_id', '', time() - 3600, '/');
    setcookie('auth_user_email', '', time() - 3600, '/');
    setcookie('auth_user_role', '', time() - 3600, '/');
}

/**
 * Check if user is authenticated
 */
function isAuthenticated() {
    return isset($_COOKIE['auth_user_id']) && isset($_COOKIE['auth_user_email']);
}

/**
 * Get current user ID from cookie
 */
function getCurrentUserId() {
    return $_COOKIE['auth_user_id'] ?? null;
}

/**
 * Get current user role from cookie
 */
function getCurrentUserRole() {
    return $_COOKIE['auth_user_role'] ?? null;
}
