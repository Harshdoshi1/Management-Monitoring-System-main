# Quick Setup Guide for Supabase Integration

## Step 1: Setup Supabase Database

### 1.1 Create Tables

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to your project: `ijdeeyylabqrsgdebliz`
3. Go to **SQL Editor**
4. Copy and paste the contents of `sql/nba_criteria_1_3_8_10.sql`
5. Click **Run** to execute
6. Verify tables created in **Database** → **Tables**

### 1.2 Verify Users Table

The `users` table should already exist with this structure:

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    roles TEXT[] NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

If not, create it in SQL Editor.

## Step 2: Configure Database Password

### 2.1 Get Your Database Password

1. In Supabase Dashboard → **Settings** → **Database**
2. Find **Connection string** section
3. Copy the password or reset it if needed

### 2.2 Update backend/supabase.php

Open `backend/supabase.php` and update line 16:

```php
$DB_PASS = getenv('SUPABASE_DB_PASSWORD') ?: 'YOUR_PASSWORD_HERE';
```

**OR** set as environment variable (recommended for production):

```bash
# Windows
set SUPABASE_DB_PASSWORD=your_password_here

# Linux/Mac
export SUPABASE_DB_PASSWORD=your_password_here
```

## Step 3: Test Authentication

### 3.1 Register a Test User

1. Open `signup.html` in browser
2. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Role: FACULTY
3. Click "Create Account"
4. Should redirect to login

### 3.2 Verify in Supabase

1. Go to Supabase Dashboard → **Database** → **Table Editor**
2. Select `users` table
3. You should see the new user with:
   - Hashed password (starts with $2y$)
   - roles: `{FACULTY}`

### 3.3 Test Login

1. Open `login.html`
2. Enter: test@example.com / test123
3. Should redirect to dashboard

## Step 4: Test One Complete Criterion (8.1)

### 4.1 Access the Form

1. Login to dashboard
2. Navigate to: `nba.html?criteria=8.1`
3. Form should load with fields:
   - Academic Year
   - Total First Year Students
   - Number of Regular Faculty
   - Fractional Load

### 4.2 Submit Test Data

1. Fill in sample data:
   - Academic Year: 2023-24
   - Students: 120
   - Faculty: 8
   - Fractional Load: 0.5
2. Click Save
3. Expected result: FYSFR = 14.12, Marks = 7.07 (but capped at 5)

### 4.3 Verify in Database

1. Supabase → **Table Editor** → `nba_criterion_81`
2. Check the saved record
3. Verify calculations are correct

## Step 5: Setup Local Development Server

### Option A: PHP Built-in Server

```bash
cd Management-Monitoring-System-main
php -S localhost:8000
```

Access at: http://localhost:8000

### Option B: Apache/XAMPP

1. Copy project to `htdocs` folder
2. Access at: http://localhost/Management-Monitoring-System-main

### Option C: VS Code Live Server

1. Install "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

**Note:** PHP files need actual PHP server (Option A or B)

## Step 6: Common Issues & Solutions

### Issue 1: "Database connection failed"

**Solution:** Check database password in `supabase.php`

### Issue 2: "Could not find driver (pdo_pgsql)"

**Solution:** Enable PostgreSQL PDO extension in php.ini:

```ini
extension=pdo_pgsql
extension=pgsql
```

Restart PHP server after enabling.

### Issue 3: CORS errors

**Solution:** Add to Supabase → **Settings** → **API** → **CORS Allowed Origins**:

```
http://localhost:8000
http://localhost
```

### Issue 4: Registration fails with "email already registered"

**Solution:** User already exists, try different email or delete from Supabase

### Issue 5: Calculations not showing

**Solution:** Check browser console for JavaScript errors, ensure `nba_criteria_updated.js` is loaded

## Step 7: Migration Checklist

Use this checklist to track your progress:

### Database Setup

- [ ] All 34 tables created in Supabase
- [ ] Users table exists with correct schema
- [ ] Indexes created successfully
- [ ] Foreign key constraints working

### Backend

- [ ] Database password configured
- [ ] supabase.php connection working
- [ ] Authentication endpoints working (login/register/logout)
- [ ] Save scripts updated for new criteria
- [ ] Old db.php references removed

### Frontend

- [ ] Login page works
- [ ] Signup page works with role selection
- [ ] Dashboard loads after login
- [ ] Criteria forms load correctly
- [ ] Data saves to Supabase
- [ ] Calculations display correctly

### Testing

- [ ] Can register new user
- [ ] Can login with credentials
- [ ] Can save criterion data
- [ ] Can view saved data
- [ ] Calculations are correct
- [ ] Multi-user access works

### Mobile App

- [ ] Supabase credentials configured
- [ ] Authentication works
- [ ] Forms created for new criteria
- [ ] Data syncs with web
- [ ] Calculations match web

## Step 8: Quick Test Script

Run this to test database connection:

**File:** `backend/test_connection.php`

```php
<?php
require_once 'supabase.php';

echo "Testing Supabase Connection...\n\n";

try {
    // Test connection
    $stmt = $pdo->query("SELECT version()");
    $version = $stmt->fetch();
    echo "✓ Database connected successfully!\n";
    echo "PostgreSQL version: " . $version['version'] . "\n\n";

    // Test users table
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM users");
    $result = $stmt->fetch();
    echo "✓ Users table accessible\n";
    echo "Total users: " . $result['count'] . "\n\n";

    // List all NBA criteria tables
    $stmt = $pdo->query("
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name LIKE 'nba_criterion_%'
        ORDER BY table_name
    ");
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

    echo "✓ NBA Criteria tables found: " . count($tables) . "\n";
    foreach ($tables as $table) {
        echo "  - " . $table . "\n";
    }

    echo "\n✓ All checks passed! System ready.\n";

} catch (PDOException $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
}
?>
```

Run it: `php backend/test_connection.php`

## Next Steps

After completing this setup:

1. **Update remaining save scripts** (see IMPLEMENTATION_SUMMARY.md)
2. **Integrate criteria configurations** into nba.js
3. **Test all criteria forms** (1-3, 8-10)
4. **Implement calculation functions** in JavaScript
5. **Update mobile app** to match web functionality
6. **Apply UI improvements**
7. **Deploy to production**

## Need Help?

- Check `IMPLEMENTATION_SUMMARY.md` for detailed task breakdown
- Review `js/nba_criteria_updated.js` for criteria configurations
- Refer to `sql/nba_criteria_1_3_8_10.sql` for table structures
- Test with `backend/test_connection.php`

---

**Remember:** Always test in development before deploying to production!
