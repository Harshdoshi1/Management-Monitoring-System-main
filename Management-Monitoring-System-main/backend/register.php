<?php
/**
 * User Registration Handler
 * Registers new users in Supabase users table
 */

require_once __DIR__ . '/supabase.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

$name = trim($input['name'] ?? '');
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';
$role = trim($input['role'] ?? 'FACULTY');

// Validation
if (empty($name) || empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email format']);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode(['success' => false, 'message' => 'Password must be at least 6 characters']);
    exit;
}

// Validate role
$validRoles = ['HOD', 'FACULTY'];
if (!in_array($role, $validRoles)) {
    $role = 'FACULTY'; // Default to FACULTY
}

try {
    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Email already registered']);
        exit;
    }
    
    // Hash password (using simple hashing for now, in production use password_hash with PASSWORD_BCRYPT)
    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    
    // Insert new user
    $stmt = $pdo->prepare("
        INSERT INTO users (name, email, password_hash, roles, created_at) 
        VALUES (:name, :email, :password_hash, :roles, CURRENT_TIMESTAMP)
        RETURNING id
    ");
    
    $stmt->execute([
        ':name' => $name,
        ':email' => $email,
        ':password_hash' => $password_hash,
        ':roles' => '{' . $role . '}' // PostgreSQL array format
    ]);
    
    $result = $stmt->fetch();
    $userId = $result['id'];
    
    // Set authentication cookies
    setAuthCookie($userId, $email, $role);
    
    echo json_encode([
        'success' => true,
        'message' => 'Registration successful',
        'user' => [
            'id' => $userId,
            'name' => $name,
            'email' => $email,
            'role' => $role
        ]
    ]);
    
} catch (PDOException $e) {
    error_log("Registration error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Registration failed. Please try again.']);
}
