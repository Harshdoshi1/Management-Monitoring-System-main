-- ============================================
-- Student Management Table for Supabase (PostgreSQL)
-- This table stores student information with batch tracking
-- ============================================

-- Drop existing table if you need to recreate (use with caution)
-- DROP TABLE IF EXISTS students CASCADE;

-- Main students table
CREATE TABLE IF NOT EXISTS students (
    id SERIAL PRIMARY KEY,
    enrollment_number VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(200) NOT NULL,
    email VARCHAR(150) UNIQUE,
    phone VARCHAR(20),
    batch VARCHAR(20) NOT NULL,  -- Example: "2020-2024", "2021-2025"
    academic_year VARCHAR(20) NOT NULL,  -- Current academic year: "2023-24"
    year_of_study INT NOT NULL CHECK (year_of_study BETWEEN 1 AND 4),  -- 1, 2, 3, or 4
    semester INT NOT NULL CHECK (semester BETWEEN 1 AND 8),  -- 1 to 8
    department VARCHAR(100),
    division VARCHAR(10),  -- Division/Section: A, B, C, etc.
    roll_number VARCHAR(20),
    admission_date DATE,
    date_of_birth DATE,
    gender VARCHAR(20),
    category VARCHAR(50),  -- General, OBC, SC, ST, etc.
    admission_type VARCHAR(50),  -- Regular, Lateral Entry, etc.
    status VARCHAR(20) DEFAULT 'active',  -- active, graduated, discontinued, etc.
    cgpa DECIMAL(4,2),
    sgpa DECIMAL(4,2),
    backlogs INT DEFAULT 0,
    address TEXT,
    parent_name VARCHAR(200),
    parent_phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id),
    CONSTRAINT valid_cgpa CHECK (cgpa >= 0 AND cgpa <= 10),
    CONSTRAINT valid_sgpa CHECK (sgpa >= 0 AND sgpa <= 10)
);

-- Index for faster queries by batch
CREATE INDEX IF NOT EXISTS idx_students_batch ON students(batch);
CREATE INDEX IF NOT EXISTS idx_students_year ON students(year_of_study);
CREATE INDEX IF NOT EXISTS idx_students_academic_year ON students(academic_year);
CREATE INDEX IF NOT EXISTS idx_students_enrollment ON students(enrollment_number);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_department ON students(department);

-- Comments for documentation
COMMENT ON TABLE students IS 'Student information with batch tracking and academic details';
COMMENT ON COLUMN students.enrollment_number IS 'Unique enrollment/registration number';
COMMENT ON COLUMN students.batch IS 'Student batch year range (e.g., 2020-2024)';
COMMENT ON COLUMN students.year_of_study IS 'Current year: 1=First Year, 2=Second Year, 3=Third Year, 4=Fourth Year';
COMMENT ON COLUMN students.semester IS 'Current semester: 1-8';
COMMENT ON COLUMN students.status IS 'Student status: active, graduated, discontinued, on_leave, etc.';

-- ============================================
-- Sample data insertion (optional - for testing)
-- ============================================
/*
INSERT INTO students (
    enrollment_number, student_name, email, phone, batch, academic_year, 
    year_of_study, semester, department, division, roll_number, 
    admission_date, status, cgpa, sgpa
) VALUES 
(
    'ENR2021001', 'John Doe', 'john.doe@example.com', '9876543210', 
    '2021-2025', '2023-24', 3, 5, 'Computer Engineering', 'A', '101', 
    '2021-08-15', 'active', 8.5, 8.7
),
(
    'ENR2021002', 'Jane Smith', 'jane.smith@example.com', '9876543211', 
    '2021-2025', '2023-24', 3, 5, 'Computer Engineering', 'A', '102', 
    '2021-08-15', 'active', 9.1, 9.3
);
*/

-- ============================================
-- Trigger to auto-update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION update_students_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_students_updated_at
    BEFORE UPDATE ON students
    FOR EACH ROW
    EXECUTE FUNCTION update_students_updated_at();
