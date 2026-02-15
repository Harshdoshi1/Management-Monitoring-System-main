/**
 * Dashboard JavaScript - Handles all dashboard functionality
 */

// Check authentication
if (!Storage.isLoggedIn()) {
  window.location.href = "login.html";
}

// Global variables
let currentTab = "students";

// Initialize on page load
document.addEventListener("DOMContentLoaded", function () {
  // Set user email in header
  const user = Storage.getCurrentUser();
  if (user) {
    document.getElementById("userEmail").textContent = user.email;
  }

  // Get tab from URL or default to students
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get("tab") || "students";
  showTab(tab);

  // Setup form handlers
  setupStudentForm();
  setupFacultyForm();

  // Setup search handlers
  setupSearchHandlers();
});

/**
 * Show specific tab
 */
function showTab(tab) {
  currentTab = tab;

  // Update URL
  const url = new URL(window.location);
  url.searchParams.set("tab", tab);
  window.history.pushState({}, "", url);

  // Hide all content
  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.add("hidden"));

  // Show selected content
  const content = document.getElementById(`content-${tab}`);
  if (content) {
    content.classList.remove("hidden");
  }

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("bg-blue-600", "text-white");
    btn.classList.add("bg-white", "text-gray-700", "border");
  });

  const activeBtn = document.getElementById(`tab-${tab}`);
  if (activeBtn) {
    activeBtn.classList.remove("bg-white", "text-gray-700", "border");
    activeBtn.classList.add("bg-blue-600", "text-white");
  }

  // Load data for the tab
  if (tab === "students") {
    loadStudents();
    populateStudentFilters();
  } else if (tab === "faculty") {
    loadFaculty();
    populateFacultyFilters();
  }
}

/**
 * Logout function
 */
function logout() {
  Storage.logout();
  window.location.href = "login.html";
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

// ==================== STUDENTS ====================

/**
 * Setup student form handler
 */
function setupStudentForm() {
  const form = document.getElementById("addStudentForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const student = {
        firstName: formData.get("firstName"),
        middleName: formData.get("middleName") || "",
        lastName: formData.get("lastName"),
        grNo: formData.get("grNo"),
        enrollmentNo: formData.get("enrollmentNo"),
        class: formData.get("class"),
        semester: parseInt(formData.get("semester")),
        batch: formData.get("batch"),
        academicYear: formData.get("academicYear"),
      };

      const result = Storage.addStudent(student);
      showMessage(result.message, result.success ? "success" : "error");

      if (result.success) {
        form.reset();
        loadStudents();
        populateStudentFilters();
      }
    });
  }
}

/**
 * Load students table
 */
function loadStudents() {
  const query = document.getElementById("studentSearch")?.value || "";
  const batch = document.getElementById("studentBatchFilter")?.value || "";
  const year = document.getElementById("studentYearFilter")?.value || "";

  const students = Storage.searchStudents(query, { batch, academicYear: year });
  const tbody = document.getElementById("studentsTableBody");
  const noStudents = document.getElementById("noStudents");
  const totalStudents = document.getElementById("totalStudents");

  if (totalStudents) {
    totalStudents.textContent = students.length;
  }

  if (students.length === 0) {
    if (tbody) tbody.innerHTML = "";
    if (noStudents) noStudents.classList.remove("hidden");
    return;
  }

  if (noStudents) noStudents.classList.add("hidden");

  if (tbody) {
    tbody.innerHTML = students
      .map(
        (student) => `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3">${escapeHtml(student.firstName)} ${escapeHtml(student.middleName || "")} ${escapeHtml(student.lastName)}</td>
                <td class="px-4 py-3">${escapeHtml(student.grNo)}</td>
                <td class="px-4 py-3">${escapeHtml(student.enrollmentNo)}</td>
                <td class="px-4 py-3">${escapeHtml(student.class)}</td>
                <td class="px-4 py-3">${student.semester}</td>
                <td class="px-4 py-3">${escapeHtml(student.batch)}</td>
                <td class="px-4 py-3">${escapeHtml(student.academicYear)}</td>
                <td class="px-4 py-3">
                    <button onclick="deleteStudent(${student.id})" class="text-red-600 hover:underline text-sm">Delete</button>
                </td>
            </tr>
        `,
      )
      .join("");
  }
}

/**
 * Delete student
 */
function deleteStudent(id) {
  if (confirm("Are you sure you want to delete this student?")) {
    const result = Storage.deleteStudent(id);
    showMessage(result.message, result.success ? "success" : "error");
    loadStudents();
    populateStudentFilters();
  }
}

/**
 * Populate student filters
 */
function populateStudentFilters() {
  const batches = Storage.getUniqueBatches();
  const years = Storage.getUniqueAcademicYears();

  const batchSelect = document.getElementById("studentBatchFilter");
  const yearSelect = document.getElementById("studentYearFilter");

  if (batchSelect) {
    const currentBatch = batchSelect.value;
    batchSelect.innerHTML =
      '<option value="">All Batches</option>' +
      batches
        .map(
          (b) => `<option value="${escapeHtml(b)}">${escapeHtml(b)}</option>`,
        )
        .join("");
    batchSelect.value = currentBatch;
  }

  if (yearSelect) {
    const currentYear = yearSelect.value;
    yearSelect.innerHTML =
      '<option value="">All Years</option>' +
      years
        .map(
          (y) => `<option value="${escapeHtml(y)}">${escapeHtml(y)}</option>`,
        )
        .join("");
    yearSelect.value = currentYear;
  }
}

// ==================== FACULTY ====================

/**
 * Setup faculty form handler
 */
function setupFacultyForm() {
  const form = document.getElementById("addFacultyForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(form);
      const faculty = {
        firstName: formData.get("firstName"),
        middleName: formData.get("middleName") || "",
        lastName: formData.get("lastName"),
        facultyId: formData.get("facultyId"),
        email: formData.get("email"),
        department: formData.get("department"),
        designation: formData.get("designation"),
        qualification: formData.get("qualification"),
      };

      const result = Storage.addFaculty(faculty);
      showMessage(result.message, result.success ? "success" : "error");

      if (result.success) {
        form.reset();
        loadFaculty();
        populateFacultyFilters();
      }
    });
  }
}

/**
 * Load faculty table
 */
function loadFaculty() {
  const query = document.getElementById("facultySearch")?.value || "";
  const dept = document.getElementById("facultyDeptFilter")?.value || "";

  const facultyList = Storage.searchFaculty(query, { department: dept });
  const tbody = document.getElementById("facultyTableBody");
  const noFaculty = document.getElementById("noFaculty");
  const totalFaculty = document.getElementById("totalFaculty");

  if (totalFaculty) {
    totalFaculty.textContent = facultyList.length;
  }

  if (facultyList.length === 0) {
    if (tbody) tbody.innerHTML = "";
    if (noFaculty) noFaculty.classList.remove("hidden");
    return;
  }

  if (noFaculty) noFaculty.classList.add("hidden");

  if (tbody) {
    tbody.innerHTML = facultyList
      .map(
        (faculty) => `
            <tr class="hover:bg-gray-50">
                <td class="px-4 py-3">${escapeHtml(faculty.firstName)} ${escapeHtml(faculty.middleName || "")} ${escapeHtml(faculty.lastName)}</td>
                <td class="px-4 py-3">${escapeHtml(faculty.facultyId)}</td>
                <td class="px-4 py-3">${escapeHtml(faculty.email)}</td>
                <td class="px-4 py-3">${escapeHtml(faculty.department)}</td>
                <td class="px-4 py-3">${escapeHtml(faculty.designation)}</td>
                <td class="px-4 py-3">${escapeHtml(faculty.qualification)}</td>
                <td class="px-4 py-3">
                    <button onclick="deleteFaculty(${faculty.id})" class="text-red-600 hover:underline text-sm">Delete</button>
                </td>
            </tr>
        `,
      )
      .join("");
  }
}

/**
 * Delete faculty
 */
function deleteFaculty(id) {
  if (confirm("Are you sure you want to delete this faculty member?")) {
    const result = Storage.deleteFaculty(id);
    showMessage(result.message, result.success ? "success" : "error");
    loadFaculty();
    populateFacultyFilters();
  }
}

/**
 * Populate faculty filters
 */
function populateFacultyFilters() {
  const depts = Storage.getUniqueDepartments();

  const deptSelect = document.getElementById("facultyDeptFilter");

  if (deptSelect) {
    const currentDept = deptSelect.value;
    deptSelect.innerHTML =
      '<option value="">All Departments</option>' +
      depts
        .map(
          (d) => `<option value="${escapeHtml(d)}">${escapeHtml(d)}</option>`,
        )
        .join("");
    deptSelect.value = currentDept;
  }
}

// ==================== SEARCH ====================

/**
 * Setup search handlers
 */
function setupSearchHandlers() {
  // Student search
  const studentSearch = document.getElementById("studentSearch");
  if (studentSearch) {
    studentSearch.addEventListener("input", debounce(loadStudents, 300));
  }

  const studentBatchFilter = document.getElementById("studentBatchFilter");
  if (studentBatchFilter) {
    studentBatchFilter.addEventListener("change", loadStudents);
  }

  const studentYearFilter = document.getElementById("studentYearFilter");
  if (studentYearFilter) {
    studentYearFilter.addEventListener("change", loadStudents);
  }

  // Faculty search
  const facultySearch = document.getElementById("facultySearch");
  if (facultySearch) {
    facultySearch.addEventListener("input", debounce(loadFaculty, 300));
  }

  const facultyDeptFilter = document.getElementById("facultyDeptFilter");
  if (facultyDeptFilter) {
    facultyDeptFilter.addEventListener("change", loadFaculty);
  }
}

// ==================== UTILITIES ====================

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
  if (text === null || text === undefined) return "";
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
