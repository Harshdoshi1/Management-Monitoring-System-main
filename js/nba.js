/**
 * NBA Criteria JavaScript - Handles all NBA criteria forms and calculations
 */

// Criteria definitions
const CRITERIA_CONFIG = {
  1.1: {
    title: "Vision & Mission (Criterion 1.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "vision",
        label: "Vision Statement",
        type: "textarea",
        required: true,
      },
      {
        name: "mission",
        label: "Mission Statement",
        type: "textarea",
        required: true,
      },
    ],
  },
  1.2: {
    title: "Program Educational Objectives (Criterion 1.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      { name: "peoTitle", label: "PEO Title", type: "text", required: true },
      {
        name: "peoStatement",
        label: "PEO Statement",
        type: "textarea",
        required: true,
      },
    ],
  },
  1.3: {
    title: "PEO to Mission Mapping (Criterion 1.3)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "process",
        label: "Mapping Process Description",
        type: "textarea",
        required: true,
      },
    ],
  },
  1.4: {
    title: "PEO Review Process (Criterion 1.4)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "process",
        label: "Review Process Description",
        type: "textarea",
        required: true,
      },
    ],
  },
  1.5: {
    title: "PEO Consistency (Criterion 1.5)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "peoMissionMatrix",
        label: "PEO-Mission Consistency Matrix",
        type: "textarea",
        required: true,
      },
      {
        name: "justification",
        label: "Justification",
        type: "textarea",
        required: true,
      },
    ],
  },
  2.1: {
    title: "Program Curriculum (Criterion 2.1)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "description",
        label: "Curriculum Description",
        type: "textarea",
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
        name: "scienceCredits",
        label: "Basic Science Credits",
        type: "number",
        required: true,
      },
      {
        name: "engineeringCredits",
        label: "Engineering Credits",
        type: "number",
        required: true,
      },
    ],
    calculations: ["creditDistribution"],
  },
  2.2: {
    title: "Teaching-Learning Processes (Criterion 2.2)",
    fields: [
      {
        name: "academicYear",
        label: "Academic Year",
        type: "text",
        placeholder: "2023-24",
        required: true,
      },
      {
        name: "description",
        label: "Teaching Methods Description",
        type: "textarea",
        required: true,
      },
    ],
  },
  3.1: {
    title: "Course Outcomes (Criterion 3.1)",
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
        name: "subjectCode",
        label: "Subject Code",
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
    form.addEventListener("submit", function (e) {
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

      // Save data
      const result = Storage.saveNBAData(criteria, data);
      showMessage(result.message, result.success ? "success" : "error");

      if (result.success) {
        clearForm();
        loadCriteriaData(criteria, config);
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
 * Load criteria data into table
 */
function loadCriteriaData(criteria, config) {
  const data = Storage.getNBAData(criteria);
  const tbody = document.getElementById("dataTableBody");
  const noData = document.getElementById("noData");

  if (data.length === 0) {
    if (tbody) tbody.innerHTML = "";
    if (noData) noData.classList.remove("hidden");
    return;
  }

  if (noData) noData.classList.add("hidden");

  if (tbody) {
    tbody.innerHTML = data
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
