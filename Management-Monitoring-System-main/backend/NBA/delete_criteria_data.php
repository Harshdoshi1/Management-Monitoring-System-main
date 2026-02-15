<?php
/**
 * Delete NBA criteria record from Supabase
 */
require_once '../db.php';
require_once '../helpers.php';

// Set JSON response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
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
    
    $criteria = $input['criteria'] ?? '';
    $id = $input['id'] ?? '';
    
    if (empty($criteria) || empty($id)) {
        throw new Exception('Criteria and ID are required');
    }
    
    // Map criteria to table names (same mapping as get_criteria_data.php)
    $table = getCriteriaTableName($criteria);
    
    // Delete from Supabase
    $supabaseUrl = SUPABASE_URL . "/rest/v1/" . $table . "?id=eq." . urlencode($id);
    
    $headers = [
        'apikey: ' . SUPABASE_ANON_KEY,
        'Authorization: Bearer ' . SUPABASE_ANON_KEY,
        'Content-Type: application/json',
        'Prefer: return=minimal'
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $supabaseUrl);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
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
    
    if ($httpCode !== 204 && $httpCode !== 200) {
        throw new Exception('Delete failed: HTTP ' . $httpCode . ' - ' . $response);
    }
    
    // Send success response
    echo json_encode([
        'success' => true,
        'message' => 'Record deleted successfully'
    ]);
    
} catch (Exception $e) {
    // Send error response
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

/**
 * Get table name for criteria (same as in get_criteria_data.php)
 */
function getCriteriaTableName($criteria) {
    // Map criteria to table names
    $criteriaMap = [
        // Criteria 1
        '1.1' => 'nba_criteria_11',
        '1.2' => 'nba_criteria_12', 
        '1.3' => 'nba_criteria_13',
        '1.4' => 'nba_criteria_14',
        '1.5' => 'nba_criteria_15',
        
        // Criteria 2
        '2.1.1' => 'nba_criteria_211',
        '2.1.2' => 'nba_criteria_212',
        '2.1.3' => 'nba_criteria_213',
        '2.1.4' => 'nba_criteria_214',
        '2.2.1' => 'nba_criteria_221',
        '2.2.2' => 'nba_criteria_222',
        '2.2.3' => 'nba_criteria_223',
        '2.2.4' => 'nba_criteria_224',
        '2.2.5' => 'nba_criteria_225',
        
        // Criteria 3
        '3.1' => 'nba_criteria_31',
        '3.2.1' => 'nba_criteria_321',
        '3.2.2' => 'nba_criteria_322',
        '3.3.1' => 'nba_criteria_331',
        '3.3.2' => 'nba_criteria_332',
        
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
        '8.1' => 'nba_criteria_81',
        '8.2' => 'nba_criteria_82',
        '8.3' => 'nba_criteria_83',
        '8.4.1' => 'nba_criteria_841',
        '8.4.2' => 'nba_criteria_842',
        '8.5.1' => 'nba_criteria_851',
        '8.5.2' => 'nba_criteria_852',
        
        // Criteria 9
        '9.1' => 'nba_criteria_91',
        '9.2' => 'nba_criteria_92',
        '9.3' => 'nba_criteria_93',
        '9.4' => 'nba_criteria_94',
        '9.5' => 'nba_criteria_95',
        '9.6' => 'nba_criteria_96',
        '9.7' => 'nba_criteria_97',
        
        // Criteria 10
        '10.1' => 'nba_criteria_101'
    ];
    
    if (!isset($criteriaMap[$criteria])) {
        throw new Exception('Invalid criteria: ' . $criteria);
    }
    
    return $criteriaMap[$criteria];
}
?>