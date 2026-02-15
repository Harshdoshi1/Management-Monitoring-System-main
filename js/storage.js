/**
 * Storage Module - Handles all data persistence using Supabase + localStorage
 * Works on Vercel by calling Supabase REST API directly from browser
 */

// Supabase Configuration
const SUPABASE_URL = "https://ijdeeyylabqrsgdebliz.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqZGVleXlsYWJxcnNnZGVibGl6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4MTcyNjAsImV4cCI6MjA4NjM5MzI2MH0.UbzkskQuiP92ZEXSnJFibWc-mJvzMEs2L-H9xeQjAQY";

/**
 * Make Supabase REST API request
 */
async function supabaseRequest(endpoint, method = "GET", data = null) {
  const url = SUPABASE_URL + endpoint;

  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: "Bearer " + SUPABASE_ANON_KEY,
    "Content-Type": "application/json",
    Prefer: "return=representation",
  };

  const options = {
    method: method,
    headers: headers,
  };

  if (data && (method === "POST" || method === "PUT" || method === "PATCH")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    return {
      status: response.status,
      data: responseData,
      ok: response.ok,
    };
  } catch (error) {
    console.error("Supabase request error:", error);
    return {
      status: 500,
      data: null,
      error: error.message,
      ok: false,
    };
  }
}

const Storage = {
  // Keys for localStorage (fallback/cache)
  KEYS: {
    USERS: "dms_users",
    CURRENT_USER: "dms_current_user",
    STUDENTS: "dms_students",
    FACULTY: "dms_faculty",
    NBA_DATA: "dms_nba_data",
  },

  /**
   * Initialize default data if not exists
   */
  init() {
    // Initialize empty arrays for local cache
    if (!localStorage.getItem(this.KEYS.STUDENTS)) {
      localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.FACULTY)) {
      localStorage.setItem(this.KEYS.FACULTY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.KEYS.NBA_DATA)) {
      localStorage.setItem(this.KEYS.NBA_DATA, JSON.stringify({}));
    }
  },

  /**
   * Check if user is logged in
   */
  isLoggedIn() {
    return localStorage.getItem(this.KEYS.CURRENT_USER) !== null;
  },

  /**
   * Get current user
   */
  getCurrentUser() {
    const user = localStorage.getItem(this.KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  },

  /**
   * Set user (called after successful login/register)
   */
  setUser(user) {
    localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
  },

  /**
   * Login user via backend (proper password verification with bcrypt)
   */
  async loginWithSupabase(email, password) {
    try {
      const response = await fetch('api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (result.success && result.user) {
        localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(result.user));
      }

      return result;
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed. Please try again." };
    }
  },

  /**
   * Register new user via Supabase
   * NOTE: This function now calls the backend PHP for proper password hashing
   */
  async registerWithSupabase(name, email, password, role = "faculty") {
    try {
      // Call backend register.php which handles password hashing
      const response = await fetch('api/register.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: role.toLowerCase() })
      });
      return await response.json();
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, message: "Registration failed. Please try again." };
    }
  },
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    }
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(this.KEYS.CURRENT_USER);
  },

  // ==================== STUDENTS ====================

  /**
   * Get all students (from localStorage cache)
   */
  getStudents() {
    return JSON.parse(localStorage.getItem(this.KEYS.STUDENTS) || "[]");
  },

  /**
   * Get students from Supabase
   */
  async getStudentsFromSupabase() {
    try {
      const response = await supabaseRequest(
        "/rest/v1/students?order=created_at.desc&limit=100",
        "GET",
      );
      if (response.ok && response.data) {
        localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
    return this.getStudents();
  },

  /**
   * Add student to Supabase
   */
  async addStudentToSupabase(student) {
    try {
      const studentData = {
        enrollment_number: student.enrollmentNo || student.enrollment_number,
        student_name:
          (student.firstName || "") + " " + (student.lastName || ""),
        batch: student.batch,
        academic_year: student.academicYear || student.academic_year,
        year_of_study: parseInt(
          student.yearOfStudy || student.year_of_study || 1,
        ),
        semester: parseInt(student.semester || 1),
        created_at: new Date().toISOString(),
      };

      const response = await supabaseRequest(
        "/rest/v1/students",
        "POST",
        studentData,
      );

      if (response.ok) {
        // Also add to localStorage
        const students = this.getStudents();
        const newStudent = Array.isArray(response.data)
          ? response.data[0]
          : response.data;
        students.push(newStudent);
        localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify(students));

        return {
          success: true,
          message: "Student added successfully!",
          student: newStudent,
        };
      } else {
        return { success: false, message: "Failed to add student" };
      }
    } catch (error) {
      console.error("Add student error:", error);
      return { success: false, message: "Failed to add student" };
    }
  },

  /**
   * Add student (localStorage fallback)
   */
  addStudent(student) {
    const students = this.getStudents();
    student.id = Date.now();
    student.createdAt = new Date().toISOString();
    students.push(student);
    localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify(students));

    // Also try to save to Supabase (async, non-blocking)
    this.addStudentToSupabase(student).catch(console.error);

    return { success: true, message: "Student added successfully!", student };
  },

  /**
   * Update student
   */
  updateStudent(id, updates) {
    const students = this.getStudents();
    const index = students.findIndex((s) => s.id === id);
    if (index !== -1) {
      students[index] = { ...students[index], ...updates };
      localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify(students));
      return { success: true, message: "Student updated successfully!" };
    }
    return { success: false, message: "Student not found." };
  },

  /**
   * Delete student
   */
  deleteStudent(id) {
    const students = this.getStudents().filter((s) => s.id !== id);
    localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify(students));
    return { success: true, message: "Student deleted successfully!" };
  },

  /**
   * Search students
   */
  searchStudents(query, filters = {}) {
    let students = this.getStudents();

    if (query) {
      query = query.toLowerCase();
      students = students.filter(
        (s) =>
          (s.firstName && s.firstName.toLowerCase().includes(query)) ||
          (s.lastName && s.lastName.toLowerCase().includes(query)) ||
          (s.student_name && s.student_name.toLowerCase().includes(query)) ||
          (s.grNo && s.grNo.toLowerCase().includes(query)) ||
          (s.enrollmentNo && s.enrollmentNo.toLowerCase().includes(query)) ||
          (s.enrollment_number &&
            s.enrollment_number.toLowerCase().includes(query)),
      );
    }

    if (filters.batch) {
      students = students.filter((s) => s.batch === filters.batch);
    }
    if (filters.academicYear) {
      students = students.filter(
        (s) =>
          s.academicYear === filters.academicYear ||
          s.academic_year === filters.academicYear,
      );
    }

    return students;
  },

  // ==================== FACULTY ====================

  /**
   * Get all faculty
   */
  getFaculty() {
    return JSON.parse(localStorage.getItem(this.KEYS.FACULTY) || "[]");
  },

  /**
   * Add faculty
   */
  addFaculty(faculty) {
    const facultyList = this.getFaculty();
    faculty.id = Date.now();
    faculty.createdAt = new Date().toISOString();
    facultyList.push(faculty);
    localStorage.setItem(this.KEYS.FACULTY, JSON.stringify(facultyList));
    return { success: true, message: "Faculty added successfully!", faculty };
  },

  /**
   * Update faculty
   */
  updateFaculty(id, updates) {
    const facultyList = this.getFaculty();
    const index = facultyList.findIndex((f) => f.id === id);
    if (index !== -1) {
      facultyList[index] = { ...facultyList[index], ...updates };
      localStorage.setItem(this.KEYS.FACULTY, JSON.stringify(facultyList));
      return { success: true, message: "Faculty updated successfully!" };
    }
    return { success: false, message: "Faculty not found." };
  },

  /**
   * Delete faculty
   */
  deleteFaculty(id) {
    const facultyList = this.getFaculty().filter((f) => f.id !== id);
    localStorage.setItem(this.KEYS.FACULTY, JSON.stringify(facultyList));
    return { success: true, message: "Faculty deleted successfully!" };
  },

  /**
   * Search faculty
   */
  searchFaculty(query, filters = {}) {
    let facultyList = this.getFaculty();

    if (query) {
      query = query.toLowerCase();
      facultyList = facultyList.filter(
        (f) =>
          (f.firstName && f.firstName.toLowerCase().includes(query)) ||
          (f.lastName && f.lastName.toLowerCase().includes(query)) ||
          (f.facultyId && f.facultyId.toLowerCase().includes(query)) ||
          (f.department && f.department.toLowerCase().includes(query)),
      );
    }

    if (filters.department) {
      facultyList = facultyList.filter(
        (f) => f.department === filters.department,
      );
    }

    return facultyList;
  },

  // ==================== NBA DATA ====================

  /**
   * Get NBA data for specific criteria (from localStorage or Supabase)
   */
  getNBAData(criteria) {
    const allData = JSON.parse(
      localStorage.getItem(this.KEYS.NBA_DATA) || "{}",
    );
    return allData[criteria] || [];
  },

  /**
   * Get NBA data from Supabase
   */
  async getNBADataFromSupabase(criteria) {
    try {
      const response = await supabaseRequest(
        "/rest/v1/nba_data?criteria=eq." +
          encodeURIComponent(criteria) +
          "&order=created_at.desc",
        "GET",
      );

      if (response.ok && response.data) {
        const parsedData = response.data.map((item) => ({
          ...JSON.parse(item.data || "{}"),
          id: item.id,
          createdAt: item.created_at,
        }));

        // Update localStorage cache
        const allData = JSON.parse(
          localStorage.getItem(this.KEYS.NBA_DATA) || "{}",
        );
        allData[criteria] = parsedData;
        localStorage.setItem(this.KEYS.NBA_DATA, JSON.stringify(allData));

        return parsedData;
      }
    } catch (error) {
      console.error("Failed to fetch NBA data:", error);
    }
    return this.getNBAData(criteria);
  },

  /**
   * Save NBA data for specific criteria
   */
  saveNBAData(criteria, data) {
    const allData = JSON.parse(
      localStorage.getItem(this.KEYS.NBA_DATA) || "{}",
    );

    // Check if editing existing or new entry
    if (data.id && typeof data.id === "number") {
      // Update existing in localStorage
      const index = allData[criteria]?.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        allData[criteria][index] = data;
      }
    } else {
      // Add new
      data.id = Date.now();
      data.createdAt = new Date().toISOString();
      if (!allData[criteria]) {
        allData[criteria] = [];
      }
      allData[criteria].push(data);
    }

    localStorage.setItem(this.KEYS.NBA_DATA, JSON.stringify(allData));

    // Also save to Supabase (async, non-blocking)
    this.saveNBADataToSupabase(criteria, data).catch(console.error);

    return { success: true, message: "Data saved successfully!", data };
  },

  /**
   * Save NBA data to Supabase
   */
  async saveNBADataToSupabase(criteria, data) {
    try {
      const nbaData = {
        criteria: criteria,
        data: JSON.stringify(data),
        academic_year: data.academicYear || new Date().getFullYear().toString(),
        created_at: new Date().toISOString(),
      };

      const response = await supabaseRequest(
        "/rest/v1/nba_data",
        "POST",
        nbaData,
      );
      return { success: response.ok, data: response.data };
    } catch (error) {
      console.error("Failed to save to Supabase:", error);
      return { success: false, error: error.message };
    }
  },

  /**
   * Delete NBA data entry
   */
  deleteNBAData(criteria, id) {
    const allData = JSON.parse(
      localStorage.getItem(this.KEYS.NBA_DATA) || "{}",
    );
    if (allData[criteria]) {
      allData[criteria] = allData[criteria].filter((item) => item.id !== id);
      localStorage.setItem(this.KEYS.NBA_DATA, JSON.stringify(allData));
    }
    return { success: true, message: "Data deleted successfully!" };
  },

  /**
   * Get all NBA data
   */
  getAllNBAData() {
    return JSON.parse(localStorage.getItem(this.KEYS.NBA_DATA) || "{}");
  },

  // ==================== UTILITY ====================

  /**
   * Get unique batches
   */
  getUniqueBatches() {
    const students = this.getStudents();
    return [...new Set(students.map((s) => s.batch).filter(Boolean))].sort();
  },

  /**
   * Get unique academic years
   */
  getUniqueAcademicYears() {
    const students = this.getStudents();
    return [
      ...new Set(
        students.map((s) => s.academicYear || s.academic_year).filter(Boolean),
      ),
    ]
      .sort()
      .reverse();
  },

  /**
   * Get unique departments
   */
  getUniqueDepartments() {
    const faculty = this.getFaculty();
    return [
      ...new Set(faculty.map((f) => f.department).filter(Boolean)),
    ].sort();
  },

  /**
   * Export all data as JSON
   */
  exportData() {
    return {
      students: this.getStudents(),
      faculty: this.getFaculty(),
      nbaData: this.getAllNBAData(),
      exportedAt: new Date().toISOString(),
    };
  },

  /**
   * Import data from JSON
   */
  importData(data) {
    if (data.students) {
      localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify(data.students));
    }
    if (data.faculty) {
      localStorage.setItem(this.KEYS.FACULTY, JSON.stringify(data.faculty));
    }
    if (data.nbaData) {
      localStorage.setItem(this.KEYS.NBA_DATA, JSON.stringify(data.nbaData));
    }
    return { success: true, message: "Data imported successfully!" };
  },

  /**
   * Clear all data
   */
  clearAllData() {
    localStorage.removeItem(this.KEYS.STUDENTS);
    localStorage.removeItem(this.KEYS.FACULTY);
    localStorage.removeItem(this.KEYS.NBA_DATA);
    this.init();
    return { success: true, message: "All data cleared!" };
  },
};

// Initialize on load
Storage.init();
