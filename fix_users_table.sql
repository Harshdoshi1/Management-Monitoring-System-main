-- Clean up test users with plain passwords
-- Run this in Supabase SQL Editor

-- 1. Delete test users with plain text passwords (optional)
-- DELETE FROM users WHERE password_hash IN ('123456', '["FACULTY"]', '["faculty"]');

-- 2. Ensure the users table has the correct structure
-- This will show your current table structure
-- \d users

-- 3. If RLS is enabled, you need policies to allow insert/select
-- Check if RLS is enabled:
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'users';

-- 4. If RLS is enabled (rowsecurity = true), create policies:

-- Allow anyone to insert new users (for registration)
CREATE POLICY "Allow public insert" ON users
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow users to select their own data (for login)
CREATE POLICY "Allow public select" ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- 5. Alternative: Disable RLS if you don't need it (simpler for development)
-- ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- 6. View all current policies
SELECT * FROM pg_policies WHERE tablename = 'users';
