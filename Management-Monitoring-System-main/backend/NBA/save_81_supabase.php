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

    // Validate required fields
    $academic_year = trim($input['academic_year'] ?? '');
    $total_students = intval($input['total_students'] ?? 0);
    $regular_faculty = intval($input['regular_faculty'] ?? 0);
    $fractional_load = floatval($input['fractional_load'] ?? 0);

    if ($academic_year === '' || $total_students <= 0 || $regular_faculty <= 0) {
        throw new Exception('Academic year, total students, and regular faculty are required');
    }

    // Calculate effective faculty and FYSFR
    $effective_faculty = $regular_faculty + $fractional_load;
    $student_faculty_ratio = $effective_faculty > 0 ? ($total_students / $effective_faculty) : 0;

    // Calculate marks based on FYSFR formula
    // Marks = (5 × 20) / FYSFR (Max 5, 0 if FYSFR > 25)
    $marks = 0;
    if ($student_faculty_ratio > 0 && $student_faculty_ratio <= 25) {
        $marks = min(5, (5 * 20) / $student_faculty_ratio);
    }

    // Get current user ID
    $created_by = getCurrentUserId();

    // Check if record exists for this year
    $check_sql = "SELECT id FROM nba_criterion_81 WHERE academic_year = :year";
    $stmt = $pdo->prepare($check_sql);
    $stmt->execute([':year' => $academic_year]);
    $existing = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existing) {
        // Update existing record
        $stmt = $pdo->prepare("UPDATE nba_criterion_81 
            SET total_students = :students, 
                regular_faculty = :faculty, 
                fractional_load = :fractional,
                effective_faculty = :effective,
                student_faculty_ratio = :sfr,
                marks = :marks,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = :id 
            RETURNING *");
        $stmt->execute([
            ':students' => $total_students,
            ':faculty' => $regular_faculty,
            ':fractional' => $fractional_load,
            ':effective' => $effective_faculty,
            ':sfr' => $student_faculty_ratio,
            ':marks' => $marks,
            ':id' => $existing['id']
        ]);
    } else {
        // Insert new record
        $stmt = $pdo->prepare("INSERT INTO nba_criterion_81 
            (academic_year, total_students, regular_faculty, fractional_load, 
             effective_faculty, student_faculty_ratio, marks, created_by) 
            VALUES (:year, :students, :faculty, :fractional, :effective, :sfr, :marks, :created_by)
            RETURNING *");
        $stmt->execute([
            ':year' => $academic_year,
            ':students' => $total_students,
            ':faculty' => $regular_faculty,
            ':fractional' => $fractional_load,
            ':effective' => $effective_faculty,
            ':sfr' => $student_faculty_ratio,
            ':marks' => $marks,
            ':created_by' => $created_by
        ]);
    }

    $saved_record = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'message' => 'Saved successfully! Marks: ' . number_format($marks, 2) . '/5 (FYSFR: ' . number_format($student_faculty_ratio, 2) . ')',
        'data' => $saved_record,
        'calculations' => [
            'effective_faculty' => $effective_faculty,
            'student_faculty_ratio' => number_format($student_faculty_ratio, 2),
            'marks' => number_format($marks, 2)
        ]
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
