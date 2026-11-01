/**
 * server.js
 * 
 * Entry point for the Student Management System Backend.
 * Initializes Express, loads environment variables, connects to MongoDB,
 * and sets up API routes.
 */

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const studentRoutes = require('./routes/studentRoutes');

// Initialize the Express app
const app = express();

// Connect to MongoDB Atlas Database
connectDB();

// Built-in Middleware
// 1. Parses incoming JSON request payloads (req.body)
app.use(express.json());
// 2. Parses incoming URL-encoded form data
app.use(express.urlencoded({ extended: false }));

// Root welcome route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Student Management System API',
    endpoints: {
      getAllStudents: 'GET /api/students',
      createStudent: 'POST /api/students',
      getStudentById: 'GET /api/students/:id',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
    },
  });
});

// Mount Student API Routes
app.use('/api/students', studentRoutes);

// Handle 404 (Not Found) for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? null : err.message,
  });
});

// Define server port
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Base URL: http://localhost:${PORT}`);
  console.log(`📚 API Endpoint: http://localhost:${PORT}/api/students`);
});
