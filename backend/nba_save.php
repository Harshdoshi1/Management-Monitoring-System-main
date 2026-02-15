<?php
/**
 * NBA Criteria Save Handler
 * Saves NBA criteria data to Supabase using REST API
 */

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
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

$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // Get NBA data for a specific criteria
            $criteria = $_GET['criteria'] ?? '';
            
            if (empty($criteria)) {
                // Get all NBA data
                $response = supabaseRequest('/rest/v1/nba_data?order=created_at.desc', 'GET');
            } else {
                // Get data for specific criteria
                $response = supabaseRequest('/rest/v1/nba_data?criteria=eq.' . urlencode($criteria) . '&order=created_at.desc', 'GET');
            }
            
            if ($response['status'] >= 200 && $response['status'] < 300) {
                echo json_encode([
                    'success' => true,
                    'data' => $response['data'] ?? []
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'data' => [],
                    'message' => 'Failed to fetch data'
                ]);
            }
            break;
            
        case 'POST':
            // Save new NBA data
            $input = json_decode(file_get_contents('php://input'), true);
            
            $criteria = $input['criteria'] ?? '';
            $data = $input['data'] ?? [];
            
            if (empty($criteria)) {
                throw new Exception('Criteria is required');
            }
            
            // Prepare data for Supabase
            $nbaData = [
                'criteria' => $criteria,
                'data' => json_encode($data),
                'academic_year' => $data['academicYear'] ?? date('Y'),
                'created_at' => date('c')
            ];
            
            $response = supabaseRequest('/rest/v1/nba_data', 'POST', $nbaData);
            
            if ($response['status'] >= 200 && $response['status'] < 300) {
                $saved = is_array($response['data']) && isset($response['data'][0]) ? $response['data'][0] : $response['data'];
                echo json_encode([
                    'success' => true,
                    'message' => 'Data saved successfully',
                    'data' => $saved
                ]);
            } else {
                throw new Exception('Failed to save data');
            }
            break;
            
        case 'PUT':
        case 'PATCH':
            // Update existing NBA data
            $input = json_decode(file_get_contents('php://input'), true);
            
            $id = $input['id'] ?? '';
            $data = $input['data'] ?? [];
            
            if (empty($id)) {
                throw new Exception('ID is required for update');
            }
            
            $updateData = [
                'data' => json_encode($data),
                'updated_at' => date('c')
            ];
            
            $response = supabaseRequest('/rest/v1/nba_data?id=eq.' . urlencode($id), 'PATCH', $updateData);
            
            if ($response['status'] >= 200 && $response['status'] < 300) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Data updated successfully'
                ]);
            } else {
                throw new Exception('Failed to update data');
            }
            break;
            
        case 'DELETE':
            // Delete NBA data
            $id = $_GET['id'] ?? '';
            
            if (empty($id)) {
                throw new Exception('ID is required for delete');
            }
            
            $response = supabaseRequest('/rest/v1/nba_data?id=eq.' . urlencode($id), 'DELETE');
            
            if ($response['status'] >= 200 && $response['status'] < 300) {
                echo json_encode([
                    'success' => true,
                    'message' => 'Data deleted successfully'
                ]);
            } else {
                throw new Exception('Failed to delete data');
            }
            break;
            
        default:
            throw new Exception('Invalid request method');
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
