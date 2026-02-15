<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'supabase.php';

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
    
    // Get current user ID if authenticated
    $created_by = getCurrentUserId();
    
    // Prepare SQL insert
    $sql = "INSERT INTO students (
        enrollment_number, student_name, email, phone, batch, academic_year,
        year_of_study, semester, department, division, roll_number,
        admission_date, date_of_birth, gender, category, admission_type,
        status, cgpa, sgpa, backlogs, address, parent_name, parent_phone, created_by
    ) VALUES (
        :enrollment_number, :student_name, :email, :phone, :batch, :academic_year,
        :year_of_study, :semester, :department, :division, :roll_number,
        :admission_date, :date_of_birth, :gender, :category, :admission_type,
        :status, :cgpa, :sgpa, :backlogs, :address, :parent_name, :parent_phone, :created_by
    ) RETURNING id, enrollment_number, student_name, batch, academic_year, year_of_study, semester, created_at";
    
    $stmt = $pdo->prepare($sql);
    
    // Bind parameters
    $stmt->execute([
        ':enrollment_number' => $input['enrollment_number'],
        ':student_name' => $input['student_name'],
        ':email' => $input['email'] ?? null,
        ':phone' => $input['phone'] ?? null,
        ':batch' => $input['batch'],
        ':academic_year' => $input['academic_year'],
        ':year_of_study' => (int)$input['year_of_study'],
        ':semester' => (int)$input['semester'],
        ':department' => $input['department'] ?? null,
        ':division' => $input['division'] ?? null,
        ':roll_number' => $input['roll_number'] ?? null,
        ':admission_date' => $input['admission_date'] ?? null,
        ':date_of_birth' => $input['date_of_birth'] ?? null,
        ':gender' => $input['gender'] ?? null,
        ':category' => $input['category'] ?? null,
        ':admission_type' => $input['admission_type'] ?? 'Regular',
        ':status' => $input['status'] ?? 'active',
        ':cgpa' => isset($input['cgpa']) ? (float)$input['cgpa'] : null,
        ':sgpa' => isset($input['sgpa']) ? (float)$input['sgpa'] : null,
        ':backlogs' => isset($input['backlogs']) ? (int)$input['backlogs'] : 0,
        ':address' => $input['address'] ?? null,
        ':parent_name' => $input['parent_name'] ?? null,
        ':parent_phone' => $input['parent_phone'] ?? null,
        ':created_by' => $created_by
    ]);
    
    $student = $stmt->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode([
        'success' => true,
        'message' => 'Student added successfully',
        'student' => $student
    ]);
    
} catch (PDOException $e) {
    http_response_code(400);
    
    // Check for unique constraint violation
    if (strpos($e->getMessage(), 'unique') !== false) {
        echo json_encode([
            'success' => false,
            'error' => 'Student with this enrollment number or email already exists'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Database error: ' . $e->getMessage()
        ]);
    }
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
