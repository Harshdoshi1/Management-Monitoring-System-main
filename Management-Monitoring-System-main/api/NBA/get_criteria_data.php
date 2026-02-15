<?php
/**
 * Get NBA criteria data from Supabase using REST API
 */

// Supabase Configuration
define('SUPABASE_URL', 'https://ijdeeyylabqrsgdebliz.supabase.co');
define('SUPABASE_ANON_KEY', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

/**
 * Convert snake_case to camelCase
 */
function snakeToCamel($input) {
    return lcfirst(str_replace(' ', '', ucwords(str_replace('_', ' ', $input))));
}

/**
 * Convert all array keys from snake_case to camelCase
 */
function convertArrayKeysToCamel($array) {
    $result = [];
    foreach ($array as $key => $value) {
        $newKey = snakeToCamel($key);
        $result[$newKey] = $value;
    }
    return $result;
}

try {
    // Get query parameters
    $criteria = $_GET['criteria'] ?? null;
    $academic_year = $_GET['academic_year'] ?? null;
    
    if (!$criteria) {
        throw new Exception('Criteria parameter is required');
    }
    
    // Map criteria to table names
    $table_mapping = [
        // Criterion 1
        '1.1' => 'nba_criterion_11',
        '1.2' => 'nba_criterion_12',
        '1.3' => 'nba_criterion_13',
        '1.4' => 'nba_criterion_14',
        '1.5' => 'nba_criterion_15',
        
        // Criterion 2
        '2.1.1' => 'nba_criterion_211',
        '2.1.2' => 'nba_criterion_212',
        '2.1.3' => 'nba_criterion_213',
        '2.1.4' => 'nba_criterion_214',
        '2.2.1' => 'nba_criterion_221',
        '2.2.2' => 'nba_criterion_222',
        '2.2.3' => 'nba_criterion_223',
        '2.2.4' => 'nba_criterion_224',
        '2.2.5' => 'nba_criterion_225',
        
        // Criterion 3
        '3.1' => 'nba_criterion_31',
        '3.2.1' => 'nba_criterion_321',
        '3.2.2' => 'nba_criterion_322',
        '3.3.1' => 'nba_criterion_331',
        '3.3.2' => 'nba_criterion_332',
        
        // Criterion 4
        '4.1' => 'criterion_4_1_enrolment',
        '4.2.1' => 'criterion_4_2_1_success_no_backlog',
        '4.2.2' => 'criterion_4_2_2_success_stipulated',
        '4.3' => 'criterion_4_3_academic_performance',
        '4.4' => 'criterion_4_4_placement',
        '4.5.1' => 'criterion_4_5_1_professional_chapters',
        '4.5.2' => 'criterion_4_5_2_publications',
        '4.5.3' => 'criterion_4_5_3_student_participation',
        
        // Criterion 5
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
        
        // Criterion 6
        '6.1' => 'criterion_6_1_labs_tech',
        '6.2' => 'criterion_6_2_maintenance',
        '6.3' => 'criterion_6_3_safety',
        '6.4' => 'criterion_6_4_project_lab',
        
        // Criterion 7
        '7.1' => 'criterion_7_1_po_pso_actions',
        '7.2' => 'criterion_7_2_academic_audit',
        '7.3' => 'criterion_7_3_placement_improvement',
        '7.4' => 'criterion_7_4_student_quality',
        
        // Criterion 8
        '8.1' => 'nba_criterion_81',
        '8.2' => 'nba_criterion_82',
        '8.3' => 'nba_criterion_83',
        '8.4.1' => 'nba_criterion_841',
        '8.4.2' => 'nba_criterion_842',
        '8.5.1' => 'nba_criterion_851',
        '8.5.2' => 'nba_criterion_852',
        
        // Criterion 9
        '9.1' => 'nba_criterion_91',
        '9.2' => 'nba_criterion_92',
        '9.3' => 'nba_criterion_93',
        '9.4' => 'nba_criterion_94',
        '9.5' => 'nba_criterion_95',
        '9.6' => 'nba_criterion_96',
        '9.7' => 'nba_criterion_97',
        
        // Criterion 10
        '10.1' => 'nba_criterion_101',
    ];
    
    if (!isset($table_mapping[$criteria])) {
        throw new Exception('Invalid criteria: ' . $criteria);
    }
    
    $table_name = $table_mapping[$criteria];
    
    // Build Supabase REST API URL
    $url = SUPABASE_URL . '/rest/v1/' . $table_name . '?order=created_at.desc';
    
    if ($academic_year) {
        $url .= '&academic_year=eq.' . urlencode($academic_year);
    }
    
    // Make request to Supabase
    $headers = [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
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
        throw new Exception('Supabase error: HTTP ' . $httpCode);
    }
    
    $data = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('JSON decode error');
    }
    
    // Convert snake_case keys to camelCase for JavaScript
    $convertedData = array_map('convertArrayKeysToCamel', $data);
    
    echo json_encode([
        'success' => true,
        'criteria' => $criteria,
        'table' => $table_name,
        'count' => count($convertedData),
        'data' => $convertedData
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'data' => []
    ]);
}
?>

