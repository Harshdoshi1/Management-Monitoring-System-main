-- ============================================
-- NBA Criteria Tables for Supabase (PostgreSQL)
-- Criteria 1, 2, 3, 8, 9, 10
-- ============================================

-- ============================================
-- CRITERION 1: Vision, Mission and PEOs (30 marks)
-- ============================================

-- Table for Criterion 1.1: Vision & Mission Statements (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_11 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    institute_vision TEXT NOT NULL,
    institute_mission TEXT NOT NULL,
    department_vision TEXT NOT NULL,
    department_mission TEXT NOT NULL,
    dissemination_process TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 1.2: Program Educational Objectives (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_12 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    peo1 TEXT NOT NULL,
    peo2 TEXT NOT NULL,
    peo3 TEXT NOT NULL,
    peo4 TEXT,
    stakeholders_involved TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 1.3: PEO-Mission Mapping (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_13 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    mapping_matrix TEXT NOT NULL,
    justification TEXT NOT NULL,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 1.4: PEO Review & Revision Process (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_14 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    review_frequency VARCHAR(100),
    review_process TEXT NOT NULL,
    stakeholder_feedback TEXT,
    last_revision_date VARCHAR(50),
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 1.5: PEO Consistency with Graduate Attributes (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_15 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    consistency_matrix TEXT NOT NULL,
    evidence_of_consistency TEXT NOT NULL,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- ============================================
-- CRITERION 2: Program Curriculum and Teaching-Learning Processes (100 marks)
-- ============================================

-- Table for Criterion 2.1.1: Process for designing curriculum (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_211 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    curriculum_design_process TEXT NOT NULL,
    po_pso_consideration TEXT NOT NULL,
    industry_involvement TEXT,
    documentary_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.1.2: Structure of Curriculum (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_212 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    curriculum_structure TEXT NOT NULL,
    total_credits INT,
    theory_credits INT,
    practical_credits INT,
    balance_justification TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.1.3: Components of Curriculum (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_213 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    core_courses TEXT,
    elective_courses TEXT,
    lab_courses TEXT,
    project_internship TEXT,
    other_components TEXT,
    documentary_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.1.4: Process to identify compliance with POs/PSOs (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_214 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    compliance_process TEXT NOT NULL,
    mapping_methodology TEXT NOT NULL,
    documentary_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.2.1: Process to improve quality of Teaching-Learning (15 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_221 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    academic_calendar_adherence TEXT,
    pedagogical_initiatives TEXT,
    weak_student_methodology TEXT,
    bright_student_methodology TEXT,
    classroom_quality TEXT,
    lab_conduct_quality TEXT,
    continuous_assessment TEXT,
    student_feedback TEXT,
    actions_taken TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.2.2: Quality of examinations and assignments (15 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_222 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    question_paper_process TEXT NOT NULL,
    outcome_based_questions TEXT,
    co_coverage_evidence TEXT NOT NULL,
    assignment_quality TEXT NOT NULL,
    assignment_co_mapping TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.2.3: Quality of student projects (20 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_223 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    project_identification_process TEXT,
    project_types TEXT,
    project_relevance TEXT,
    industry_projects TEXT,
    monitoring_process TEXT,
    evaluation_process TEXT,
    individual_team_assessment TEXT,
    project_quality TEXT,
    papers_awards TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.2.4: Industry interaction initiatives (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_224 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    industry_labs TEXT,
    industry_curriculum_involvement TEXT,
    industry_course_delivery TEXT,
    impact_analysis TEXT,
    documentary_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 2.2.5: Industry internship/summer training (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_225 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    industrial_training_tours TEXT,
    internship_details TEXT,
    post_training_assessment TEXT,
    impact_analysis TEXT,
    student_feedback TEXT,
    documentary_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- ============================================
-- CRITERION 3: Course Outcomes and Program Outcomes (175 marks)
-- ============================================

-- Table for Criterion 3.1: Correlation between courses and POs/PSOs (25 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_31 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    cos_defined_evidence TEXT,
    cos_in_syllabi TEXT,
    course_articulation_matrix TEXT,
    program_articulation_matrix TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 3.2.1: Assessment tools for CO attainment (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_321 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    assessment_processes TEXT NOT NULL,
    assessment_tools TEXT NOT NULL,
    data_collection_process TEXT,
    verification_process TEXT,
    analysis_methodology TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 3.2.2: CO Attainment Records (65 marks)
-- This stores actual course outcome attainment data
CREATE TABLE IF NOT EXISTS nba_criterion_322 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    year_of_study INT NOT NULL,
    semester INT NOT NULL,
    co1_attainment DECIMAL(5,2),
    co2_attainment DECIMAL(5,2),
    co3_attainment DECIMAL(5,2),
    co4_attainment DECIMAL(5,2),
    co5_attainment DECIMAL(5,2),
    co6_attainment DECIMAL(5,2),
    average_attainment DECIMAL(5,2),
    target_level DECIMAL(5,2),
    attainment_status VARCHAR(20),
    methodology TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 3.3.1: Assessment tools for PO/PSO attainment (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_331 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    direct_assessment_tools TEXT NOT NULL,
    indirect_assessment_tools TEXT NOT NULL,
    assessment_processes TEXT NOT NULL,
    data_collection_process TEXT,
    analysis_methodology TEXT,
    decision_making_process TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 3.3.2: PO/PSO Attainment Results (65 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_332 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    po_pso_code VARCHAR(20) NOT NULL,
    po_pso_description TEXT,
    direct_attainment DECIMAL(5,2),
    indirect_attainment DECIMAL(5,2),
    overall_attainment DECIMAL(5,2),
    target_level DECIMAL(5,2),
    attainment_status VARCHAR(20),
    documentary_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- ============================================
-- CRITERION 8: First Year Academics (50 marks)
-- ============================================

-- Table for Criterion 8.1: First Year Student-Faculty Ratio (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_81 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    total_students INT NOT NULL,
    regular_faculty INT NOT NULL,
    fractional_load DECIMAL(5,2) DEFAULT 0,
    effective_faculty DECIMAL(5,2),
    student_faculty_ratio DECIMAL(5,2),
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 8.2: Qualification of First Year Faculty (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_82 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    faculty_name VARCHAR(200) NOT NULL,
    qualification VARCHAR(100) NOT NULL,
    phd_holders INT DEFAULT 0,
    non_phd_holders INT DEFAULT 0,
    total_faculty INT,
    qualification_score DECIMAL(5,2),
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 8.3: First Year Academic Performance (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_83 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    total_students INT NOT NULL,
    successful_students INT NOT NULL,
    students_appeared INT NOT NULL,
    mean_gpa DECIMAL(5,2),
    mean_percentage DECIMAL(5,2),
    success_rate DECIMAL(5,2),
    academic_performance DECIMAL(5,2),
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 8.4.1: Assessment processes for first year COs (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_841 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    assessment_processes TEXT NOT NULL,
    assessment_tools TEXT NOT NULL,
    direct_assessment TEXT,
    indirect_assessment TEXT,
    methodology TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 8.4.2: CO attainment of first year courses (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_842 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    course_code VARCHAR(50) NOT NULL,
    course_name VARCHAR(200) NOT NULL,
    target_level DECIMAL(5,2),
    attainment_level DECIMAL(5,2),
    attainment_status VARCHAR(20),
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 8.5.1: PO/PSO evaluation for first year (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_851 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    po_pso_code VARCHAR(20) NOT NULL,
    computation_process TEXT NOT NULL,
    attainment_level DECIMAL(5,2),
    documentary_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 8.5.2: Actions based on PO/PSO evaluation (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_852 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    po_pso_code VARCHAR(20) NOT NULL,
    actions_taken TEXT NOT NULL,
    implementation_evidence TEXT,
    impact_observed TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- ============================================
-- CRITERION 9: Student Support Systems (50 marks)
-- ============================================

-- Table for Criterion 9.1: Mentoring System (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_91 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    mentoring_system_details TEXT NOT NULL,
    terms_of_reference TEXT,
    implementation_process TEXT,
    effectiveness_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 9.2: Feedback analysis and corrective measures (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_92 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    feedback_methodology TEXT NOT NULL,
    analysis_process TEXT NOT NULL,
    effectiveness TEXT,
    corrective_measures TEXT NOT NULL,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 9.3: Feedback on facilities (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_93 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    feedback_collection TEXT NOT NULL,
    feedback_analysis TEXT NOT NULL,
    corrective_actions TEXT NOT NULL,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 9.4: Self-Learning (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_94 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    self_learning_scope TEXT NOT NULL,
    facilities_available TEXT NOT NULL,
    beyond_syllabus_materials TEXT,
    webinars_moocs TEXT,
    utilization_evidence TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 9.5: Career Guidance, Training, Placement (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_95 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    career_guidance_facilities TEXT NOT NULL,
    higher_studies_counseling TEXT,
    pre_placement_training TEXT,
    placement_process TEXT NOT NULL,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 9.6: Entrepreneurship Cell (5 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_96 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    entrepreneurship_initiatives TEXT NOT NULL,
    students_benefited INT DEFAULT 0,
    initiatives_details TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- Table for Criterion 9.7: Co-curricular and Extra-curricular Activities (10 marks)
CREATE TABLE IF NOT EXISTS nba_criterion_97 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    sports_cultural_facilities TEXT NOT NULL,
    ncc_nss_clubs TEXT,
    annual_activities TEXT NOT NULL,
    student_participation TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- ============================================
-- CRITERION 10: Governance, Institutional Support and Financial Resources
-- (This is typically handled separately but included for completeness)
-- ============================================

-- Table for Criterion 10.1: Governance
CREATE TABLE IF NOT EXISTS nba_criterion_101 (
    id SERIAL PRIMARY KEY,
    academic_year VARCHAR(20) NOT NULL,
    governance_structure TEXT NOT NULL,
    decision_making_process TEXT,
    quality_assurance TEXT,
    marks DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT REFERENCES users(id)
);

-- ============================================
-- Indexes for better performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_c11_year ON nba_criterion_11(academic_year);
CREATE INDEX IF NOT EXISTS idx_c12_year ON nba_criterion_12(academic_year);
CREATE INDEX IF NOT EXISTS idx_c13_year ON nba_criterion_13(academic_year);
CREATE INDEX IF NOT EXISTS idx_c14_year ON nba_criterion_14(academic_year);
CREATE INDEX IF NOT EXISTS idx_c15_year ON nba_criterion_15(academic_year);

CREATE INDEX IF NOT EXISTS idx_c211_year ON nba_criterion_211(academic_year);
CREATE INDEX IF NOT EXISTS idx_c212_year ON nba_criterion_212(academic_year);
CREATE INDEX IF NOT EXISTS idx_c213_year ON nba_criterion_213(academic_year);
CREATE INDEX IF NOT EXISTS idx_c214_year ON nba_criterion_214(academic_year);
CREATE INDEX IF NOT EXISTS idx_c221_year ON nba_criterion_221(academic_year);
CREATE INDEX IF NOT EXISTS idx_c222_year ON nba_criterion_222(academic_year);
CREATE INDEX IF NOT EXISTS idx_c223_year ON nba_criterion_223(academic_year);
CREATE INDEX IF NOT EXISTS idx_c224_year ON nba_criterion_224(academic_year);
CREATE INDEX IF NOT EXISTS idx_c225_year ON nba_criterion_225(academic_year);

CREATE INDEX IF NOT EXISTS idx_c31_year ON nba_criterion_31(academic_year);
CREATE INDEX IF NOT EXISTS idx_c321_year ON nba_criterion_321(academic_year);
CREATE INDEX IF NOT EXISTS idx_c322_year ON nba_criterion_322(academic_year);
CREATE INDEX IF NOT EXISTS idx_c331_year ON nba_criterion_331(academic_year);
CREATE INDEX IF NOT EXISTS idx_c332_year ON nba_criterion_332(academic_year);

CREATE INDEX IF NOT EXISTS idx_c81_year ON nba_criterion_81(academic_year);
CREATE INDEX IF NOT EXISTS idx_c82_year ON nba_criterion_82(academic_year);
CREATE INDEX IF NOT EXISTS idx_c83_year ON nba_criterion_83(academic_year);
CREATE INDEX IF NOT EXISTS idx_c841_year ON nba_criterion_841(academic_year);
CREATE INDEX IF NOT EXISTS idx_c842_year ON nba_criterion_842(academic_year);
CREATE INDEX IF NOT EXISTS idx_c851_year ON nba_criterion_851(academic_year);
CREATE INDEX IF NOT EXISTS idx_c852_year ON nba_criterion_852(academic_year);

CREATE INDEX IF NOT EXISTS idx_c91_year ON nba_criterion_91(academic_year);
CREATE INDEX IF NOT EXISTS idx_c92_year ON nba_criterion_92(academic_year);
CREATE INDEX IF NOT EXISTS idx_c93_year ON nba_criterion_93(academic_year);
CREATE INDEX IF NOT EXISTS idx_c94_year ON nba_criterion_94(academic_year);
CREATE INDEX IF NOT EXISTS idx_c95_year ON nba_criterion_95(academic_year);
CREATE INDEX IF NOT EXISTS idx_c96_year ON nba_criterion_96(academic_year);
CREATE INDEX IF NOT EXISTS idx_c97_year ON nba_criterion_97(academic_year);

-- ============================================
-- Comments for documentation
-- ============================================

COMMENT ON TABLE nba_criterion_11 IS 'Criterion 1.1: Vision & Mission Statements (5 marks)';
COMMENT ON TABLE nba_criterion_12 IS 'Criterion 1.2: Program Educational Objectives (10 marks)';
COMMENT ON TABLE nba_criterion_31 IS 'Criterion 3.1: Correlation between courses and POs/PSOs (25 marks)';
COMMENT ON TABLE nba_criterion_81 IS 'Criterion 8.1: First Year Student-Faculty Ratio (5 marks - Calculated)';
COMMENT ON TABLE nba_criterion_91 IS 'Criterion 9.1: Mentoring System (5 marks)';
