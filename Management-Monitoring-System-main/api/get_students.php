<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'supabase.php';

try {
    // Get query parameters
    $batch = $_GET['batch'] ?? null;
    $academic_year = $_GET['academic_year'] ?? null;
    $year_of_study = $_GET['year_of_study'] ?? null;
    $status = $_GET['status'] ?? 'active';
    $department = $_GET['department'] ?? null;
    
    // Build query dynamically
    $sql = "SELECT 
        id, enrollment_number, student_name, email, phone, batch, academic_year,
        year_of_study, semester, department, division, roll_number,
        admission_date, date_of_birth, gender, category, admission_type,
        status, cgpa, sgpa, backlogs, address, parent_name, parent_phone,
        created_at, updated_at
    FROM students WHERE 1=1";
    
    $params = [];
    
    // Add filters
    if ($batch) {
        $sql .= " AND batch = :batch";
        $params[':batch'] = $batch;
    }
    
    if ($academic_year) {
        $sql .= " AND academic_year = :academic_year";
        $params[':academic_year'] = $academic_year;
    }
    
    if ($year_of_study) {
        $sql .= " AND year_of_study = :year_of_study";
        $params[':year_of_study'] = (int)$year_of_study;
    }
    
    if ($status) {
        $sql .= " AND status = :status";
        $params[':status'] = $status;
    }
    
    if ($department) {
        $sql .= " AND department = :department";
        $params[':department'] = $department;
    }
    
    // Order by enrollment number
    $sql .= " ORDER BY batch DESC, year_of_study ASC, enrollment_number ASC";
    
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    
    $students = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Group students by batch if requested
    $group_by_batch = isset($_GET['group_by_batch']) && $_GET['group_by_batch'] === 'true';
    
    if ($group_by_batch) {
        $grouped = [];
        foreach ($students as $student) {
            $batch_key = $student['batch'];
            if (!isset($grouped[$batch_key])) {
                $grouped[$batch_key] = [];
            }
            $grouped[$batch_key][] = $student;
        }
        
        echo json_encode([
            'success' => true,
            'count' => count($students),
            'students' => $grouped
        ]);
    } else {
        echo json_encode([
            'success' => true,
            'count' => count($students),
            'students' => $students
        ]);
    }
    
} catch (PDOException $e) {
    http_response_code(500);
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
