/**
 * NBA Criteria JavaScript - Handles all NBA criteria forms and calculations
 * Redesigned per NBA SAR Format for Tier-II Engineering Programs
 */

// Criteria definitions
const CRITERIA_CONFIG = {
  // ============================================
  // CRITERION 1: Vision, Mission and Program Educational Objectives (PEOs)
  // Max Marks: 30 (all INFO fields)
  // ============================================
  1.1: {
    title: "Vision & Mission Statement (Criterion 1.1)",
    maxMarks: 5,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "instituteVision",
        label: "Institute Vision Statement",
        type: "textarea",
        placeholder: "Describe the institute's vision...",
        required: true,
      },
      {
        name: "instituteMission",
        label: "Institute Mission Statement",
        type: "textarea",
        placeholder: "Describe the institute's mission...",
        required: true,
      },
      {
        name: "departmentVision",
        label: "Department Vision Statement",
        type: "textarea",
        placeholder: "Describe the department's vision...",
        required: true,
      },
      {
        name: "departmentMission",
        label: "Department Mission Statement",
        type: "textarea",
        placeholder: "Describe the department's mission...",
        required: true,
      },
      {
        name: "disseminationProcess",
        label: "Dissemination Process",
        type: "textarea",
        placeholder: "How are vision and mission communicated to stakeholders?",
        required: true,
      },
    ],
  },
  1.2: {
    title: "Program Educational Objectives (PEOs) (Criterion 1.2)",
    maxMarks: 10,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "peo1",
        label: "PEO 1",
        type: "textarea",
        placeholder: "Program Educational Objective 1...",
        required: true,
      },
      {
        name: "peo2",
        label: "PEO 2",
        type: "textarea",
        placeholder: "Program Educational Objective 2...",
        required: true,
      },
      {
        name: "peo3",
        label: "PEO 3",
        type: "textarea",
        placeholder: "Program Educational Objective 3...",
        required: true,
      },
      {
        name: "peo4",
        label: "PEO 4 (Optional)",
        type: "textarea",
        placeholder: "Program Educational Objective 4...",
        required: false,
      },
      {
        name: "stakeholdersInvolved",
        label: "Stakeholders Involved in PEO Definition",
        type: "textarea",
        placeholder: "Faculty, Industry, Alumni, Parents, Students...",
        required: true,
      },
    ],
  },
  1.3: {
    title: "PEO-Mission Mapping (Criterion 1.3)",
    maxMarks: 5,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "mappingMatrix",
        label: "PEO-Mission Mapping Matrix",
        type: "textarea",
        placeholder:
          "Describe how each PEO maps to mission statements (use H/M/L or 3/2/1)...",
        required: true,
      },
      {
        name: "justification",
        label: "Justification for Mapping",
        type: "textarea",
        placeholder: "Explain the rationale behind each mapping...",
        required: true,
      },
    ],
  },
  1.4: {
    title: "PEO Review & Revision Process (Criterion 1.4)",
    maxMarks: 5,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "reviewFrequency",
        label: "Review Frequency",
        type: "text",
        placeholder: "e.g., Every 3 years",
        required: true,
      },
      {
        name: "reviewProcess",
        label: "Review Process Description",
        type: "textarea",
        placeholder: "Describe the process for reviewing and revising PEOs...",
        required: true,
      },
      {
        name: "stakeholderFeedback",
        label: "Stakeholder Feedback Mechanism",
        type: "textarea",
        placeholder:
          "How is feedback collected from stakeholders for PEO revision?",
        required: true,
      },
      {
        name: "lastRevisionDate",
        label: "Last Revision Date",
        type: "text",
        placeholder: "e.g., June 2023",
        required: true,
      },
    ],
  },
  1.5: {
    title: "PEO Consistency with Graduate Attributes (Criterion 1.5)",
    maxMarks: 5,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "consistencyMatrix",
        label: "PEO-Graduate Attributes Consistency Matrix",
        type: "textarea",
        placeholder: "Show how PEOs align with NBA Graduate Attributes...",
        required: true,
      },
      {
        name: "evidenceOfConsistency",
        label: "Evidence of Consistency",
        type: "textarea",
        placeholder: "Provide evidence demonstrating consistency...",
        required: true,
      },
    ],
  },

  // ============================================
  // CRITERION 2: Program Curriculum and Teaching-Learning Processes
  // Max Marks: 120 (all INFO fields)
  // ============================================
  "2.1.1": {
    title: "Curriculum Design (Criterion 2.1.1)",
    maxMarks: 20,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "curriculumStructure",
        label: "Curriculum Structure Description",
        type: "textarea",
        placeholder: "Describe overall curriculum structure...",
        required: true,
      },
      {
        name: "totalCredits",
        label: "Total Credits",
        type: "number",
        required: true,
      },
      {
        name: "mathCredits",
        label: "Mathematics Credits",
        type: "number",
        required: true,
      },
      {
        name: "basicScienceCredits",
        label: "Basic Science Credits",
        type: "number",
        required: true,
      },
      {
        name: "engineeringCredits",
        label: "Engineering Science Credits",
        type: "number",
        required: true,
      },
      {
        name: "professionalCoreCredits",
        label: "Professional Core Credits",
        type: "number",
        required: true,
      },
      {
        name: "electiveCredits",
        label: "Elective Credits",
        type: "number",
        required: true,
      },
      {
        name: "projectCredits",
        label: "Project/Internship Credits",
        type: "number",
        required: true,
      },
    ],
    calculations: ["creditDistribution"],
  },
  "2.1.2": {
    title: "Syllabus Content (Criterion 2.1.2)",
    maxMarks: 15,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "syllabusRelevance",
        label: "Syllabus Relevance to Industry",
        type: "textarea",
        placeholder: "How does syllabus align with industry requirements?",
        required: true,
      },
      {
        name: "latestTechnologies",
        label: "Latest Technologies Covered",
        type: "textarea",
        placeholder: "List emerging technologies included in curriculum...",
        required: true,
      },
      {
        name: "revisionFrequency",
        label: "Syllabus Revision Frequency",
        type: "text",
        placeholder: "e.g., Every 2 years",
        required: true,
      },
    ],
  },
  "2.1.3": {
    title: "Laboratory Courses (Criterion 2.1.3)",
    maxMarks: 15,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "labCoursesList",
        label: "List of Laboratory Courses",
        type: "textarea",
        placeholder: "List all lab courses with credits...",
        required: true,
      },
      {
        name: "totalLabCredits",
        label: "Total Laboratory Credits",
        type: "number",
        required: true,
      },
      {
        name: "labEquipmentAdequacy",
        label: "Lab Equipment Adequacy",
        type: "textarea",
        placeholder: "Describe availability and quality of lab equipment...",
        required: true,
      },
    ],
  },
  "2.1.4": {
    title: "Industry Interaction in Curriculum (Criterion 2.1.4)",
    maxMarks: 10,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "industryInvolvement",
        label: "Industry Involvement in Curriculum Design",
        type: "textarea",
        placeholder:
          "Describe how industry experts contribute to curriculum...",
        required: true,
      },
      {
        name: "industrialVisits",
        label: "Industrial Visits/Tours",
        type: "textarea",
        placeholder: "Number and details of industrial visits...",
        required: true,
      },
      {
        name: "guestLectures",
        label: "Guest Lectures from Industry",
        type: "number",
        placeholder: "Number of guest lectures per year",
        required: true,
      },
    ],
  },
  "2.2.1": {
    title: "Teaching Methods (Criterion 2.2.1)",
    maxMarks: 15,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "teachingMethodologies",
        label: "Teaching Methodologies Used",
        type: "textarea",
        placeholder:
          "Chalk-board, PPT, Active Learning, Flipped Classroom, etc.",
        required: true,
      },
      {
        name: "ictUsage",
        label: "ICT Tools Used in Teaching",
        type: "textarea",
        placeholder: "LMS, Online resources, Simulation tools, etc.",
        required: true,
      },
      {
        name: "studentCentricMethods",
        label: "Student-Centric Learning Methods",
        type: "textarea",
        placeholder: "Problem-based learning, Case studies, Mini-projects...",
        required: true,
      },
    ],
  },
  "2.2.2": {
    title: "Continuous Assessment (Criterion 2.2.2)",
    maxMarks: 15,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "assessmentMethods",
        label: "Assessment Methods",
        type: "textarea",
        placeholder: "Tests, Assignments, Quizzes, Presentations, etc.",
        required: true,
      },
      {
        name: "frequencyOfAssessment",
        label: "Frequency of Assessment",
        type: "text",
        placeholder: "e.g., 2 CIEs per semester",
        required: true,
      },
      {
        name: "feedbackMechanism",
        label: "Feedback Mechanism to Students",
        type: "textarea",
        placeholder: "How are assessment results communicated?",
        required: true,
      },
    ],
  },
  "2.2.3": {
    title: "Remedial Measures (Criterion 2.2.3)",
    maxMarks: 10,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "identificationProcess",
        label: "Slow Learner Identification Process",
        type: "textarea",
        placeholder: "How are slow learners identified?",
        required: true,
      },
      {
        name: "remedialClasses",
        label: "Remedial Classes Conducted",
        type: "textarea",
        placeholder: "Details of remedial teaching provided...",
        required: true,
      },
      {
        name: "advancedLearners",
        label: "Support for Advanced Learners",
        type: "textarea",
        placeholder: "Additional challenges for advanced students...",
        required: true,
      },
    ],
  },
  "2.2.4": {
    title: "Project/Internship (Criterion 2.2.4)",
    maxMarks: 10,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "projectTypes",
        label: "Types of Projects",
        type: "textarea",
        placeholder: "Mini-projects, Major projects, Industry projects...",
        required: true,
      },
      {
        name: "internshipDetails",
        label: "Internship Program Details",
        type: "textarea",
        placeholder: "Duration, partner companies, student participation...",
        required: true,
      },
      {
        name: "studentsWithInternship",
        label: "Students Completing Internship",
        type: "number",
        required: true,
      },
    ],
  },
  "2.2.5": {
    title: "Self-Learning (Criterion 2.2.5)",
    maxMarks: 10,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "moocCourses",
        label: "MOOC/Online Courses",
        type: "textarea",
        placeholder: "NPTEL, Coursera, edX courses offered...",
        required: true,
      },
      {
        name: "selfLearningCredits",
        label: "Self-Learning Credits",
        type: "number",
        placeholder: "Credits allocated for self-learning",
        required: true,
      },
      {
        name: "certifications",
        label: "Certifications Encouraged",
        type: "textarea",
        placeholder: "Industry certifications students can pursue...",
        required: true,
      },
    ],
  },

  // ============================================
  // CRITERION 3: Course Outcomes and Program Outcomes
  // Max Marks: 175 (all INFO fields)
  // ============================================
  "3.1.1": {
    title: "Course Outcomes Definition (Criterion 3.1.1)",
    maxMarks: 30,
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "semester",
        label: "Semester",
        type: "number",
        min: 1,
        max: 8,
        required: true,
      },
      {
        name: "courseCode",
        label: "Course Code",
        type: "text",
        required: true,
      },
      {
        name: "courseName",
        label: "Course Name",
        type: "text",
        required: true,
      },
      {
        name: "cosDefined",
        label: "Number of COs Defined",
        type: "number",
        required: true,
      },
      {
        name: "cosEmbedded",
        label: "COs Embedded in Syllabus",
        type: "text",
        required: true,
      },
    ],
  },
  3.2: {
    title: "CO-PO Attainment (Criterion 3.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "semester",
        label: "Semester",
        type: "number",
        min: 1,
        max: 8,
        required: true,
      },
      {
        name: "assessmentTools",
        label: "Assessment Tools Used",
        type: "textarea",
        required: true,
      },
      {
        name: "qualityRelevance",
        label: "Quality & Relevance",
        type: "textarea",
        required: true,
      },
    ],
  },
  3.3: {
    title: "PO/PSO Attainment (Criterion 3.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      { name: "poName", label: "PO/PSO Name", type: "text", required: true },
      {
        name: "targetLevel",
        label: "Target Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "attainmentLevel",
        label: "Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "observations",
        label: "Observations",
        type: "textarea",
        required: true,
      },
    ],
    calculations: ["attainmentGap"],
  },
  4.1: {
    title: "Enrollment Ratio (Criterion 4.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "intake",
        label: "Sanctioned Intake",
        type: "number",
        required: true,
      },
      {
        name: "admitted",
        label: "Students Admitted",
        type: "number",
        required: true,
      },
    ],
    calculations: ["enrollmentRatio"],
  },
  4.2: {
    title: "Success Rate (Criterion 4.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "admittedDegree",
        label: "Admitted (Regular)",
        type: "number",
        required: true,
      },
      {
        name: "admittedD2d",
        label: "Admitted (D2D/Lateral)",
        type: "number",
        required: true,
      },
      {
        name: "graduatedWoBack",
        label: "Graduated Without Backlog",
        type: "number",
        required: true,
      },
      {
        name: "graduatedWBack",
        label: "Graduated With Backlog",
        type: "number",
        required: true,
      },
    ],
    calculations: ["successRate", "totalAdmitted", "totalGraduated"],
  },
  4.3: {
    title: "Academic Performance (Criterion 4.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "admittedDegree",
        label: "Admitted (Regular)",
        type: "number",
        required: true,
      },
      {
        name: "admittedD2d",
        label: "Admitted (Lateral)",
        type: "number",
        required: true,
      },
      {
        name: "sem3AvgSgpa",
        label: "Sem 3 Average SGPA",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "sem4AvgSgpa",
        label: "Sem 4 Average SGPA",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "sem3Credit",
        label: "Sem 3 Credits",
        type: "number",
        required: true,
      },
      {
        name: "sem4Credit",
        label: "Sem 4 Credits",
        type: "number",
        required: true,
      },
      {
        name: "success2ndYear",
        label: "2nd Year Success Rate (%)",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "studentsAppeared",
        label: "Students Appeared in Exam",
        type: "number",
        required: true,
      },
    ],
    calculations: ["meanCGPA", "totalAdmitted43"],
  },
  4.4: {
    title: "Placement & Higher Studies (Criterion 4.4)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "finalYearTotal",
        label: "Total Final Year Students",
        type: "number",
        required: true,
      },
      {
        name: "placed",
        label: "Students Placed",
        type: "number",
        required: true,
      },
      {
        name: "higherStudies",
        label: "Students in Higher Studies",
        type: "number",
        required: true,
      },
      {
        name: "entrepreneur",
        label: "Students as Entrepreneurs",
        type: "number",
        required: true,
      },
    ],
    calculations: ["placementRate", "higherStudiesRate", "totalPlacementRate"],
  },
  4.5: {
    title: "Professional Activities (Criterion 4.5)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "chapters",
        label: "Number of Professional Chapters",
        type: "number",
        required: true,
      },
      {
        name: "internationalEvents",
        label: "International Events",
        type: "number",
        required: true,
      },
      {
        name: "nationalEvents",
        label: "National Events",
        type: "number",
        required: true,
      },
      {
        name: "stateEvents",
        label: "State Level Events",
        type: "number",
        required: true,
      },
      {
        name: "deptEvents",
        label: "Department Events",
        type: "number",
        required: true,
      },
    ],
    calculations: ["totalEvents"],
  },
  5.1: {
    title: "Student-Faculty Ratio (Criterion 5.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "numStudents",
        label: "Number of Students",
        type: "number",
        required: true,
      },
      {
        name: "numFaculty",
        label: "Number of Faculty",
        type: "number",
        required: true,
      },
    ],
    calculations: ["studentFacultyRatio"],
  },
  5.2: {
    title: "Faculty Cadre Ratio (Criterion 5.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "reqProf",
        label: "Required Professors",
        type: "number",
        required: true,
      },
      {
        name: "availProf",
        label: "Available Professors",
        type: "number",
        required: true,
      },
      {
        name: "reqAssoc",
        label: "Required Associate Professors",
        type: "number",
        required: true,
      },
      {
        name: "availAssoc",
        label: "Available Associate Professors",
        type: "number",
        required: true,
      },
      {
        name: "reqAsst",
        label: "Required Assistant Professors",
        type: "number",
        required: true,
      },
      {
        name: "availAsst",
        label: "Available Assistant Professors",
        type: "number",
        required: true,
      },
    ],
    calculations: ["cadreRatio"],
  },
  5.3: {
    title: "Faculty Qualifications (Criterion 5.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "xPhd",
        label: "Faculty with Ph.D (X)",
        type: "number",
        required: true,
      },
      {
        name: "yMtech",
        label: "Faculty with M.Tech/ME (Y)",
        type: "number",
        required: true,
      },
      {
        name: "fRequired",
        label: "Required Faculty (F)",
        type: "number",
        required: true,
      },
    ],
    calculations: ["qualificationIndex"],
  },
  6.1: {
    title: "Adequate Classrooms (Criterion 6.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Classroom Facilities Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  6.2: {
    title: "Laboratory Facilities (Criterion 6.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Laboratory Facilities Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  6.3: {
    title: "Computing Facilities (Criterion 6.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Computing Facilities Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  6.4: {
    title: "Library Resources (Criterion 6.4)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Library Resources Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  7.1: {
    title: "Quality Improvement (Criterion 7.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Quality Improvement Initiatives",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  7.2: {
    title: "Actions on Assessment (Criterion 7.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Actions Taken Based on Assessment",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  7.3: {
    title: "Stakeholder Feedback (Criterion 7.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Stakeholder Feedback Mechanism",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  7.4: {
    title: "Academic Audit (Criterion 7.4)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Academic Audit Process",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  8.1: {
    title: "First Year Curriculum (Criterion 8.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Curriculum Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  8.2: {
    title: "First Year Student Performance (Criterion 8.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Performance Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  8.3: {
    title: "Academic Support (Criterion 8.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Academic Support Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  8.4: {
    title: "First Year Faculty (Criterion 8.4)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Faculty Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  8.5: {
    title: "First Year Facilities (Criterion 8.5)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Facilities Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  9.1: {
    title: "Mentoring (Criterion 9.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Mentoring System Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  9.2: {
    title: "Career Counseling (Criterion 9.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Career Counseling Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  9.3: {
    title: "Co-curricular Activities (Criterion 9.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Co-curricular Activities Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  9.4: {
    title: "Grievance Redressal (Criterion 9.4)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Grievance Redressal Mechanism",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  10.1: {
    title: "Institutional Governance (Criterion 10.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Governance Structure Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  10.2: {
    title: "Administrative Support (Criterion 10.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Administrative Support Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  10.3: {
    title: "Financial Resources (Criterion 10.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Financial Resources Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
  10.4: {
    title: "Budget Utilization (Criterion 10.4)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "details",
        label: "Budget Utilization Details",
        type: "textarea",
        required: true,
      },
      {
        name: "marks",
        label: "Self-Assessment Marks (0-10)",
        type: "number",
        min: 0,
        max: 10,
        required: true,
      },
    ],
  },
};

/**
 * Load criteria content
 */
function loadCriteria(criteria) {
  const config = CRITERIA_CONFIG[criteria];

  if (!config) {
    document.getElementById("criteriaContent").innerHTML = `
            <div class="bg-red-100 text-red-700 p-4 rounded">
                Invalid criteria: ${escapeHtml(criteria)}. <a href="dashboard.html?tab=nba" class="underline">Return to NBA page</a>
            </div>`;
    return;
  }

  document.getElementById("criteriaTitle").textContent = config.title;
  document.title = config.title + " - DMS";

  const content = `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Form Section -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Enter Data</h2>
                <form id="criteriaForm" class="space-y-4">
                    <input type="hidden" name="id" id="editId" value="">
                    ${generateFormFields(config.fields)}
                    <div class="flex gap-2">
                        <button type="submit" class="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold">
                            Save Data
                        </button>
                        <button type="button" onclick="clearForm()" class="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
                            Clear
                        </button>
                    </div>
                </form>
            </div>

            <!-- Calculations Section -->
            <div class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-xl font-semibold mb-4 text-gray-800">Calculations & Results</h2>
                <div id="calculationResults" class="space-y-4">
                    <p class="text-gray-500">Enter data and calculations will appear here automatically.</p>
                </div>
            </div>
        </div>

        <!-- Data Table -->
        <div class="bg-white rounded-lg shadow-md mt-6 overflow-hidden">
            <div class="p-4 border-b bg-gray-50">
                <h2 class="text-xl font-semibold text-gray-800">Saved Records</h2>
            </div>
            <div class="overflow-x-auto">
                <table class="nba-table" id="dataTable">
                    <thead>
                        <tr>
                            ${generateTableHeaders(config.fields)}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="dataTableBody">
                    </tbody>
                </table>
            </div>
            <div id="noData" class="hidden p-8 text-center text-gray-500">
                No data saved yet. Add your first entry above.
            </div>
        </div>
    `;

  document.getElementById("criteriaContent").innerHTML = content;

  // Setup form handler
  setupCriteriaForm(criteria, config);

  // Load existing data
  loadCriteriaData(criteria, config);

  // Setup live calculations
  if (config.calculations) {
    setupLiveCalculations(config);
  }
}

/**
 * Generate form fields HTML
 */
function generateFormFields(fields) {
  return fields
    .map((field) => {
      let input = "";

      if (field.type === "textarea") {
        input = `<textarea name="${field.name}" id="${field.name}" 
                        ${field.required ? "required" : ""} 
                        class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300" 
                        rows="3" placeholder="${field.placeholder || ""}">${field.default || ""}</textarea>`;
      } else if (field.type === "select") {
        input = `<select name="${field.name}" id="${field.name}" 
                        ${field.required ? "required" : ""} 
                        class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300">
                        ${field.options.map((opt) => `<option value="${opt}">${opt}</option>`).join("")}
                    </select>`;
      } else {
        input = `<input type="${field.type}" name="${field.name}" id="${field.name}" 
                        ${field.required ? "required" : ""} 
                        ${field.min !== undefined ? `min="${field.min}"` : ""} 
                        ${field.max !== undefined ? `max="${field.max}"` : ""} 
                        ${field.step ? `step="${field.step}"` : ""} 
                        class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-300" 
                        placeholder="${field.placeholder || ""}">`;
      }

      return `
            <div>
                <label class="block text-gray-700 text-sm font-bold mb-1">${field.label}</label>
                ${input}
            </div>`;
    })
    .join("");
}

/**
 * Generate table headers
 */
function generateTableHeaders(fields) {
  return fields.map((f) => `<th>${f.label}</th>`).join("");
}

/**
 * Setup criteria form handler
 */
function setupCriteriaForm(criteria, config) {
  const form = document.getElementById("criteriaForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const data = {};

      // Collect form data
      config.fields.forEach((field) => {
        let value = formData.get(field.name);
        if (field.type === "number") {
          value = parseFloat(value) || 0;
        }
        data[field.name] = value;
      });

      // Check for edit mode
      const editId = document.getElementById("editId").value;
      if (editId) {
        data.id = parseInt(editId);
      }

      try {
        // Show loading
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Saving...";
        submitBtn.disabled = true;

        // Save data to Supabase
        const result = await saveNBADataToSupabase(criteria, data);
        showMessage(result.message, result.success ? "success" : "error");

        if (result.success) {
          clearForm();
          await loadCriteriaData(criteria, config);

          // Trigger calculations if needed
          if (config.calculations) {
            performCalculations(config);
          }
        }

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      } catch (error) {
        showMessage("Error saving data: " + error.message, "error");
        console.error("Save error:", error);

        // Reset button
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = "Save Data";
        submitBtn.disabled = false;
      }
    });

    // Setup live calculations on input
    if (config.calculations) {
      config.fields.forEach((field) => {
        const input = document.getElementById(field.name);
        if (input && field.type === "number") {
          input.addEventListener("input", () => performCalculations(config));
        }
      });
    }
  }
}

/**
 * Load criteria data from Supabase into table
 */
async function loadCriteriaData(criteria, config) {
  try {
    const response = await fetch(
      `backend/NBA/get_criteria_data.php?criteria=${encodeURIComponent(criteria)}`,
    );
    const result = await response.json();

    const tbody = document.getElementById("dataTableBody");
    const noData = document.getElementById("noData");

    if (!result.success || result.data.length === 0) {
      if (tbody) tbody.innerHTML = "";
      if (noData) noData.classList.remove("hidden");
      return;
    }

    if (noData) noData.classList.add("hidden");

    if (tbody) {
      tbody.innerHTML = result.data
        .map(
          (item) => `
              <tr>
                  ${config.fields.map((f) => `<td>${escapeHtml(String(item[f.name] || ""))}</td>`).join("")}
                  <td>
                      <button onclick="editRecord('${criteria}', ${item.id})" class="text-blue-600 hover:underline text-sm mr-2">Edit</button>
                      <button onclick="deleteRecord('${criteria}', ${item.id})" class="text-red-600 hover:underline text-sm">Delete</button>
                  </td>
              </tr>
          `,
        )
        .join("");
    }

    // Store data for editing
    window.currentCriteriaData = result.data;
  } catch (error) {
    console.error("Error loading criteria data:", error);
    showMessage("Error loading data: " + error.message, "error");
  }
}

/**
 * Edit record
 */
function editRecord(criteria, id) {
  const data = Storage.getNBAData(criteria);
  const record = data.find((item) => item.id === id);
  const config = CRITERIA_CONFIG[criteria];

  if (record && config) {
    document.getElementById("editId").value = id;
    config.fields.forEach((field) => {
      const input = document.getElementById(field.name);
      if (input) {
        input.value = record[field.name] || "";
      }
    });

    // Trigger calculations
    if (config.calculations) {
      performCalculations(config);
    }

    // Scroll to form
    document
      .getElementById("criteriaForm")
      .scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Delete record
 */
function deleteRecord(criteria, id) {
  if (confirm("Are you sure you want to delete this record?")) {
    const result = Storage.deleteNBAData(criteria, id);
    showMessage(result.message, result.success ? "success" : "error");
    loadCriteriaData(criteria, CRITERIA_CONFIG[criteria]);
  }
}

/**
 * Clear form
 */
function clearForm() {
  const form = document.getElementById("criteriaForm");
  if (form) {
    form.reset();
    document.getElementById("editId").value = "";
  }
  document.getElementById("calculationResults").innerHTML =
    '<p class="text-gray-500">Enter data and calculations will appear here automatically.</p>';
}

/**
 * Setup live calculations
 */
function setupLiveCalculations(config) {
  config.fields.forEach((field) => {
    const input = document.getElementById(field.name);
    if (input) {
      input.addEventListener("input", () => performCalculations(config));
      input.addEventListener("change", () => performCalculations(config));
    }
  });
}

/**
 * Perform calculations based on config
 */
function performCalculations(config) {
  if (!config.calculations) return;

  const results = [];
  const getValue = (name) =>
    parseFloat(document.getElementById(name)?.value) || 0;

  config.calculations.forEach((calc) => {
    switch (calc) {
      case "enrollmentRatio": {
        const intake = getValue("intake");
        const admitted = getValue("admitted");
        if (intake > 0) {
          const ratio = ((admitted / intake) * 100).toFixed(2);
          results.push({
            label: "Enrollment Ratio",
            value: `${ratio}%`,
            formula: `(Admitted / Intake) × 100 = (${admitted} / ${intake}) × 100`,
            status: ratio >= 80 ? "good" : ratio >= 50 ? "warning" : "bad",
          });
        }
        break;
      }
      case "successRate": {
        const admDeg = getValue("admittedDegree");
        const admD2d = getValue("admittedD2d");
        const gradWo = getValue("graduatedWoBack");
        const gradW = getValue("graduatedWBack");
        const total = admDeg + admD2d;
        const totalGrad = gradWo + gradW;
        if (total > 0) {
          const rate = ((totalGrad / total) * 100).toFixed(2);
          const woBackRate = ((gradWo / total) * 100).toFixed(2);
          results.push({
            label: "Total Admitted",
            value: total,
            formula: `Regular + Lateral = ${admDeg} + ${admD2d}`,
          });
          results.push({
            label: "Total Graduated",
            value: totalGrad,
            formula: `Without Backlog + With Backlog = ${gradWo} + ${gradW}`,
          });
          results.push({
            label: "Success Rate (Without Backlog)",
            value: `${woBackRate}%`,
            formula: `(${gradWo} / ${total}) × 100`,
            status:
              woBackRate >= 70 ? "good" : woBackRate >= 50 ? "warning" : "bad",
          });
          results.push({
            label: "Overall Success Rate",
            value: `${rate}%`,
            formula: `(${totalGrad} / ${total}) × 100`,
            status: rate >= 80 ? "good" : rate >= 60 ? "warning" : "bad",
          });
        }
        break;
      }
      case "meanCGPA": {
        const sem3 = getValue("sem3AvgSgpa");
        const sem4 = getValue("sem4AvgSgpa");
        const sem3Cr = getValue("sem3Credit");
        const sem4Cr = getValue("sem4Credit");
        const totalCr = sem3Cr + sem4Cr;
        if (totalCr > 0) {
          const meanCGPA = ((sem3 * sem3Cr + sem4 * sem4Cr) / totalCr).toFixed(
            2,
          );
          results.push({
            label: "Mean CGPA (2nd Year)",
            value: meanCGPA,
            formula: `(${sem3} × ${sem3Cr} + ${sem4} × ${sem4Cr}) / ${totalCr}`,
            status:
              meanCGPA >= 7 ? "good" : meanCGPA >= 5.5 ? "warning" : "bad",
          });
        }
        break;
      }
      case "totalAdmitted43": {
        const admDeg = getValue("admittedDegree");
        const admD2d = getValue("admittedD2d");
        results.push({
          label: "Total Admitted",
          value: admDeg + admD2d,
          formula: `Regular + Lateral = ${admDeg} + ${admD2d}`,
        });
        break;
      }
      case "placementRate": {
        const total = getValue("finalYearTotal");
        const placed = getValue("placed");
        const higher = getValue("higherStudies");
        const entre = getValue("entrepreneur");
        if (total > 0) {
          const placeRate = ((placed / total) * 100).toFixed(2);
          const higherRate = ((higher / total) * 100).toFixed(2);
          const totalRate = (((placed + higher + entre) / total) * 100).toFixed(
            2,
          );
          results.push({
            label: "Placement Rate",
            value: `${placeRate}%`,
            formula: `(${placed} / ${total}) × 100`,
            status:
              placeRate >= 60 ? "good" : placeRate >= 40 ? "warning" : "bad",
          });
          results.push({
            label: "Higher Studies Rate",
            value: `${higherRate}%`,
            formula: `(${higher} / ${total}) × 100`,
          });
          results.push({
            label: "Total Placement + Higher Studies",
            value: `${totalRate}%`,
            formula: `((${placed} + ${higher} + ${entre}) / ${total}) × 100`,
            status:
              totalRate >= 80 ? "good" : totalRate >= 60 ? "warning" : "bad",
          });
        }
        break;
      }
      case "totalEvents": {
        const intl = getValue("internationalEvents");
        const natl = getValue("nationalEvents");
        const state = getValue("stateEvents");
        const dept = getValue("deptEvents");
        results.push({
          label: "Total Events Organized",
          value: intl + natl + state + dept,
          formula: `Intl + National + State + Dept = ${intl} + ${natl} + ${state} + ${dept}`,
        });
        break;
      }
      case "studentFacultyRatio": {
        const students = getValue("numStudents");
        const faculty = getValue("numFaculty");
        if (faculty > 0) {
          const ratio = (students / faculty).toFixed(2);
          results.push({
            label: "Student-Faculty Ratio",
            value: `${ratio}:1`,
            formula: `Students / Faculty = ${students} / ${faculty}`,
            status: ratio <= 15 ? "good" : ratio <= 20 ? "warning" : "bad",
          });
        }
        break;
      }
      case "cadreRatio": {
        const reqProf = getValue("reqProf");
        const availProf = getValue("availProf");
        const reqAssoc = getValue("reqAssoc");
        const availAssoc = getValue("availAssoc");
        const reqAsst = getValue("reqAsst");
        const availAsst = getValue("availAsst");

        const profRatio =
          reqProf > 0 ? ((availProf / reqProf) * 100).toFixed(1) : 0;
        const assocRatio =
          reqAssoc > 0 ? ((availAssoc / reqAssoc) * 100).toFixed(1) : 0;
        const asstRatio =
          reqAsst > 0 ? ((availAsst / reqAsst) * 100).toFixed(1) : 0;

        results.push({
          label: "Professor Fulfillment",
          value: `${profRatio}%`,
          formula: `(${availProf} / ${reqProf}) × 100`,
          status:
            profRatio >= 100 ? "good" : profRatio >= 75 ? "warning" : "bad",
        });
        results.push({
          label: "Associate Professor Fulfillment",
          value: `${assocRatio}%`,
          formula: `(${availAssoc} / ${reqAssoc}) × 100`,
          status:
            assocRatio >= 100 ? "good" : assocRatio >= 75 ? "warning" : "bad",
        });
        results.push({
          label: "Assistant Professor Fulfillment",
          value: `${asstRatio}%`,
          formula: `(${availAsst} / ${reqAsst}) × 100`,
          status:
            asstRatio >= 100 ? "good" : asstRatio >= 75 ? "warning" : "bad",
        });
        break;
      }
      case "qualificationIndex": {
        const x = getValue("xPhd");
        const y = getValue("yMtech");
        const f = getValue("fRequired");
        if (f > 0) {
          const qi = (((2 * x + y) / (2 * f)) * 100).toFixed(2);
          results.push({
            label: "Faculty Qualification Index",
            value: `${qi}%`,
            formula: `(2×PhD + M.Tech) / (2×F) × 100 = (2×${x} + ${y}) / (2×${f}) × 100`,
            status: qi >= 100 ? "good" : qi >= 75 ? "warning" : "bad",
          });
        }
        break;
      }
      case "attainmentGap": {
        const target = getValue("targetLevel");
        const attained = getValue("attainmentLevel");
        const gap = (target - attained).toFixed(2);
        const percentage =
          target > 0 ? ((attained / target) * 100).toFixed(1) : 0;
        results.push({
          label: "Attainment Percentage",
          value: `${percentage}%`,
          formula: `(${attained} / ${target}) × 100`,
          status:
            percentage >= 100 ? "good" : percentage >= 80 ? "warning" : "bad",
        });
        results.push({
          label: "Gap",
          value: gap,
          formula: `Target - Attained = ${target} - ${attained}`,
          status: gap <= 0 ? "good" : gap <= 0.5 ? "warning" : "bad",
        });
        break;
      }
      case "creditDistribution": {
        const total = getValue("totalCredits");
        const math = getValue("mathCredits");
        const science = getValue("scienceCredits");
        const eng = getValue("engineeringCredits");
        if (total > 0) {
          results.push({
            label: "Mathematics %",
            value: `${((math / total) * 100).toFixed(1)}%`,
            formula: `(${math} / ${total}) × 100`,
          });
          results.push({
            label: "Science %",
            value: `${((science / total) * 100).toFixed(1)}%`,
            formula: `(${science} / ${total}) × 100`,
          });
          results.push({
            label: "Engineering %",
            value: `${((eng / total) * 100).toFixed(1)}%`,
            formula: `(${eng} / ${total}) × 100`,
          });
        }
        break;
      }
    }
  });

  displayCalculationResults(results);
}

/**
 * Display calculation results
 */
function displayCalculationResults(results) {
  const container = document.getElementById("calculationResults");
  if (!container) return;

  if (results.length === 0) {
    container.innerHTML =
      '<p class="text-gray-500">Enter data and calculations will appear here automatically.</p>';
    return;
  }

  container.innerHTML = results
    .map((r) => {
      let statusClass = "bg-gray-100 text-gray-800";
      let statusIcon = "";

      if (r.status === "good") {
        statusClass = "bg-green-100 text-green-800";
        statusIcon = '<span class="text-green-600 ml-2">✓</span>';
      } else if (r.status === "warning") {
        statusClass = "bg-yellow-100 text-yellow-800";
        statusIcon = '<span class="text-yellow-600 ml-2">⚠</span>';
      } else if (r.status === "bad") {
        statusClass = "bg-red-100 text-red-800";
        statusIcon = '<span class="text-red-600 ml-2">✗</span>';
      }

      return `
            <div class="p-4 ${statusClass} rounded-lg">
                <div class="flex justify-between items-center">
                    <span class="font-semibold">${r.label}</span>
                    <span class="text-xl font-bold">${r.value}${statusIcon}</span>
                </div>
                <p class="text-sm mt-1 opacity-75">Formula: ${r.formula}</p>
            </div>
        `;
    })
    .join("");
}

/**
 * Show message
 */
function showMessage(text, type = "success") {
  const messageDiv = document.getElementById("message");
  messageDiv.className =
    type === "error"
      ? "bg-red-100 text-red-700 border border-red-400 px-4 py-3 rounded mb-4"
      : "bg-green-100 text-green-700 border border-green-400 px-4 py-3 rounded mb-4";
  messageDiv.textContent = text;
  messageDiv.classList.remove("hidden");

  setTimeout(() => {
    messageDiv.classList.add("hidden");
  }, 3000);
}

/**
 * Escape HTML
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// SUPABASE INTEGRATION FUNCTIONS
// ============================================

/**
 * Save NBA data to Supabase backend
 */
async function saveNBADataToSupabase(criteria, data) {
  // Map criteria to appropriate save script
  const saveEndpoint = getSaveEndpoint(criteria);

  try {
    const response = await fetch(saveEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error saving to Supabase:", error);
    return {
      success: false,
      message: "Network error: " + error.message,
    };
  }
}

/**
 * Get save endpoint for criteria
 */
function getSaveEndpoint(criteria) {
  // Map criteria to save script endpoints
  const criteriaMap = {
    // Criteria 1
    1.1: "backend/NBA/save_11.php",
    1.2: "backend/NBA/save_12.php",
    1.3: "backend/NBA/save_13.php",
    1.4: "backend/NBA/save_14.php",
    1.5: "backend/NBA/save_15.php",

    // Criteria 2
    "2.1.1": "backend/NBA/save_211.php",
    "2.1.2": "backend/NBA/save_212.php",
    "2.1.3": "backend/NBA/save_213.php",
    "2.1.4": "backend/NBA/save_214.php",
    "2.2.1": "backend/NBA/save_221.php",
    "2.2.2": "backend/NBA/save_222.php",
    "2.2.3": "backend/NBA/save_223.php",
    "2.2.4": "backend/NBA/save_224.php",
    "2.2.5": "backend/NBA/save_225.php",

    // Criteria 3
    3.1: "backend/NBA/save_31.php",
    "3.2.1": "backend/NBA/save_321.php",
    "3.2.2": "backend/NBA/save_322.php",
    "3.3.1": "backend/NBA/save_331.php",
    "3.3.2": "backend/NBA/save_332.php",

    // Criteria 4 (already exist)
    4.1: "backend/NBA/save_41.php",
    "4.2.1": "backend/NBA/save_421.php",
    "4.2.2": "backend/NBA/save_422.php",
    4.3: "backend/NBA/save_43.php",
    4.4: "backend/NBA/save_44.php",
    "4.5.1": "backend/NBA/save_451.php",
    "4.5.2": "backend/NBA/save_452.php",
    "4.5.3": "backend/NBA/save_453.php",

    // Criteria 5 (already exist)
    5.1: "backend/NBA/save_51.php",
    5.2: "backend/NBA/save_52.php",
    5.3: "backend/NBA/save_53.php",
    5.4: "backend/NBA/save_54.php",
    5.5: "backend/NBA/save_55.php",
    5.6: "backend/NBA/save_56.php",
    5.7: "backend/NBA/save_57.php",
    "5.8.1": "backend/NBA/save_581.php",
    "5.8.2": "backend/NBA/save_582.php",
    "5.8.3": "backend/NBA/save_583.php",
    "5.8.4": "backend/NBA/save_584.php",
    5.9: "backend/NBA/save_59.php",
    "5.10": "backend/NBA/save_510.php",

    // Criteria 6 (already exist)
    6.1: "backend/NBA/save_61.php",
    6.2: "backend/NBA/save_62.php",
    6.3: "backend/NBA/save_63.php",
    6.4: "backend/NBA/save_64.php",

    // Criteria 7 (already exist)
    7.1: "backend/NBA/save_71.php",
    7.2: "backend/NBA/save_72.php",
    7.3: "backend/NBA/save_73.php",
    7.4: "backend/NBA/save_74.php",

    // Criteria 8
    8.1: "backend/NBA/save_81_supabase.php",
    8.2: "backend/NBA/save_82.php",
    8.3: "backend/NBA/save_83.php",
    "8.4.1": "backend/NBA/save_841.php",
    "8.4.2": "backend/NBA/save_842.php",
    "8.5.1": "backend/NBA/save_851.php",
    "8.5.2": "backend/NBA/save_852.php",

    // Criteria 9
    9.1: "backend/NBA/save_91.php",
    9.2: "backend/NBA/save_92.php",
    9.3: "backend/NBA/save_93.php",
    9.4: "backend/NBA/save_94.php",
    9.5: "backend/NBA/save_95.php",
    9.6: "backend/NBA/save_96.php",
    9.7: "backend/NBA/save_97.php",

    // Criteria 10
    10.1: "backend/NBA/save_101.php",
  };

  return criteriaMap[criteria] || "backend/NBA/save_generic.php";
}

/**
 * Delete NBA record
 */
async function deleteRecord(criteria, id) {
  if (!confirm("Are you sure you want to delete this record?")) {
    return;
  }

  try {
    const response = await fetch("backend/NBA/delete_criteria_data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        criteria: criteria,
        id: id,
      }),
    });

    const result = await response.json();

    if (result.success) {
      showMessage("Record deleted successfully", "success");
      const config = CRITERIA_CONFIG[criteria];
      await loadCriteriaData(criteria, config);
    } else {
      showMessage("Error deleting record: " + result.error, "error");
    }
  } catch (error) {
    showMessage("Network error: " + error.message, "error");
  }
}

/**
 * Edit record - populate form with existing data
 */
function editRecord(criteria, id) {
  const data = window.currentCriteriaData;
  if (!data) return;

  const record = data.find((item) => item.id === id);
  const config = CRITERIA_CONFIG[criteria];

  if (record && config) {
    document.getElementById("editId").value = id;
    config.fields.forEach((field) => {
      const input = document.getElementById(field.name);
      if (input) {
        input.value = record[field.name] || "";
      }
    });

    // Trigger calculations
    if (config.calculations) {
      performCalculations(config);
    }

    // Scroll to form
    document
      .getElementById("criteriaForm")
      .scrollIntoView({ behavior: "smooth" });
  }
}

/**
 * Clear form
 */
function clearForm() {
  const form = document.getElementById("criteriaForm");
  if (form) {
    form.reset();
    document.getElementById("editId").value = "";
  }
}
