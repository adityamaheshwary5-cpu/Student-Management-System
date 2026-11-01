/**
 * models/Student.js
 * 
 * Defines the Mongoose Schema and Model for the "Student" collection.
 * Mongoose schemas define the structure of the document, default values,
 * and data validators.
 */

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
      ],
    },
    age: {
      type: Number,
      required: [true, 'Student age is required'],
      min: [1, 'Age must be a positive number'],
      max: [120, 'Age cannot exceed 120'],
    },
    course: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
    },
  },
  {
    // Automatically adds createdAt and updatedAt fields
    timestamps: true,
  }
);

// Compile the schema into a Mongoose Model and export it
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
