<?php
/**
 * Add Student using Supabase REST API
 */

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

/**
 * Make Supabase REST API request
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

try {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Validate required fields
    $required = ['enrollment_number', 'student_name', 'batch', 'academic_year', 'year_of_study', 'semester'];
    foreach ($required as $field) {
        if (empty($input[$field])) {
            throw new Exception("Field '$field' is required");
        }
    }
    
    // Prepare student data
    $studentData = [
        'enrollment_number' => $input['enrollment_number'],
        'student_name' => $input['student_name'],
        'email' => $input['email'] ?? null,
        'phone' => $input['phone'] ?? null,
        'batch' => $input['batch'],
        'academic_year' => $input['academic_year'],
        'year_of_study' => (int)$input['year_of_study'],
        'semester' => (int)$input['semester'],
        'department' => $input['department'] ?? null,
        'division' => $input['division'] ?? null,
        'roll_number' => $input['roll_number'] ?? null,
        'admission_date' => $input['admission_date'] ?? null,
        'date_of_birth' => $input['date_of_birth'] ?? null,
        'gender' => $input['gender'] ?? null,
        'category' => $input['category'] ?? null,
        'admission_type' => $input['admission_type'] ?? 'Regular',
        'status' => $input['status'] ?? 'active',
        'cgpa' => isset($input['cgpa']) ? (float)$input['cgpa'] : null,
        'sgpa' => isset($input['sgpa']) ? (float)$input['sgpa'] : null,
        'backlogs' => isset($input['backlogs']) ? (int)$input['backlogs'] : 0,
        'address' => $input['address'] ?? null,
        'parent_name' => $input['parent_name'] ?? null,
        'parent_phone' => $input['parent_phone'] ?? null,
        'created_at' => date('c')
    ];
    
    // Remove null values
    $studentData = array_filter($studentData, function($value) {
        return $value !== null;
    });
    
    // Insert via Supabase REST API
    $response = supabaseRequest('/rest/v1/students', 'POST', $studentData);
    
    if ($response['status'] >= 200 && $response['status'] < 300) {
        $student = is_array($response['data']) && isset($response['data'][0]) ? $response['data'][0] : $response['data'];
        echo json_encode([
            'success' => true,
            'message' => 'Student added successfully',
            'student' => $student
        ]);
    } else {
        $errorMsg = $response['data']['message'] ?? 'Failed to add student';
        // Check for unique constraint
        if (strpos(json_encode($response['data']), 'unique') !== false || 
            strpos(json_encode($response['data']), 'duplicate') !== false) {
            $errorMsg = 'Student with this enrollment number already exists';
        }
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'error' => $errorMsg
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
