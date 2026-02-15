/**
 * Storage Module - Handles all data persistence using localStorage
 * This replaces the PHP/MySQL backend for Vercel static deployment
 */

const Storage = {
  // Keys for localStorage
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
    // Initialize users with demo account
    if (!localStorage.getItem(this.KEYS.USERS)) {
      const defaultUsers = [
        {
          id: 1,
          name: "Demo User",
          email: "demo@example.com",
          password: "demo123",
        },
      ];
      localStorage.setItem(this.KEYS.USERS, JSON.stringify(defaultUsers));
    }

    // Initialize empty arrays for other data
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
   * Set user after login from backend
   */
  setUser(user) {
    localStorage.setItem(this.KEYS.CURRENT_USER, JSON.stringify(user));
  },

  /**
   * Login user
   */
  login(email, password) {
    const users = JSON.parse(localStorage.getItem(this.KEYS.USERS) || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      localStorage.setItem(
        this.KEYS.CURRENT_USER,
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      );
      return { success: true, message: "Login successful!" };
    }
    return { success: false, message: "Invalid email or password." };
  },

  /**
   * Register new user
   */
  register(name, email, password) {
    const users = JSON.parse(localStorage.getItem(this.KEYS.USERS) || "[]");

    // Check if email exists
    if (users.find((u) => u.email === email)) {
      return { success: false, message: "Email already registered." };
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };
    users.push(newUser);
    localStorage.setItem(this.KEYS.USERS, JSON.stringify(users));

    return { success: true, message: "Registration successful! Please login." };
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem(this.KEYS.CURRENT_USER);
  },

  // ==================== STUDENTS ====================

  /**
   * Get all students
   */
  getStudents() {
    return JSON.parse(localStorage.getItem(this.KEYS.STUDENTS) || "[]");
  },

  /**
   * Add student
   */
  addStudent(student) {
    const students = this.getStudents();
    student.id = Date.now();
    student.createdAt = new Date().toISOString();
    students.push(student);
    localStorage.setItem(this.KEYS.STUDENTS, JSON.stringify(students));
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
          s.firstName.toLowerCase().includes(query) ||
          s.lastName.toLowerCase().includes(query) ||
          s.grNo.toLowerCase().includes(query) ||
          s.enrollmentNo.toLowerCase().includes(query),
      );
    }

    if (filters.batch) {
      students = students.filter((s) => s.batch === filters.batch);
    }
    if (filters.academicYear) {
      students = students.filter(
        (s) => s.academicYear === filters.academicYear,
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
          f.firstName.toLowerCase().includes(query) ||
          f.lastName.toLowerCase().includes(query) ||
          f.facultyId.toLowerCase().includes(query) ||
          f.department.toLowerCase().includes(query),
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
   * Get NBA data for specific criteria
   */
  getNBAData(criteria) {
    const allData = JSON.parse(
      localStorage.getItem(this.KEYS.NBA_DATA) || "{}",
    );
    return allData[criteria] || [];
  },

  /**
   * Save NBA data for specific criteria
   */
  saveNBAData(criteria, data) {
    const allData = JSON.parse(
      localStorage.getItem(this.KEYS.NBA_DATA) || "{}",
    );

    // Check if editing existing or new entry
    if (data.id) {
      // Update existing
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
    return { success: true, message: "Data saved successfully!", data };
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
    return [...new Set(students.map((s) => s.academicYear).filter(Boolean))]
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
