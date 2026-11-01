/**
 * routes/studentRoutes.js
 * 
 * Maps HTTP methods and endpoint paths to the controller functions.
 */

const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} = require('../controllers/studentController');

// Route: /api/students
// - GET: Fetch all students
// - POST: Register a new student
router.route('/')
  .get(getAllStudents)
  .post(createStudent);

// Route: /api/students/:id
// - GET: Fetch a single student by MongoDB ID
// - PUT: Update a student's information by MongoDB ID
// - DELETE: Remove a student by MongoDB ID
router.route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .delete(deleteStudent);

module.exports = router;
