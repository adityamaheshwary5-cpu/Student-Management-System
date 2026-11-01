/**
 * controllers/studentController.js
 * 
 * Contains all business logic for CRUD operations on Students:
 * - Create a student (POST)
 * - Get all students (GET)
 * - Get single student by ID (GET)
 * - Update a student by ID (PUT)
 * - Delete a student by ID (DELETE)
 */

const mongoose = require('mongoose');
const Student = require('../models/Student');

// @desc    Create a new student
// @route   POST /api/students
// @access  Public
const createStudent = async (req, res) => {
  try {
    const { name, email, age, course } = req.body;

    // 1. Basic validation: ensure all required fields are provided
    if (!name || !email || !age || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, age, course',
      });
    }

    // 2. Check if a student with the same email already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // 3. Create student in the database
    const student = await Student.create({
      name,
      email,
      age,
      course,
    });

    // 4. Return success response with HTTP status 201 (Created)
    return res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: student,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // Generic server error
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Get all students
// @route   GET /api/students
// @access  Public
const getAllStudents = async (req, res) => {
  try {
    // Fetch all students from MongoDB, sorted by newest first
    const students = await Student.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Get a single student by ID
// @route   GET /api/students/:id
// @access  Public
const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Student ID format',
      });
    }

    const student = await Student.findById(id);

    // If student is not found
    if (!student) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Update a student by ID
// @route   PUT /api/students/:id
// @access  Public
const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Student ID format',
      });
    }

    // If updating email, check if another student is already using that email
    if (req.body.email) {
      const existingStudent = await Student.findOne({
        email: req.body.email,
        _id: { $ne: id }, // Exclude current student
      });

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Another student already uses this email address',
        });
      }
    }

    // Find student by ID and update with request body data
    // { new: true } returns the modified document rather than the original
    // { runValidators: true } runs schema validations on update
    const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

// @desc    Delete a student by ID
// @route   DELETE /api/students/:id
// @access  Public
const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Student ID format',
      });
    }

    // Find and delete the student document
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({
        success: false,
        message: `Student not found with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: deletedStudent,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server Error: ' + error.message,
    });
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
