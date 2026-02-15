-- Supabase PostgreSQL Schema for Department Monitoring System
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- USERS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    roles TEXT[] DEFAULT ARRAY['FACULTY'],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- =====================================================
-- STUDENTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_number VARCHAR(100) NOT NULL UNIQUE,
    student_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    batch VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20) NOT NULL,
    year_of_study INTEGER DEFAULT 1,
    semester INTEGER DEFAULT 1,
    department VARCHAR(100),
    division VARCHAR(50),
    roll_number VARCHAR(50),
    admission_date DATE,
    date_of_birth DATE,
    gender VARCHAR(20),
    category VARCHAR(50),
    admission_type VARCHAR(50) DEFAULT 'Regular',
    status VARCHAR(20) DEFAULT 'active',
    cgpa DECIMAL(4,2),
    sgpa DECIMAL(4,2),
    backlogs INTEGER DEFAULT 0,
    address TEXT,
    parent_name VARCHAR(255),
    parent_phone VARCHAR(20),
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for students
CREATE INDEX IF NOT EXISTS idx_students_batch ON students(batch);
CREATE INDEX IF NOT EXISTS idx_students_academic_year ON students(academic_year);
CREATE INDEX IF NOT EXISTS idx_students_semester ON students(semester);

-- =====================================================
-- FACULTY TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    middle_name VARCHAR(100),
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    qualification VARCHAR(255),
    experience_years INTEGER DEFAULT 0,
    specialization TEXT,
    academic_year VARCHAR(20) NOT NULL DEFAULT '2025',
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- NBA DATA TABLE (Generic storage for all criteria)
-- =====================================================
CREATE TABLE IF NOT EXISTS nba_data (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    criteria VARCHAR(50) NOT NULL,
    academic_year VARCHAR(20),
    data JSONB NOT NULL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for criteria lookups
CREATE INDEX IF NOT EXISTS idx_nba_data_criteria ON nba_data(criteria);
CREATE INDEX IF NOT EXISTS idx_nba_data_academic_year ON nba_data(academic_year);

-- =====================================================
-- NBA CRITERIA SPECIFIC TABLES (Optional - for structured data)
-- =====================================================

-- Criterion 1: Vision, Mission, PEOs
CREATE TABLE IF NOT EXISTS nba_criterion_1 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year VARCHAR(20) NOT NULL,
    criterion_code VARCHAR(10) NOT NULL,
    institute_vision TEXT,
    institute_mission TEXT,
    department_vision TEXT,
    department_mission TEXT,
    peos JSONB,
    peo_mission_mapping JSONB,
    stakeholder_involvement TEXT,
    review_process TEXT,
    dissemination_process TEXT,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criterion 2: Program Curriculum and Teaching-Learning Processes
CREATE TABLE IF NOT EXISTS nba_criterion_2 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year VARCHAR(20) NOT NULL,
    criterion_code VARCHAR(10) NOT NULL,
    program_outcomes JSONB,
    co_po_mapping JSONB,
    curriculum_details JSONB,
    teaching_methods JSONB,
    assessment_methods JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criterion 3: Course Outcomes and Program Outcomes
CREATE TABLE IF NOT EXISTS nba_criterion_3 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year VARCHAR(20) NOT NULL,
    criterion_code VARCHAR(10) NOT NULL,
    course_code VARCHAR(50),
    course_name VARCHAR(255),
    course_outcomes JSONB,
    po_attainment JSONB,
    pso_attainment JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criterion 4: Students' Performance
CREATE TABLE IF NOT EXISTS nba_criterion_4 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year VARCHAR(20) NOT NULL,
    criterion_code VARCHAR(10) NOT NULL,
    enrollment_data JSONB,
    success_rate DECIMAL(5,2),
    placement_data JSONB,
    higher_studies_data JSONB,
    professional_activities JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criterion 5: Faculty Information
CREATE TABLE IF NOT EXISTS nba_criterion_5 (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    academic_year VARCHAR(20) NOT NULL,
    criterion_code VARCHAR(10) NOT NULL,
    faculty_details JSONB,
    student_faculty_ratio DECIMAL(5,2),
    faculty_qualifications JSONB,
    faculty_publications JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================

-- Enable RLS on tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE nba_data ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all operations for authenticated users (via anon key for now)
-- Note: In production, use proper JWT authentication

CREATE POLICY "Allow all for anon" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON faculty FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all for anon" ON nba_data FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- INSERT DEMO USER
-- =====================================================
INSERT INTO users (name, email, password_hash, roles)
VALUES (
    'Demo User',
    'demo@example.com',
    '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- password: demo123
    ARRAY['FACULTY']
) ON CONFLICT (email) DO NOTHING;

-- Grant necessary permissions
GRANT ALL ON users TO anon;
GRANT ALL ON students TO anon;
GRANT ALL ON faculty TO anon;
GRANT ALL ON nba_data TO anon;
GRANT ALL ON nba_criterion_1 TO anon;
GRANT ALL ON nba_criterion_2 TO anon;
GRANT ALL ON nba_criterion_3 TO anon;
GRANT ALL ON nba_criterion_4 TO anon;
GRANT ALL ON nba_criterion_5 TO anon;
