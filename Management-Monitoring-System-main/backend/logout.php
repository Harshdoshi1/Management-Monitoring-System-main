<?php
/**
 * User Logout Handler
 * Clears authentication cookies
 */

require_once __DIR__ . '/supabase.php';

header('Content-Type: application/json');

// Clear authentication cookies
clearAuthCookies();

echo json_encode([
    'success' => true,
    'message' => 'Logged out successfully'
]);
