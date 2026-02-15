/**
 * Updated NBA Criteria Configuration for Criteria 2, 3, 8, 9
 * Based on NBA SAR Format for Tier-II Engineering Programs
 *
 * Note: This file contains the corrected configurations.
 * Integrate these into the main nba.js CRITERIA_CONFIG object.
 */

const UPDATED_CRITERIA_CONFIG = {
  // ============================================
  // CRITERION 2: Program Curriculum and Teaching-Learning Processes (100 marks)
  // ============================================

  "2.1.1": {
    title:
      "Process for Designing Program Curriculum (Criterion 2.1.1 - 10 marks)",
    maxMarks: 10,
    type: "info", // Informational - no calculations
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "curriculumDesignProcess",
        label: "Curriculum Design Process Description",
        type: "textarea",
        placeholder:
          "Describe how the program curriculum is evolved and periodically reviewed...",
        required: true,
      },
      {
        name: "poConsideration",
        label: "Consideration of POs in Curriculum Design",
        type: "textarea",
        placeholder: "Explain how POs are considered in curriculum design...",
        required: true,
      },
      {
        name: "psoConsideration",
        label: "Consideration of PSOs in Curriculum Design",
        type: "textarea",
        placeholder: "Explain how PSOs are considered in curriculum design...",
        required: true,
      },
      {
        name: "industryInvolvement",
        label: "Industry Involvement in Curriculum Design",
        type: "textarea",
        placeholder: "Describe how industry experts are involved...",
        required: true,
      },
      {
        name: "documentaryEvidence",
        label: "Documentary Evidence",
        type: "textarea",
        placeholder: "List of documents demonstrating the process...",
        required: true,
      },
    ],
  },

  "2.1.2": {
    title: "Structure of the Curriculum (Criterion 2.1.2 - 5 marks)",
    maxMarks: 5,
    type: "info",
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
        placeholder: "Describe the balanced structure of the curriculum...",
        required: true,
      },
      {
        name: "totalCredits",
        label: "Total Credits",
        type: "number",
        required: true,
      },
      {
        name: "theoryCredits",
        label: "Theory Credits",
        type: "number",
        required: true,
      },
      {
        name: "practicalCredits",
        label: "Practical/Lab Credits",
        type: "number",
        required: true,
      },
      {
        name: "appropriateness",
        label: "Appropriateness for Degree Program",
        type: "textarea",
        placeholder: "Justify why this structure is appropriate...",
        required: true,
      },
    ],
  },

  "2.1.3": {
    title: "Components of the Curriculum (Criterion 2.1.3 - 5 marks)",
    maxMarks: 5,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "coreCourses",
        label: "Core Courses",
        type: "textarea",
        placeholder: "List core courses...",
        required: true,
      },
      {
        name: "electiveCourses",
        label: "Elective Courses",
        type: "textarea",
        placeholder: "List elective courses...",
        required: true,
      },
      {
        name: "labCourses",
        label: "Laboratory Courses",
        type: "textarea",
        placeholder: "List lab courses...",
        required: true,
      },
      {
        name: "projectInternship",
        label: "Project/Internship Components",
        type: "textarea",
        placeholder: "Describe project and internship components...",
        required: true,
      },
      {
        name: "otherComponents",
        label: "Other Components",
        type: "textarea",
        placeholder: "Seminars, workshops, certifications, etc.",
        required: false,
      },
    ],
  },

  "2.1.4": {
    title:
      "Process to Identify Compliance with POs/PSOs (Criterion 2.1.4 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "complianceProcess",
        label: "Process to Identify Compliance",
        type: "textarea",
        placeholder:
          "Describe the process to ensure curriculum compliance with POs & PSOs...",
        required: true,
      },
      {
        name: "mappingMethodology",
        label: "Mapping Methodology",
        type: "textarea",
        placeholder:
          "Explain the methodology for mapping curriculum to POs & PSOs...",
        required: true,
      },
      {
        name: "documentaryEvidence",
        label: "Documentary Evidence",
        type: "textarea",
        placeholder: "List of documents showing mapping/compliance...",
        required: true,
      },
    ],
  },

  "2.2.1": {
    title:
      "Process to Improve Quality of Teaching-Learning (Criterion 2.2.1 - 15 marks)",
    maxMarks: 15,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "academicCalendarAdherence",
        label: "A. Adherence to Academic Calendar (2 marks)",
        type: "textarea",
        placeholder:
          "Describe availability and compliance with academic calendar...",
        required: true,
      },
      {
        name: "pedagogicalInitiatives",
        label: "B. Pedagogical Initiatives (2 marks)",
        type: "textarea",
        placeholder:
          "Real life examples, collaborative learning, ICT, interactive classrooms...",
        required: true,
      },
      {
        name: "weakStudentSupport",
        label: "C. Support for Weak Students (2 marks)",
        type: "textarea",
        placeholder: "Guidelines, identification, actions taken, impact...",
        required: true,
      },
      {
        name: "brightStudentEncouragement",
        label: "C. Encouragement for Bright Students (included in C)",
        type: "textarea",
        placeholder: "Special programs for advanced students...",
        required: true,
      },
      {
        name: "classroomQuality",
        label: "D. Quality of Classroom Teaching (2 marks)",
        type: "textarea",
        placeholder: "Classroom ambience, student engagement...",
        required: true,
      },
      {
        name: "experimentConduct",
        label: "E. Conduct of Experiments (2 marks)",
        type: "textarea",
        placeholder: "Quality of lab experience, recording, analysis...",
        required: true,
      },
      {
        name: "continuousAssessment",
        label: "F. Continuous Assessment in Laboratory (3 marks)",
        type: "textarea",
        placeholder:
          "Internal exams, practical records, experiment assessment...",
        required: true,
      },
      {
        name: "studentFeedback",
        label: "G. Student Feedback and Actions (2 marks)",
        type: "textarea",
        placeholder: "Feedback format, frequency, analysis, actions taken...",
        required: true,
      },
    ],
  },

  "2.2.2": {
    title:
      "Quality of Examinations and Assignments (Criterion 2.2.2 - 15 marks",
    maxMarks: 15,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "questionPaperProcess",
        label: "A. Internal Question Paper Process (3 marks)",
        type: "textarea",
        placeholder:
          "Process for question paper setting, model answers, evaluation...",
        required: true,
      },
      {
        name: "outcomeBasedQuestions",
        label: "B. Questions from Outcomes/Learning Levels (2 marks)",
        type: "textarea",
        placeholder:
          "Validation process to ensure outcome attainment perspective...",
        required: true,
      },
      {
        name: "coCoverage",
        label: "C. Evidence of COs Coverage in Tests (5 marks)",
        type: "textarea",
        placeholder: "Mapping of questions with course outcomes...",
        required: true,
      },
      {
        name: "assignmentQuality",
        label: "D. Quality of Assignments (5 marks)",
        type: "textarea",
        placeholder:
          "Assignment quality, relevance to COs, evaluation, feedback...",
        required: true,
      },
    ],
  },

  "2.2.3": {
    title: "Quality of Student Projects (Criterion 2.2.3 - 20 marks)",
    maxMarks: 20,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "projectIdentification",
        label: "A. Project Identification and Allocation (2 marks)",
        type: "textarea",
        placeholder:
          "Process for project identification and faculty allocation...",
        required: true,
      },
      {
        name: "projectTypes",
        label: "B. Types and Relevance of Projects (2 marks)",
        type: "textarea",
        placeholder:
          "Classification, relevance to POs/PSOs, consideration of ethics, safety...",
        required: true,
      },
      {
        name: "industryProjects",
        label: "C. Projects Related to Industry (3 marks)",
        type: "textarea",
        placeholder: "Industry-sponsored or industry-relevant projects...",
        required: true,
      },
      {
        name: "monitoringProcess",
        label: "D. Monitoring and Evaluation Process (2 marks)",
        type: "textarea",
        placeholder: "Continuous monitoring mechanism and evaluation...",
        required: true,
      },
      {
        name: "individualTeamAssessment",
        label: "E. Individual and Team Performance Assessment (3 marks)",
        type: "textarea",
        placeholder: "Methodology to assess individual/team contributions...",
        required: true,
      },
      {
        name: "projectQuality",
        label: "F. Quality of Completed Projects (5 marks)",
        type: "textarea",
        placeholder: "Based on project demonstration, working prototypes...",
        required: true,
      },
      {
        name: "papersAwards",
        label: "G. Papers Published/Awards Received (3 marks)",
        type: "textarea",
        placeholder: "Evidence of publications or awards...",
        required: true,
      },
    ],
  },

  "2.2.4": {
    title: "Industry Interaction Initiatives (Criterion 2.2.4 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "industrySupportedLabs",
        label: "A. Industry Supported Laboratories (2 marks)",
        type: "textarea",
        placeholder:
          "Type of industries, labs, objectives, utilization, effectiveness...",
        required: true,
      },
      {
        name: "industryInCurriculum",
        label: "B. Industry in Program Design and Curriculum (3 marks)",
        type: "textarea",
        placeholder: "Documentary evidence of industry involvement...",
        required: true,
      },
      {
        name: "industryCourseDelivery",
        label: "C. Industry in Course Delivery (3 marks)",
        type: "textarea",
        placeholder: "Industry involvement in teaching regular courses...",
        required: true,
      },
      {
        name: "impactAnalysis",
        label: "D. Impact Analysis and Actions (2 marks)",
        type: "textarea",
        placeholder:
          "Analysis and actions taken based on industry interaction...",
        required: true,
      },
    ],
  },

  "2.2.5": {
    title: "Industry Internship/Summer Training (Criterion 2.2.5 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "industrialTraining",
        label: "A. Industrial Training/Tours (2 marks)",
        type: "textarea",
        placeholder:
          "Type of industries, objectives, number of students, visit reports...",
        required: true,
      },
      {
        name: "internshipDetails",
        label: "B. Internship/Summer Training >2 weeks (3 marks)",
        type: "textarea",
        placeholder:
          "Details of training programs, post-training assessment...",
        required: true,
      },
      {
        name: "impactAnalysis",
        label: "C. Impact Analysis (2 marks)",
        type: "textarea",
        placeholder: "Analysis of impact of industrial training...",
        required: true,
      },
      {
        name: "studentFeedback",
        label: "D. Student Feedback on Initiatives (3 marks)",
        type: "textarea",
        placeholder: "Feedback format, analysis, actions taken...",
        required: true,
      },
    ],
  },

  // ============================================
  // CRITERION 3: Course Outcomes and Program Outcomes (175 marks)
  // ============================================

  3.1: {
    title:
      "Correlation between Courses and POs/PSOs (Criterion 3.1 - 25 marks)",
    maxMarks: 25,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "cosDefinedEvidence",
        label: "A. Evidence of COs Defined for Every Course (5 marks)",
        type: "textarea",
        placeholder: "Provide evidence that COs are defined for all courses...",
        required: true,
      },
      {
        name: "cosInSyllabi",
        label: "B. COs Embedded in Syllabi (5 marks)",
        type: "textarea",
        placeholder: "Show that COs are included in course syllabi...",
        required: true,
      },
      {
        name: "courseArticulationMatrix",
        label: "C. Course Articulation Matrix Explanation (5 marks)",
        type: "textarea",
        placeholder:
          "Explain the Course Articulation Matrix (CO-PO mapping)...",
        required: true,
      },
      {
        name: "programArticulationMatrix",
        label: "D. Program Articulation Matrix Explanation (10 marks)",
        type: "textarea",
        placeholder: "Explain the Program Articulation Matrix tables...",
        required: true,
      },
    ],
  },

  "3.2.1": {
    title: "Assessment Tools for Course Outcomes (Criterion 3.2.1 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "assessmentProcessList",
        label: "A. List of Assessment Processes (2 marks)",
        type: "textarea",
        placeholder: "List all assessment processes used...",
        required: true,
      },
      {
        name: "assessmentQuality",
        label: "B. Quality/Relevance of Assessment Processes (8 marks)",
        type: "textarea",
        placeholder:
          "Describe data collection, verification, analysis, decision making...",
        required: true,
      },
    ],
  },

  "3.2.2": {
    title: "CO Attainment Records (Criterion 3.2.2 - 65 marks)",
    maxMarks: 65,
    type: "calculation",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "courseCode",
        label: "Course Code",
        type: "text",
        placeholder: "CS101",
        required: true,
      },
      {
        name: "courseName",
        label: "Course Name",
        type: "text",
        placeholder: "Programming Fundamentals",
        required: true,
      },
      {
        name: "yearOfStudy",
        label: "Year of Study",
        type: "number",
        min: 1,
        max: 4,
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
        name: "targetLevel",
        label: "Target Attainment Level",
        type: "number",
        step: "0.01",
        placeholder: "e.g., 2.0 or 60%",
        required: true,
      },
      {
        name: "co1Attainment",
        label: "CO1 Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "co2Attainment",
        label: "CO2 Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "co3Attainment",
        label: "CO3 Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "co4Attainment",
        label: "CO4 Attainment Level",
        type: "number",
        step: "0.01",
        required: false,
      },
      {
        name: "co5Attainment",
        label: "CO5 Attainment Level",
        type: "number",
        step: "0.01",
        required: false,
      },
      {
        name: "co6Attainment",
        label: "CO6 Attainment Level",
        type: "number",
        step: "0.01",
        required: false,
      },
      {
        name: "methodology",
        label: "Methodology Description",
        type: "textarea",
        placeholder:
          "Describe the methodology for CO attainment calculation...",
        required: true,
      },
    ],
    calculations: ["averageCOAttainment", "attainmentStatus"],
  },

  "3.3.1": {
    title:
      "Assessment Tools for PO/PSO Attainment (Criterion 3.3.1 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "directAssessmentTools",
        label: "Direct Assessment Tools & Processes (5 marks)",
        type: "textarea",
        placeholder: "List and explain direct assessment tools used...",
        required: true,
      },
      {
        name: "indirectAssessmentTools",
        label: "Indirect Assessment Tools & Processes (included in above)",
        type: "textarea",
        placeholder:
          "List indirect assessment tools (surveys, feedback, exit interviews)...",
        required: true,
      },
      {
        name: "assessmentQuality",
        label: "Quality/Relevance of Tools (5 marks)",
        type: "textarea",
        placeholder:
          "Effective compliance, methodology, decision making process...",
        required: true,
      },
    ],
  },

  "3.3.2": {
    title: "PO/PSO Attainment Results (Criterion 3.3.2 - 65 marks)",
    maxMarks: 65,
    type: "calculation",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "poPsoCode",
        label: "PO/PSO Code",
        type: "text",
        placeholder: "PO1, PSO1, etc.",
        required: true,
      },
      {
        name: "poPsoDescription",
        label: "PO/PSO Description",
        type: "textarea",
        placeholder: "Describe the PO/PSO...",
        required: true,
      },
      {
        name: "directAttainment",
        label: "Direct Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "indirectAttainment",
        label: "Indirect Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "targetLevel",
        label: "Target Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "documentaryEvidence",
        label: "Documentary Evidence",
        type: "textarea",
        placeholder: "List supporting documents...",
        required: true,
      },
    ],
    calculations: ["overallAttainment", "attainmentStatus"],
  },

  // ============================================
  // CRITERION 8: First Year Academics (50 marks)
  // ============================================

  8.1: {
    title: "First Year Student-Faculty Ratio (Criterion 8.1 - 5 marks)",
    maxMarks: 5,
    type: "calculation",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "totalFirstYearStudents",
        label: "Total First Year Students",
        type: "number",
        required: true,
      },
      {
        name: "regularFaculty",
        label: "Number of Regular Faculty",
        type: "number",
        required: true,
      },
      {
        name: "fractionalLoad",
        label: "Fractional Load (if any)",
        type: "number",
        step: "0.01",
        placeholder: "0 if none",
        required: false,
      },
    ],
    calculations: ["effectiveFaculty", "fysfr", "calculatedMarks"],
    formula: "Marks = (5 × 20) / FYSFR (Max 5, 0 if FYSFR > 25)",
  },

  8.2: {
    title: "Qualification of First Year Faculty (Criterion 8.2 - 5 marks)",
    maxMarks: 5,
    type: "calculation",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "phdHolders",
        label: "Faculty with Ph.D (x)",
        type: "number",
        required: true,
      },
      {
        name: "nonPhdHolders",
        label: "Faculty without Ph.D (y)",
        type: "number",
        required: true,
      },
    ],
    calculations: ["totalFaculty", "qualificationScore", "calculatedMarks"],
    formula: "Score = (5x + 3y) / RF, Average of 3 years",
  },

  8.3: {
    title: "First Year Academic Performance (Criterion 8.3 - 10 marks)",
    maxMarks: 10,
    type: "calculation",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "totalStudents",
        label: "Total Students Enrolled in First Year",
        type: "number",
        required: true,
      },
      {
        name: "successfulStudents",
        label: "Successful Students (Permitted to 2nd Year)",
        type: "number",
        required: true,
      },
      {
        name: "studentsAppeared",
        label: "Students Appeared in Examination",
        type: "number",
        required: true,
      },
      {
        name: "meanGPA",
        label: "Mean GPA/CGPA (on 10-point scale)",
        type: "number",
        step: "0.01",
        placeholder: "OR use percentage below",
        required: false,
      },
      {
        name: "meanPercentage",
        label: "Mean Percentage (if not using GPA)",
        type: "number",
        step: "0.01",
        placeholder: "Enter percentage if GPA not used",
        required: false,
      },
    ],
    calculations: ["academicPerformance", "successRate"],
    formula: "Performance = (Mean GPA or %/10) × (successful/appeared)",
  },

  "8.4.1": {
    title:
      "Assessment Processes for First Year COs (Criterion 8.4.1 - 5 marks)",
    maxMarks: 5,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "assessmentProcessList",
        label: "A. List of Assessment Processes (1 mark)",
        type: "textarea",
        placeholder: "List all assessment processes for first year courses...",
        required: true,
      },
      {
        name: "assessmentToolsRelevance",
        label: "B. Relevance of Assessment Tools (4 marks)",
        type: "textarea",
        placeholder:
          "Direct/indirect assessment, tools, processes, methodology, decision making...",
        required: true,
      },
    ],
  },

  "8.4.2": {
    title: "CO Attainment of First Year Courses (Criterion 8.4.2 - 5 marks)",
    maxMarks: 5,
    type: "calculation",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
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
        name: "targetLevel",
        label: "Target Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
      {
        name: "attainmentLevel",
        label: "Actual Attainment Level",
        type: "number",
        step: "0.01",
        required: true,
      },
    ],
    calculations: ["attainmentStatus"],
    note: "Verify records for at least 3 courses",
  },

  "8.5.1": {
    title: "PO/PSO Evaluation for First Year (Criterion 8.5.1 - 10 marks)",
    maxMarks: 10,
    type: "calculation",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "poPsoCode",
        label: "PO/PSO Code",
        type: "text",
        placeholder: "PO1, PSO1, etc.",
        required: true,
      },
      {
        name: "computationProcess",
        label: "Process of Computing Attainment (5 marks)",
        type: "textarea",
        placeholder:
          "Describe how PO/PSO attainment is computed from first year COs...",
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
        name: "documentaryEvidence",
        label: "Documentary Evidence (5 marks)",
        type: "textarea",
        placeholder: "Provide evidence validating the process...",
        required: true,
      },
    ],
  },

  "8.5.2": {
    title: "Actions Based on PO/PSO Evaluation (Criterion 8.5.2 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "poPsoCode",
        label: "PO/PSO Code",
        type: "text",
        placeholder: "PO1, PSO1, etc.",
        required: true,
      },
      {
        name: "actionsTaken",
        label: "A. Appropriate Actions Taken (10 marks)",
        type: "textarea",
        placeholder: "Describe actions taken based on evaluation results...",
        required: true,
      },
      {
        name: "implementationEvidence",
        label: "Implementation Evidence",
        type: "textarea",
        placeholder: "Provide evidence of implementation...",
        required: true,
      },
      {
        name: "impactObserved",
        label: "Impact Observed",
        type: "textarea",
        placeholder: "Describe the impact of actions taken...",
        required: false,
      },
    ],
  },

  // ============================================
  // CRITERION 9: Student Support Systems (50 marks)
  // ============================================

  9.1: {
    title: "Mentoring System (Criterion 9.1 - 5 marks)",
    maxMarks: 5,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "mentoringSystemDetails",
        label: "A. Details of Mentoring System (5 marks)",
        type: "textarea",
        placeholder: "Describe the mentoring system developed for students...",
        required: true,
      },
      {
        name: "termsOfReference",
        label: "Terms of Reference",
        type: "textarea",
        placeholder: "Define roles and responsibilities of mentors...",
        required: true,
      },
      {
        name: "implementation",
        label: "Implementation Process",
        type: "textarea",
        placeholder: "How is the mentoring system implemented?",
        required: true,
      },
      {
        name: "effectiveness",
        label: "Efficacy/Effectiveness",
        type: "textarea",
        placeholder:
          "Evidence of effectiveness (also verified during student interaction)...",
        required: true,
      },
    ],
  },

  9.2: {
    title:
      "Feedback Analysis and Corrective Measures (Criterion 9.2 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "feedbackMethodology",
        label: "A. Feedback Analysis Methodology (5 marks)",
        type: "textarea",
        placeholder: "Methodology for feedback collection and analysis...",
        required: true,
      },
      {
        name: "feedbackEffectiveness",
        label: "Effectiveness of Feedback Process",
        type: "textarea",
        placeholder: "How effective is the feedback mechanism?",
        required: true,
      },
      {
        name: "correctiveMeasures",
        label: "B. Record of Corrective Measures (5 marks)",
        type: "textarea",
        placeholder: "Actions taken based on feedback analysis...",
        required: true,
      },
    ],
  },

  9.3: {
    title: "Feedback on Facilities (Criterion 9.3 - 5 marks)",
    maxMarks: 5,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "feedbackCollection",
        label: "A. Feedback Collection Process (5 marks)",
        type: "textarea",
        placeholder: "Process for collecting feedback on facilities...",
        required: true,
      },
      {
        name: "feedbackAnalysis",
        label: "Feedback Analysis",
        type: "textarea",
        placeholder: "How is facility feedback analyzed?",
        required: true,
      },
      {
        name: "correctiveActions",
        label: "Corrective Actions",
        type: "textarea",
        placeholder: "Actions taken based on facility feedback...",
        required: true,
      },
    ],
  },

  9.4: {
    title: "Self-Learning (Criterion 9.4 - 5 marks)",
    maxMarks: 5,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "selfLearningScope",
        label: "A. Scope for Self-Learning (2 marks)",
        type: "textarea",
        placeholder: "Describe opportunities for self-learning...",
        required: true,
      },
      {
        name: "facilitiesAndMaterials",
        label: "B. Facilities and Materials (3 marks)",
        type: "textarea",
        placeholder:
          "Learning beyond syllabus, Webinars, Podcasts, MOOCs, effective utilization...",
        required: true,
      },
    ],
  },

  9.5: {
    title: "Career Guidance, Training, Placement (Criterion 9.5 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "careerGuidanceFacilities",
        label: "A. Career Guidance Facilities (2 marks)",
        type: "textarea",
        placeholder: "Availability of career guidance facilities...",
        required: true,
      },
      {
        name: "higherStudiesCounseling",
        label: "B. Counseling for Higher Studies (2 marks)",
        type: "textarea",
        placeholder: "GATE, GRE, GMAT, etc. preparation support...",
        required: true,
      },
      {
        name: "prePlacementTraining",
        label: "C. Pre-placement Training (3 marks)",
        type: "textarea",
        placeholder: "Aptitude, technical, soft skills training...",
        required: true,
      },
      {
        name: "placementProcess",
        label: "D. Placement Process and Support (3 marks)",
        type: "textarea",
        placeholder:
          "Placement cell activities, company visits, support provided...",
        required: true,
      },
    ],
  },

  9.6: {
    title: "Entrepreneurship Cell (Criterion 9.6 - 5 marks)",
    maxMarks: 5,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "entrepreneurshipInitiatives",
        label: "A. Entrepreneurship Initiatives (3 marks)",
        type: "textarea",
        placeholder: "Programs, workshops, incubation support...",
        required: true,
      },
      {
        name: "studentsBenefited",
        label: "B. Data on Students Benefited (2 marks)",
        type: "number",
        placeholder: "Number of students who participated/benefited...",
        required: true,
      },
      {
        name: "initiativesDetails",
        label: "Details of Initiatives",
        type: "textarea",
        placeholder: "Specific initiatives and their outcomes...",
        required: false,
      },
    ],
  },

  9.7: {
    title:
      "Co-curricular and Extra-curricular Activities (Criterion 9.7 - 10 marks)",
    maxMarks: 10,
    type: "info",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "sportsCulturalFacilities",
        label: "A. Sports and Cultural Facilities (3 marks)",
        type: "textarea",
        placeholder: "Available facilities, utilization, achievements...",
        required: true,
      },
      {
        name: "nccNssClubs",
        label: "B. NCC, NSS and Other Clubs (3 marks)",
        type: "textarea",
        placeholder: "Active clubs, membership, activities...",
        required: true,
      },
      {
        name: "annualActivities",
        label: "C. Annual Student Activities (4 marks)",
        type: "textarea",
        placeholder:
          "Technical fest, cultural fest, sports meet, competitions...",
        required: true,
      },
    ],
  },
};

// Export for integration
module.exports = UPDATED_CRITERIA_CONFIG;
