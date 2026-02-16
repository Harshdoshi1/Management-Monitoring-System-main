# Authentication Testing Guide

## Changes Made

### 1. **UI Improvements**

- ✅ Removed funky gradients and icons from signup/login pages
- ✅ Added professional, minimal design across all pages
- ✅ Fixed autofill profile icon issue with CSS
- ✅ Consistent color scheme (Indigo/Blue gradient)
- ✅ Improved spacing and typography

### 2. **Authentication Fixes**

- ✅ Registration properly saves to Supabase
- ✅ Passwords hashed using PASSWORD_BCRYPT
- ✅ Roles stored as lowercase ("faculty" or "hod")
- ✅ Proper error handling and user feedback
- ✅ Console logging for debugging

### 3. **Registration API (api/register.php)**

- Validates all input fields
- Checks for duplicate emails
- Hashes passwords with PASSWORD_BCRYPT
- Stores roles as lowercase JSON array: ["faculty"] or ["hod"]
- Returns proper success/error messages

### 4. **Login API (api/login.php)**

- Retrieves user from Supabase
- Verifies hashed password
- Extracts role from JSON array
- Returns lowercase role in response

## Testing Steps

### Test Registration:

1. Open `signup.html`
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
   - Role: Faculty Member or HOD
3. Click "Create Account"
4. Should see: "Account created successfully! Redirecting to login..."
5. Check browser console for logs

### Test Login:

1. Open `login.html`
2. Enter registered email and password
3. Click "Sign In"
4. Should redirect to dashboard

### Verify in Supabase:

1. Go to Supabase Dashboard
2. Navigate to Table Editor > users table
3. Check new user record:
   - `password_hash`: Should be a bcrypt hash (starts with $2y$)
   - `roles`: Should be `["faculty"]` or `["hod"]` (lowercase JSON array)

## Files Modified

1. ✅ signup.html - Clean UI, better error handling
2. ✅ login.html - Professional design, removed demo credentials
3. ✅ index.html - Improved hero section and cards
4. ✅ dashboard.html - Updated color scheme
5. ✅ api/register.php - Already properly configured
6. ✅ api/login.php - Fixed role extraction

## Deployment to Vercel

After committing these changes:

1. Push to GitHub
2. Vercel will auto-deploy
3. Test authentication on live site
4. Check Vercel logs if issues occur

## Troubleshooting

If registration doesn't work:

1. Check browser console for errors
2. Check Supabase API keys in register.php
3. Verify Supabase table has correct columns:
   - id (uuid, primary key)
   - name (text)
   - email (text, unique)
   - password_hash (text)
   - roles (jsonb or text)
   - created_at (timestamp)

## Notes

- Password minimum length: 6 characters
- Roles are case-insensitive on input but stored as lowercase
- All API responses include proper success/error messages
- UI is now professional and consistent across all pages
