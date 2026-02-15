<?php
/**
 * Database Connection Test Script
 * Run this to verify Supabase connection is working correctly
 * 
 * Usage: php backend/test_connection.php
 */

require_once 'supabase.php';

header('Content-Type: text/plain; charset=utf-8');

echo "===============================================\n";
echo "  SUPABASE CONNECTION TEST\n";
echo "===============================================\n\n";

try {
    // Test 1: Basic Connection
    echo "[1] Testing database connection...";
    $stmt = $pdo->query("SELECT version()");
    $version = $stmt->fetch();
    echo " ✓ PASSED\n";
    echo "    PostgreSQL version: " . substr($version['version'], 0, 50) . "...\n\n";
    
    // Test 2: Users Table
    echo "[2] Testing users table...";
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $result = $stmt->fetch();
    echo " ✓ PASSED\n";
    echo "    Total users: " . $result['count'] . "\n\n";
    
    // Test 3: List Sample Users
    if ($result['count'] > 0) {
        echo "[3] Sample users:\n";
        $stmt = $pdo->query("SELECT id, name, email, roles FROM users LIMIT 5");
        while ($user = $stmt->fetch()) {
            echo "    - ID: {$user['id']}, Name: {$user['name']}, Email: {$user['email']}, Roles: {$user['roles']}\n";
        }
        echo "\n";
    }
    
    // Test 4: NBA Criteria Tables
    echo "[4] Checking NBA criteria tables...";
    $stmt = $pdo->query("
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name LIKE 'nba_criterion_%'
        ORDER BY table_name
    ");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo " ✓ PASSED\n";
    echo "    Tables found: " . count($tables) . "\n";
    
    // Group by criterion
    $criteria = [];
    foreach ($tables as $table) {
        preg_match('/nba_criterion_(\d+)/', $table, $matches);
        if ($matches) {
            $criterion = $matches[1];
            if (!isset($criteria[$criterion])) {
                $criteria[$criterion] = [];
            }
            $criteria[$criterion][] = $table;
        }
    }
    
    foreach ($criteria as $num => $criterionTables) {
        echo "    Criterion {$num}: " . count($criterionTables) . " tables\n";
    }
    echo "\n";
    
    // Test 5: Sample Data Check
    echo "[5] Checking for sample data:\n";
    $sampleTables = ['nba_criterion_81', 'nba_criterion_91', 'nba_criterion_211'];
    foreach ($sampleTables as $table) {
        if (in_array($table, $tables)) {
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM {$table}");
            $count = $stmt->fetch()['count'];
            echo "    - {$table}: {$count} records\n";
        }
    }
    echo "\n";
    
    // Test 6: Write Test
    echo "[6] Testing write permissions...";
    $testData = [
        'academic_year' => 'TEST-' . date('Y'),
        'mentoring_system_details' => 'Connection test entry',
        'terms_of_reference' => 'Test',
        'implementation' => 'Test',
        'effectiveness' => 'Test',
        'marks' => 0,
    ];
    
    $stmt = $pdo->prepare("
        INSERT INTO nba_criterion_91 
        (academic_year, mentoring_system_details, terms_of_reference, implementation, effectiveness, marks)
        VALUES (:year, :details, :terms, :impl, :eff, :marks)
        RETURNING id
    ");
    $stmt->execute($testData);
    $testId = $stmt->fetch()['id'];
    echo " ✓ PASSED\n";
    echo "    Test record created with ID: {$testId}\n\n";
    
    // Clean up test data
    echo "[7] Cleaning up test data...";
    $stmt = $pdo->prepare("DELETE FROM nba_criterion_91 WHERE id = :id");
    $stmt->execute([':id' => $testId]);
    echo " ✓ PASSED\n\n";
    
    // Summary
    echo "===============================================\n";
    echo "  ✓ ALL TESTS PASSED!\n";
    echo "===============================================\n";
    echo "\nDatabase is properly configured and ready to use.\n";
    echo "You can now:\n";
    echo "  1. Register users through signup.html\n";
    echo "  2. Login through login.html\n";
    echo "  3. Start entering NBA criteria data\n\n";
    
} catch (PDOException $e) {
    echo " ✗ FAILED\n\n";
    echo "===============================================\n";
    echo "  ERROR DETAILS\n";
    echo "===============================================\n";
    echo "Message: " . $e->getMessage() . "\n";
    echo "Code: " . $e->getCode() . "\n";
    echo "File: " . $e->getFile() . "\n";
    echo "Line: " . $e->getLine() . "\n\n";
    
    echo "TROUBLESHOOTING:\n";
    echo "1. Check database password in backend/supabase.php\n";
    echo "2. Ensure pdo_pgsql extension is enabled in php.ini\n";
    echo "3. Verify Supabase project is active\n";
    echo "4. Check if all SQL tables were created\n\n";
    
    exit(1);
}
?>
