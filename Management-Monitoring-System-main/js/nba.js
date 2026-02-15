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
 * Load criteria content with improved UI
 */
function loadCriteria(criteria) {
  const config = CRITERIA_CONFIG[criteria];

  if (!config) {
    document.getElementById("criteriaContent").innerHTML = `
            <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
                <div class="flex items-center">
                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                    </svg>
                    Invalid criteria: ${escapeHtml(criteria)}. <a href="dashboard.html?tab=nba" class="underline ml-2 font-semibold">Return to NBA page</a>
                </div>
            </div>`;
    return;
  }

  document.getElementById("criteriaTitle").textContent = config.title;
  document.title = config.title + " - DMS";

  // Calculate max marks display
  const maxMarksDisplay = config.maxMarks
    ? `<span class="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">Max: ${config.maxMarks} marks</span>`
    : "";

  const content = `
        <!-- Criteria Header -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-xl mb-6 shadow-lg">
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold">${escapeHtml(config.title)}</h2>
                    <p class="text-blue-100 mt-1">Criterion ${escapeHtml(criteria)}</p>
                </div>
                ${maxMarksDisplay}
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Form Section -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div class="flex items-center gap-2 mb-6">
                    <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800">Enter Data</h2>
                </div>
                <form id="criteriaForm">
                    <input type="hidden" name="id" id="editId" value="">
                    ${generateFormFields(config.fields)}
                    <div class="flex gap-3 mt-6 pt-4 border-t">
                        <button type="submit" class="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-md transition-all duration-200 flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                            </svg>
                            Save Data
                        </button>
                        <button type="button" onclick="clearForm()" class="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-semibold transition-all duration-200">
                            Clear
                        </button>
                    </div>
                </form>
            </div>

            <!-- Calculations Section -->
            <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <div class="flex items-center gap-2 mb-6">
                    <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800">Calculations & Results</h2>
                </div>
                <div id="calculationResults" class="space-y-4">
                    <div class="bg-gray-50 rounded-lg p-4 text-center">
                        <svg class="w-12 h-12 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                        </svg>
                        <p class="text-gray-500">Enter data and calculations will appear here automatically.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Data Table -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 mt-6 overflow-hidden">
            <div class="p-5 border-b bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                    </div>
                    <h2 class="text-xl font-bold text-gray-800">Saved Records</h2>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full" id="dataTable">
                    <thead class="bg-gray-50">
                        <tr>
                            ${generateTableHeaders(config.fields)}
                            <th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-200">Actions</th>
                        </tr>
                    </thead>
                    <tbody id="dataTableBody" class="divide-y divide-gray-100">
                    </tbody>
                </table>
            </div>
            <div id="noData" class="hidden p-12 text-center">
                <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                </svg>
                <p class="text-gray-500 text-lg">No data saved yet</p>
                <p class="text-gray-400 text-sm mt-1">Add your first entry using the form above</p>
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
 * Generate form fields HTML with improved styling
 */
function generateFormFields(fields) {
  return fields
    .map((field) => {
      let input = "";
      const baseClass =
        "w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200";

      if (field.type === "textarea") {
        input = `<textarea name="${field.name}" id="${field.name}" 
                        ${field.required ? "required" : ""} 
                        class="${baseClass} min-h-[100px] resize-y" 
                        rows="3" placeholder="${field.placeholder || ""}">${field.default || ""}</textarea>`;
      } else if (field.type === "select") {
        input = `<select name="${field.name}" id="${field.name}" 
                        ${field.required ? "required" : ""} 
                        class="${baseClass} cursor-pointer">
                        ${field.options.map((opt) => `<option value="${opt}">${opt}</option>`).join("")}
                    </select>`;
      } else {
        input = `<input type="${field.type}" name="${field.name}" id="${field.name}" 
                        ${field.required ? "required" : ""} 
                        ${field.min !== undefined ? `min="${field.min}"` : ""} 
                        ${field.max !== undefined ? `max="${field.max}"` : ""} 
                        ${field.step ? `step="${field.step}"` : ""} 
                        class="${baseClass}" 
                        placeholder="${field.placeholder || ""}">`;
      }

      return `
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-semibold mb-2" for="${field.name}">
                    ${field.label}
                    ${field.required ? '<span class="text-red-500 ml-1">*</span>' : '<span class="text-gray-400 text-xs ml-1">(optional)</span>'}
                </label>
                ${input}
            </div>`;
    })
    .join("");
}

/**
 * Generate table headers with improved styling
 */
function generateTableHeaders(fields) {
  return fields
    .map(
      (f) =>
        `<th class="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b-2 border-gray-200 bg-gray-50">${f.label}</th>`,
    )
    .join("");
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
              <tr class="hover:bg-gray-50 transition-colors duration-150">
                  ${config.fields.map((f) => `<td class="px-4 py-3 text-sm text-gray-700">${escapeHtml(String(item[f.name] || "-"))}</td>`).join("")}
                  <td class="px-4 py-3">
                      <div class="flex gap-2">
                          <button onclick="editRecord('${criteria}', ${item.id})" class="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors">
                              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                              </svg>
                              Edit
                          </button>
                          <button onclick="deleteRecord('${criteria}', ${item.id})" class="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors">
                              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                              </svg>
                              Delete
                          </button>
                      </div>
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
 * Edit record - uses data loaded from Supabase
 */
function editRecord(criteria, id) {
  const data = window.currentCriteriaData || [];
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

    // Scroll to form with visual highlight
    const form = document.getElementById("criteriaForm");
    form.scrollIntoView({ behavior: "smooth" });
    form.classList.add("ring-2", "ring-blue-500", "ring-offset-2");
    setTimeout(() => {
      form.classList.remove("ring-2", "ring-blue-500", "ring-offset-2");
    }, 2000);
  } else {
    showMessage("Could not load record for editing", "error");
  }
}

/**
 * Delete record - calls Supabase backend
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
      await loadCriteriaData(criteria, CRITERIA_CONFIG[criteria]);
    } else {
      showMessage(
        "Error deleting record: " + (result.error || result.message),
        "error",
      );
    }
  } catch (error) {
    showMessage("Network error: " + error.message, "error");
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
 * Show message with improved styling
 */
function showMessage(text, type = "success") {
  const messageDiv = document.getElementById("message");

  let icon = "";
  let className = "";

  if (type === "error") {
    className =
      "bg-red-50 text-red-800 border-l-4 border-red-500 px-4 py-4 rounded-lg mb-4 flex items-center gap-3 shadow-sm";
    icon = `<svg class="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>`;
  } else if (type === "warning") {
    className =
      "bg-yellow-50 text-yellow-800 border-l-4 border-yellow-500 px-4 py-4 rounded-lg mb-4 flex items-center gap-3 shadow-sm";
    icon = `<svg class="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>`;
  } else {
    className =
      "bg-green-50 text-green-800 border-l-4 border-green-500 px-4 py-4 rounded-lg mb-4 flex items-center gap-3 shadow-sm";
    icon = `<svg class="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>`;
  }

  messageDiv.className = className;
  messageDiv.innerHTML = `${icon}<span>${text}</span>`;
  messageDiv.classList.remove("hidden");

  setTimeout(() => {
    messageDiv.classList.add("hidden");
  }, 4000);
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
 * All criteria now use the unified save_generic.php endpoint with Supabase REST API
 */
function getSaveEndpoint(criteria) {
  // Use unified save endpoint with criteria parameter
  return `backend/NBA/save_generic.php?criteria=${encodeURIComponent(criteria)}`;
}

// Note: deleteRecord, editRecord, and clearForm functions are defined earlier in this file
// to avoid duplicate function declarations
