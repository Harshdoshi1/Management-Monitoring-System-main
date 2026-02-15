<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once __DIR__ . '/../supabase.php';

try {
    // Get JSON input or form data
    $input = $_SERVER['CONTENT_TYPE'] === 'application/json' 
        ? json_decode(file_get_contents('php://input'), true) 
        : $_POST;

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Invalid request method');
    }

    $intake = intval($input['intake'] ?? 0);
    $admitted = intval($input['admitted'] ?? 0);
    $academic_year = trim($input['academic_year'] ?? '');
    $department_id = $input['department_id'] ?? null;

    if ($intake <= 0 || $admitted < 0 || $academic_year === '') {
        throw new Exception('Invalid data: intake, admitted, and academic_year are required');
    }

    // Calculate enrollment ratio for this year
    $enrollment_ratio = ($admitted / $intake) * 100;

    // Get current user ID
    $created_by = getCurrentUserId();

    // Check if record exists for this year and department
    $check_sql = "SELECT id FROM criterion_4_1_enrolment 
                  WHERE academic_year = :year";
    $check_params = [':year' => $academic_year];
    
    if ($department_id) {
        $check_sql .= " AND department_id = :dept_id";
        $check_params[':dept_id'] = $department_id;
    }
    
    $stmt = $pdo->prepare($check_sql);
    $stmt->execute($check_params);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        // Update existing record
        $stmt = $pdo->prepare("UPDATE criterion_4_1_enrolment 
            SET intake = :intake, admitted = :admitted, ratio = :ratio, updated_at = NOW() 
            WHERE id = :id 
            RETURNING id, academic_year, intake, admitted, ratio");
        $result = $stmt->execute([
            ':intake' => $intake, 
            ':admitted' => $admitted, 
            ':ratio' => $enrollment_ratio,
            ':id' => $existing['id']
        ]);
    } else {
        // Insert new record
        $insert_sql = "INSERT INTO criterion_4_1_enrolment 
            (department_id, academic_year, intake, admitted, ratio, marks, created_by) 
            VALUES (:dept_id, :year, :intake, :admitted, :ratio, 0, :created_by)
            RETURNING id, academic_year, intake, admitted, ratio";
        $stmt = $pdo->prepare($insert_sql);
        $stmt->execute([
            ':dept_id' => $department_id,
            ':year' => $academic_year, 
            ':intake' => $intake, 
            ':admitted' => $admitted, 
            ':ratio' => $enrollment_ratio,
            ':created_by' => $created_by
        ]);
    }

    $saved_record = $stmt->fetch(PDO::FETCH_ASSOC);

    // Get last 3 years of data to calculate average
    $stmt = $pdo->prepare("SELECT ratio FROM criterion_4_1_enrolment 
                           ORDER BY academic_year DESC LIMIT 3");
    $stmt->execute();
    $ratios = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Calculate average enrollment ratio
    $avg_ratio = 0;
    if (count($ratios) > 0) {
        $avg_ratio = array_sum($ratios) / count($ratios);
    }

    // Apply marking scheme based on average
    // A. ≥90% → 20 marks
    // B. ≥80% → 18 marks  
    // C. ≥70% → 16 marks
    // D. ≥60% → 14 marks
    // Otherwise → 0 marks
    $marks = 0;
    if ($avg_ratio >= 90) {
        $marks = 20;
    } elseif ($avg_ratio >= 80) {
        $marks = 18;
    } elseif ($avg_ratio >= 70) {
        $marks = 16;
    } elseif ($avg_ratio >= 60) {
        $marks = 14;
    }

    // Update marks for all entries (since it's based on 3-year average)
    $pdo->prepare("UPDATE criterion_4_1_enrolment SET marks = :marks")->execute([':marks' => $marks]);

    echo json_encode([
        'success' => true,
        'message' => 'Saved successfully! Marks: ' . $marks . '/20 (Avg Ratio: ' . number_format($avg_ratio, 2) . '%)',
        'data' => $saved_record,
        'marks' => $marks,
        'avg_ratio' => $avg_ratio
    ]);

} catch (PDOException $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}

