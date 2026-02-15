# Backend Scripts Migration Guide - Supabase Connection

## Overview

This guide shows how to update all NBA backend save scripts to use Supabase instead of MySQL. The pattern is consistent across all criteria.

## Files to Update

### Criteria 4 - Student Performance (8 files)

- `save_41.php` - ✅ **UPDATED** (Enrollment Ratio)
- `save_421.php` - Success Rate Without Backlog
- `save_422.php` - Success Rate in Stipulated Period
- `save_43.php` - Academic Performance
- `save_44.php` - Placement
- `save_451.php` - Professional Chapters
- `save_452.php` - Publications
- `save_453.php` - Student Participation

### Criteria 5 - Faculty Information (13 files)

- `save_51.php` - Student-Faculty Ratio
- `save_52.php` - Faculty Cadre
- `save_53.php` - Faculty Qualifications
- `save_54.php` - Faculty Retention
- `save_55.php` - Faculty Competencies
- `save_56.php` - Innovations
- `save_57.php` - FDP Participation
- `save_581.php` - Academic Research
- `save_582.php` - Sponsored Research
- `save_583.php` - Development Activities
- `save_584.php` - Consultancy
- `save_59.php` - FPADS
- `save_510.php` - Visiting Faculty

### Criteria 6 - Facilities (4 files)

- `save_61.php` - Laboratories
- `save_62.php` - Maintenance
- `save_63.php` - Safety
- `save_64.php` - Project Lab

### Criteria 7 - Continuous Improvement (4 files)

- `save_71.php` - PO/PSO Actions
- `save_72.php` - Academic Audit
- `save_73.php` - Placement Improvement
- `save_74.php` - Student Quality

### Criteria 1-3, 8-10 (NEW - Need to create)

These follow the same pattern but use tables like `nba_criterion_11`, `nba_criterion_211`, etc.

## Migration Pattern

### Step 1: Update Headers

**OLD:**

```php
<?php
require_once __DIR__ . '/../db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header("Location: ../../frontend/index.php");
    exit;
}
```

**NEW:**

```php
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
```

### Step 2: Change Input Handling

**OLD:**

```php
$value = $_POST['field_name'] ?? '';
```

**NEW:**

```php
$value = $input['field_name'] ?? '';
```

### Step 3: Update Table Names

**Criteria 4-7:** Already using correct names (`criterion_4_1_enrolment`, etc.)
**Criteria 1-3, 8-10:** Use format `nba_criterion_11`, `nba_criterion_211`, `nba_criterion_81`, etc.

### Step 4: Update SQL Queries

**OLD:**

```php
$stmt = $pdo->prepare("INSERT INTO table_name (field1, field2) VALUES (:f1, :f2)");
$stmt->execute([':f1' => $val1, ':f2' => $val2]);
```

**NEW:**

```php
// For Criteria 1-3, 8-10 (uses created_by and SERIAL id)
$stmt = $pdo->prepare("INSERT INTO nba_criterion_xx
    (academic_year, field1, field2, marks, created_by)
    VALUES (:year, :f1, :f2, :marks, :created_by)
    RETURNING id, academic_year, field1, field2, marks");

$stmt->execute([
    ':year' => $academic_year,
    ':f1' => $val1,
    ':f2' => $val2,
    ':marks' => $marks,
    ':created_by' => getCurrentUserId()
]);

$saved_record = $stmt->fetch(PDO::FETCH_ASSOC);

// For Criteria 4-7 (uses department_id and UUID)
$stmt = $pdo->prepare("INSERT INTO criterion_x_y_table
    (department_id, academic_year, field1, field2, marks, created_by)
    VALUES (:dept_id, :year, :f1, :f2, :marks, :created_by)
    RETURNING id, academic_year, field1, field2, marks");

$stmt->execute([
    ':dept_id' => $input['department_id'] ?? null,
    ':year' => $academic_year,
    ':f1' => $val1,
    ':f2' => $val2,
    ':marks' => $marks,
    ':created_by' => getCurrentUserId()
]);

$saved_record = $stmt->fetch(PDO::FETCH_ASSOC);
```

### Step 5: Replace Redirects with JSON Responses

**OLD:**

```php
header("Location: ../../frontend/nba_page.php?msg=Success&type=success");
exit;
```

**NEW:**

```php
echo json_encode([
    'success' => true,
    'message' => 'Saved successfully! Marks: ' . $marks . '/20',
    'data' => $saved_record,
    'marks' => $marks
]);
```

### Step 6: Add Error Handling

**OLD:**

```php
if ($error) {
    header("Location: ../../frontend/nba_page.php?msg=Error&type=error");
    exit;
}
```

**NEW:**

```php
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
```

## Complete Example: save_81.php (Criterion 8.1 - FYSFR)

```php
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
        'message' => 'Saved successfully! Marks: ' . number_format($marks, 2) . '/5',
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
```

## Testing the Save Scripts

### Using cURL:

```bash
curl -X POST http://localhost:8000/backend/NBA/save_81.php \
  -H "Content-Type: application/json" \
  -d '{
    "academic_year": "2023-24",
    "total_students": 120,
    "regular_faculty": 8,
    "fractional_load": 2.5
  }'
```

### Using JavaScript fetch:

```javascript
async function saveCriterion81(data) {
  const response = await fetch("backend/NBA/save_81.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  console.log(result);
  return result;
}

// Usage
await saveCriterion81({
  academic_year: "2023-24",
  total_students: 120,
  regular_faculty: 8,
  fractional_load: 2.5,
});
```

## Quick Migration Checklist

For each save script:

- [ ] Replace `require_once '../db.php'` with `require_once '../supabase.php'`
- [ ] Add JSON headers at the top
- [ ] Add try-catch error handling
- [ ] Change `$_POST` to `$input` variable
- [ ] Update table names (check mapping)
- [ ] Add `RETURNING *` to INSERT/UPDATE queries
- [ ] Add `created_by` field using `getCurrentUserId()`
- [ ] Replace header redirects with `json_encode()` responses
- [ ] Add proper success/error JSON responses
- [ ] Test with JSON data

## Batch Update Script

Save this as `update_all_saves.sh` and run to update multiple files:

```bash
#!/bin/bash
# This script helps update multiple save files

files=(
    "save_421.php" "save_422.php" "save_43.php" "save_44.php"
    "save_451.php" "save_452.php" "save_453.php"
    "save_51.php" "save_52.php" "save_53.php" "save_54.php"
    "save_55.php" "save_56.php" "save_57.php"
    "save_581.php" "save_582.php" "save_583.php" "save_584.php"
    "save_59.php" "save_510.php"
    "save_61.php" "save_62.php" "save_63.php" "save_64.php"
    "save_71.php" "save_72.php" "save_73.php" "save_74.php"
)

for file in "${files[@]}"; do
    if [ -f "backend/NBA/$file" ]; then
        echo "Updating $file..."
        # Backup original
        cp "backend/NBA/$file" "backend/NBA/$file.backup"
        # TODO: Apply sed/awk transformations here
    fi
done
```

## Need Help?

See `save_41.php` (updated) and the example `save_81.php` above as reference implementations.

All scripts follow the same pattern - just update table names and field names according to your criteria.
