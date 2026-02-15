<?php
/**
 * User Login Handler
 * Authenticates users against Supabase users table
 */

require_once __DIR__ . '/supabase.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

// Validation
if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email and password are required']);
    exit;
}

try {
    // Find user by email
    $stmt = $pdo->prepare("SELECT id, name, email, password_hash, roles FROM users WHERE email = :email");
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch();
    
    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
    
    // Verify password
    // Check both bcrypt and plain text for backward compatibility
    $passwordValid = false;
    if (password_verify($password, $user['password_hash'])) {
        $passwordValid = true;
    } elseif ($user['password_hash'] === $password) {
        // Plain text password (for backward compatibility)
        // Update to hashed password
        $newHash = password_hash($password, PASSWORD_BCRYPT);
        $updateStmt = $pdo->prepare("UPDATE users SET password_hash = :hash WHERE id = :id");
        $updateStmt->execute([':hash' => $newHash, ':id' => $user['id']]);
        $passwordValid = true;
    }
    
    if (!$passwordValid) {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password']);
        exit;
    }
    
    // Extract role from PostgreSQL array format
    $roles = $user['roles'];
    // PostgreSQL returns arrays as {FACULTY} or {HOD,FACULTY}
    $roles = trim($roles, '{}');
    $roleArray = explode(',', $roles);
    $primaryRole = $roleArray[0];
    
    // Set authentication cookies
    setAuthCookie($user['id'], $user['email'], $primaryRole);
    
    echo json_encode([
        'success' => true,
        'message' => 'Login successful',
        'user' => [
            'id' => $user['id'],
            'name' => $user['name'],
            'email' => $user['email'],
            'role' => $primaryRole
        ]
    ]);
    
} catch (PDOException $e) {
    error_log("Login error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Login failed. Please try again.']);
}
