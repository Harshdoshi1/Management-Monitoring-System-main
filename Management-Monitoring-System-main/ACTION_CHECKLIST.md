# ✅ YOUR ACTION CHECKLIST

## Complete These Steps to Finish Integration

---

## 🎯 DO THIS FIRST (30 minutes)

### Step 1: Run Database Schemas

```bash
# 1. Open Supabase Dashboard https://supabase.com/dashboard
# 2. Select project: ijdeeyylabqrsgdebliz
# 3. Click "SQL Editor" → "New Query"

# Run these files in order:
```

**File 1:** `sql/student_table.sql`

- Copy entire file content
- Paste in SQL Editor
- Click "Run"
- ✅ Verify: Database → Tables → See "students" table

**File 2:** Criteria 4-7 tables should already exist

- ✅ Check: criterion_4_1_enrolment, criterion_5_1_sfr, etc.
- If missing, you need to run the schema for these

### Step 2: Set Database Password

```bash
# Open: backend/supabase.php
# Line 16: Replace with your actual password
```

Find your password here:

- Supabase Dashboard → Settings → Database
- Copy the password from "Connection string"

```php
// Change this line in backend/supabase.php:
$PASSWORD = 'your_actual_postgres_password_here';
```

### Step 3: Test Connection

```bash
cd Management-Monitoring-System-main/backend
php test_connection.php
```

**Expected output:**

```
✓ Database connected successfully!
✓ Users table accessible
✓ NBA Criteria tables found: 34
```

---

## ✅ WHAT'S ALREADY DONE (You don't need to do these)

### Backend ✅

- [x] Supabase connection handler (`backend/supabase.php`)
- [x] Authentication system (register, login, logout)
- [x] Student API endpoints (add, get, filter)
- [x] Example save scripts for criteria 4.1 and 8.1
- [x] Universal data fetch script (`get_criteria_data.php`)

### Mobile App ✅

- [x] Supabase service updated with all methods
- [x] Add student page connects to Supabase
- [x] Students list page connects to Supabase
- [x] Criteria 4-7 already working with Supabase

### Database ✅

- [x] 34 NBA tables schema created (1-3, 8-10)
- [x] Student table schema created
- [x] All indexes and foreign keys defined

---

## 📝 WHAT YOU NEED TO DO NEXT

### Priority 1: Test Current Features (30 minutes)

**Test 1: Add Student via Web API**

```bash
curl -X POST http://localhost:8000/backend/add_student_supabase.php \
  -H "Content-Type: application/json" \
  -d '{
    "enrollment_number": "TEST001",
    "student_name": "Test Student",
    "batch": "2024-2028",
    "academic_year": "2024-25",
    "year_of_study": 1,
    "semester": 1
  }'
```

- ✅ Should return: `{"success":true,"message":"Student added successfully"}`

**Test 2: View Student in App**

```bash
cd final_app
flutter run
```

- Open Students List page
- Select batch "2024-2028"
- ✅ Should see "Test Student"

**Test 3: Check in Supabase**

- Supabase Dashboard → Table Editor → students table
- ✅ Should see TEST001 record

### Priority 2: Update Backend Save Scripts (4-6 hours)

You have **29 save scripts** to update. Follow this pattern:

**Example:** Update `backend/NBA/save_421.php`

1. Open `backend/NBA/save_421.php`
2. Follow the steps in `BACKEND_MIGRATION_GUIDE.md`
3. Use `save_41.php` as reference (already updated)
4. Test with cURL after each update

**Quick checklist for each file:**

- [ ] Change `require '../db.php'` → `require '../supabase.php'`
- [ ] Add JSON headers at top
- [ ] Add try-catch block
- [ ] Change `$_POST` → `$input` (JSON support)
- [ ] Update table name if needed
- [ ] Add `getCurrentUserId()` for created_by
- [ ] Replace redirects with JSON responses
- [ ] Test with cURL

**Files to update:**

```
backend/NBA/
├── save_421.php (Criterion 4.2.1 - Success Without Backlog)
├── save_422.php (Criterion 4.2.2 - Success Stipulated)
├── save_43.php (Criterion 4.3 - Academic Performance)
├── save_44.php (Criterion 4.4 - Placement)
├── save_451.php (Criterion 4.5.1 - Professional Chapters)
├── save_452.php (Criterion 4.5.2 - Publications)
├── save_453.php (Criterion 4.5.3 - Student Participation)
├── save_51.php through save_510.php (Criterion 5.1 - 5.10)
├── save_61.php through save_64.php (Criterion 6.1 - 6.4)
└── save_71.php through save_74.php (Criterion 7.1 - 7.4)
```

### Priority 3: Create New Save Scripts for Criteria 1-3, 8-10 (4-6 hours)

You need **34 new save scripts** for criteria 1-3, 8-10.

**Template:** Use `backend/NBA/save_81_supabase.php` as reference

Create files like:

```
save_11.php, save_12.php, save_13.php, save_14.php, save_15.php (Criterion 1)
save_211.php, save_212.php, ... save_225.php (Criterion 2)
save_31.php, save_321.php, save_322.php, save_331.php, save_332.php (Criterion 3)
save_81.php through save_852.php (Criterion 8 - use save_81_supabase.php)
save_91.php through save_97.php (Criterion 9)
save_101.php (Criterion 10)
```

**For each criteria:**

1. Check table fields in `sql/nba_criteria_1_3_8_10.sql`
2. Copy `save_81_supabase.php`
3. Update table name (e.g., `nba_criterion_11`)
4. Update field names and validation
5. Add calculation logic if needed (INFO vs CALCULATION type)
6. Test with cURL

### Priority 4: Update Web Frontend (2-3 hours)

**File:** `js/nba.js`

Replace old Storage methods with fetch() API:

**OLD:**

```javascript
function saveCriterion(data) {
  Storage.saveCriterion("4.1", data);
}
```

**NEW:**

```javascript
async function saveCriterion41(data) {
  try {
    const response = await fetch("backend/NBA/save_41.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      showAlert("success", result.message);
    } else {
      showAlert("error", result.error);
    }
  } catch (error) {
    showAlert("error", "Network error: " + error.message);
  }
}
```

Add data loading:

```javascript
async function loadCriterion41() {
  const response = await fetch(
    "backend/NBA/get_criteria_data.php?criteria=4.1",
  );
  const result = await response.json();
  if (result.success && result.data.length > 0) {
    populateForm(result.data[0]);
  }
}
```

### Priority 5: Mobile App Screens (Optional - 4-6 hours)

Criteria 4-7 are already working. For criteria 1-3, 8-10:

1. Copy existing criteria screen (e.g., `criteria4`)
2. Update table names to use NBA format
3. Use `fetchNbaCriterion()` and `upsertNbaCriterion()` methods
4. Implement calculation logic for CALCULATION type criteria

---

## 🧪 TESTING CHECKLIST

After each update, test:

### Backend API Test

```bash
# Test save
curl -X POST http://localhost:8000/backend/NBA/save_XX.php \
  -H "Content-Type: application/json" \
  -d '{"academic_year":"2024-25",...}'

# Test get
curl "http://localhost:8000/backend/NBA/get_criteria_data.php?criteria=X.Y"
```

### Web Test

1. Open nba.html
2. Navigate to criterion form
3. Enter data
4. Submit
5. Check Supabase Table Editor

### Mobile App Test

1. `flutter run`
2. Navigate to criterion screen
3. Enter data
4. Save
5. Check in Supabase Table Editor

### Synchronization Test

1. Add data from web
2. Open mobile app → Should see the data
3. Add data from mobile app
4. Open web → Should see the data

---

## 📚 REFERENCE DOCUMENTS

When you get stuck, check these:

1. **SUPABASE_INTEGRATION_COMPLETE.md** - Complete guide with all APIs, troubleshooting, examples
2. **BACKEND_MIGRATION_GUIDE.md** - Step-by-step migration pattern for save scripts
3. **QUICK_SETUP.md** - Original setup guide
4. **Example Files:**
   - `backend/NBA/save_41.php` - Updated example (Criterion 4.1)
   - `backend/NBA/save_81_supabase.php` - Example with calculations (Criterion 8.1)
   - `backend/add_student_supabase.php` - Student API example

---

## ⚡ QUICK COMMANDS

**Start PHP Server:**

```bash
cd Management-Monitoring-System-main
php -S localhost:8000
```

**Test Database Connection:**

```bash
php backend/test_connection.php
```

**Run Flutter App:**

```bash
cd final_app
flutter pub get
flutter run
```

**Check Supabase Tables:**

```bash
# Via Dashboard: https://supabase.com/dashboard
# Or via curl:
curl "http://localhost:8000/backend/NBA/get_criteria_data.php?criteria=4.1"
```

---

## 🎯 SUCCESS INDICATORS

You'll know it's working when:

1. ✅ `php backend/test_connection.php` shows success
2. ✅ Can add student via API → Shows in Supabase
3. ✅ Open mobile app → Student appears in Students List
4. ✅ Add criteria data in web → Saves to Supabase
5. ✅ Open mobile app → Criteria data appears
6. ✅ Add criteria data in app → Shows in web
7. ✅ All calculations show correct values
8. ✅ No errors in browser console or Flutter logs

---

## 🆘 COMMON ISSUES

**"Connection refused"**
→ Check database password in `backend/supabase.php`

**"Table does not exist"**
→ Run SQL files in Supabase SQL Editor

**"No students found" in app**
→ Verify batch format matches exactly (e.g., "2024-2028")

**Backend returns empty response**
→ Check PHP has pdo_pgsql extension: `php -m | grep pdo_pgsql`

**CORS errors**
→ Headers already added in PHP files, should work

---

## 📞 SUPPORT

If you need help:

1. Check the comprehensive guide: `SUPABASE_INTEGRATION_COMPLETE.md`
2. Look at working examples: `save_41.php`, `save_81_supabase.php`
3. Test with cURL to isolate issue
4. Check Supabase Dashboard → Logs for database errors

---

**REMEMBER:** Work on one criterion at a time. Test after each update. Don't rush!

**Estimated Time:** 10-15 hours total for remaining work
**Priority:** Database setup → Backend scripts → Web frontend → Mobile screens

---

✨ **You've got this! The hard infrastructure work is done. Now it's just following the patterns.** ✨
