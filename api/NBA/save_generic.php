<?php
/**
 * Generic NBA criteria save script for Supabase
 * Handles all criteria types with camelCase to snake_case conversion
 */

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

// Set JSON response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

/**
 * Convert camelCase to snake_case
 */
function camelToSnake($input) {
    return strtolower(preg_replace('/(?<!^)[A-Z]/', '_$0', $input));
}

/**
 * Convert all array keys from camelCase to snake_case
 */
function convertArrayKeysToSnake($array) {
    $result = [];
    foreach ($array as $key => $value) {
        $newKey = camelToSnake($key);
        $result[$newKey] = $value;
    }
    return $result;
}

try {
    // Only allow POST method
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }
    
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON input');
    }
    
    // Extract criteria from URL query parameter first, then from body
    $criteria = $_GET['criteria'] ?? $input['criteria'] ?? '';
    $editId = $input['editId'] ?? $input['id'] ?? '';
    
    if (empty($criteria)) {
        throw new Exception('Criteria is required');
    }
    
    // Remove non-data fields from input
    unset($input['criteria']);
    unset($input['editId']);
    unset($input['id']);
    
    // Convert camelCase keys to snake_case for database
    $input = convertArrayKeysToSnake($input);
    
    $currentTime = date('c');
    
    // Map criteria to table names
    $table = getCriteriaTableName($criteria);
    
    if (!empty($editId)) {
        // UPDATE existing record
        $input['updated_at'] = $currentTime;
        
        // Build update query JSON for Supabase
        $updateData = json_encode($input);
        
        $supabaseUrl = SUPABASE_URL . "/rest/v1/" . $table . "?id=eq." . urlencode($editId);
        
        $headers = [
            'apikey: ' . SUPABASE_ANON_KEY,
            'Authorization: Bearer ' . SUPABASE_ANON_KEY,
            'Content-Type: application/json',
            'Prefer: return=representation'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $supabaseUrl);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PATCH');
        curl_setopt($ch, CURLOPT_POSTFIELDS, $updateData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            throw new Exception('cURL error: ' . $error);
        }
        
        if ($httpCode !== 200) {
            throw new Exception('Update failed: HTTP ' . $httpCode . ' - ' . $response);
        }
        
        $responseData = json_decode($response, true);
        
        echo json_encode([
            'success' => true,
            'message' => 'Record updated successfully',
            'data' => $responseData,
            'action' => 'update'
        ]);
        
    } else {
        // INSERT new record
        $input['created_at'] = $currentTime;
        $input['updated_at'] = $currentTime;
        $input['user_id'] = $userId;
        
        // Add academic year if not provided
        if (!isset($input['academic_year'])) {
            $input['academic_year'] = date('Y') . '-' . (date('Y') + 1);
        }
        
        $insertData = json_encode($input);
        
        $supabaseUrl = SUPABASE_URL . "/rest/v1/" . $table;
        
        $headers = [
            'apikey: ' . SUPABASE_ANON_KEY,
            'Authorization: Bearer ' . SUPABASE_ANON_KEY,
            'Content-Type: application/json',
            'Prefer: return=representation'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $supabaseUrl);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $insertData);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            throw new Exception('cURL error: ' . $error);
        }
        
        if ($httpCode !== 201) {
            throw new Exception('Insert failed: HTTP ' . $httpCode . ' - ' . $response);
        }
        
        $responseData = json_decode($response, true);
        
        echo json_encode([
            'success' => true,
            'message' => 'Record saved successfully',
            'data' => $responseData,
            'action' => 'insert'
        ]);
    }
    
} catch (Exception $e) {
    // Send error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'action' => isset($editId) && !empty($editId) ? 'update' : 'insert'
    ]);
}

/**
 * Get table name for criteria
 */
function getCriteriaTableName($criteria) {
    // Map criteria to table names (matching user's database schema)
    $criteriaMap = [
        // Criteria 1
        '1.1' => 'nba_criterion_11',
        '1.2' => 'nba_criterion_12', 
        '1.3' => 'nba_criterion_13',
        '1.4' => 'nba_criterion_14',
        '1.5' => 'nba_criterion_15',
        
        // Criteria 2
        '2.1.1' => 'nba_criterion_211',
        '2.1.2' => 'nba_criterion_212',
        '2.1.3' => 'nba_criterion_213',
        '2.1.4' => 'nba_criterion_214',
        '2.2.1' => 'nba_criterion_221',
        '2.2.2' => 'nba_criterion_222',
        '2.2.3' => 'nba_criterion_223',
        '2.2.4' => 'nba_criterion_224',
        '2.2.5' => 'nba_criterion_225',
        
        // Criteria 3
        '3.1' => 'nba_criterion_31',
        '3.2.1' => 'nba_criterion_321',
        '3.2.2' => 'nba_criterion_322',
        '3.3.1' => 'nba_criterion_331',
        '3.3.2' => 'nba_criterion_332',
        
        // Criteria 4 (existing)
        '4.1' => 'criterion_4_1_enrolment',
        '4.2.1' => 'criterion_4_2_1_success_no_backlog',
        '4.2.2' => 'criterion_4_2_2_success_stipulated',
        '4.3' => 'criterion_4_3_academic_performance',
        '4.4' => 'criterion_4_4_placement',
        '4.5.1' => 'criterion_4_5_1_professional_chapters',
        '4.5.2' => 'criterion_4_5_2_publications',
        '4.5.3' => 'criterion_4_5_3_student_participation',
        
        // Criteria 5 (existing)
        '5.1' => 'criterion_5_1_sfr',
        '5.2' => 'criterion_5_2_cadre',
        '5.3' => 'criterion_5_3_qualification',
        '5.4' => 'criterion_5_4_retention',
        '5.5' => 'criterion_5_5_competencies',
        '5.6' => 'criterion_5_6_innovations',
        '5.7' => 'criterion_5_7_fdp',
        '5.8.1' => 'criterion_5_8_1_academic_research',
        '5.8.2' => 'criterion_5_8_2_sponsored_research',
        '5.8.3' => 'criterion_5_8_3_development',
        '5.8.4' => 'criterion_5_8_4_consultancy',
        '5.9' => 'criterion_5_9_fpads',
        '5.10' => 'criterion_5_10_visiting_faculty',
        
        // Criteria 6 (existing)
        '6.1' => 'criterion_6_1_labs_tech',
        '6.2' => 'criterion_6_2_maintenance',
        '6.3' => 'criterion_6_3_safety',
        '6.4' => 'criterion_6_4_project_lab',
        
        // Criteria 7 (existing)
        '7.1' => 'criterion_7_1_po_pso_actions',
        '7.2' => 'criterion_7_2_academic_audit',
        '7.3' => 'criterion_7_3_placement_improvement',
        '7.4' => 'criterion_7_4_student_quality',
        
        // Criteria 8
        '8.1' => 'nba_criterion_81',
        '8.2' => 'nba_criterion_82',
        '8.3' => 'nba_criterion_83',
        '8.4.1' => 'nba_criterion_841',
        '8.4.2' => 'nba_criterion_842',
        '8.5.1' => 'nba_criterion_851',
        '8.5.2' => 'nba_criterion_852',
        
        // Criteria 9
        '9.1' => 'nba_criterion_91',
        '9.2' => 'nba_criterion_92',
        '9.3' => 'nba_criterion_93',
        '9.4' => 'nba_criterion_94',
        '9.5' => 'nba_criterion_95',
        '9.6' => 'nba_criterion_96',
        '9.7' => 'nba_criterion_97',
        
        // Criteria 10
        '10.1' => 'nba_criterion_101'
    ];
    
    if (!isset($criteriaMap[$criteria])) {
        throw new Exception('Invalid criteria: ' . $criteria);
    }
    
    return $criteriaMap[$criteria];
}
?>