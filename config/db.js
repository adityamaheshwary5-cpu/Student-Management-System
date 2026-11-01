/**
 * config/db.js
 * 
 * This file handles the connection to MongoDB Atlas using Mongoose.
 * It reads the database connection string from the environment variable (MONGO_URI).
 */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    // Check if the connection string exists in the .env file
    if (!mongoURI || mongoURI.trim() === '') {
      console.error('------------------------------------------------------------');
      console.error('ERROR: MONGO_URI is missing or empty in your .env file!');
      console.error('Please open .env and add your MongoDB Atlas connection string:');
      console.error('MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/studentDB?retryWrites=true&w=majority');
      console.error('------------------------------------------------------------');
      process.exit(1);
    }

    // Connect to MongoDB Atlas
    const conn = await mongoose.connect(mongoURI);

    console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // Exit process with failure code
    process.exit(1);
  }
};

module.exports = connectDB;
