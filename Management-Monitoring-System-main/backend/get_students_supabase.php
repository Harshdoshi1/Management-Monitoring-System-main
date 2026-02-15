<?php
/**
 * Get Students from Supabase using REST API
 */

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * Make Supabase REST API request
 */
function supabaseRequest($endpoint, $method = 'GET') {
    $url = SUPABASE_URL . $endpoint;
    
    $headers = [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'status' => $httpCode,
        'data' => json_decode($response, true)
    ];
}

try {
    // Build query parameters
    $queryParams = '?order=created_at.desc';
    
    // Filter by batch if provided
    if (!empty($_GET['batch'])) {
        $queryParams .= '&batch=eq.' . urlencode($_GET['batch']);
    }
    
    // Filter by academic_year if provided
    if (!empty($_GET['academic_year'])) {
        $queryParams .= '&academic_year=eq.' . urlencode($_GET['academic_year']);
    }
    
    // Filter by semester if provided
    if (!empty($_GET['semester'])) {
        $queryParams .= '&semester=eq.' . urlencode($_GET['semester']);
    }
    
    // Search by name or enrollment number
    if (!empty($_GET['search'])) {
        $search = $_GET['search'];
        $queryParams .= '&or=(student_name.ilike.*' . urlencode($search) . '*,enrollment_number.ilike.*' . urlencode($search) . '*)';
    }
    
    // Limit results
    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    $queryParams .= '&limit=' . $limit;
    
    $response = supabaseRequest('/rest/v1/students' . $queryParams, 'GET');
    
    if ($response['status'] >= 200 && $response['status'] < 300) {
        echo json_encode([
            'success' => true,
            'data' => $response['data'] ?? [],
            'count' => count($response['data'] ?? [])
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'data' => [],
            'error' => 'Failed to fetch students'
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
