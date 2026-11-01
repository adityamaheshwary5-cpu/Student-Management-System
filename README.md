# 🎓 Student Management System - Backend REST API

A complete, beginner-friendly **Student Management System** backend project built for B.Tech CSE college assignments using **Node.js**, **Express.js**, **MongoDB Atlas**, and **Mongoose**.

---

## 📑 Table of Contents
1. [Tech Stack](#-tech-stack)
2. [Project Folder Structure](#-project-folder-structure)
3. [Prerequisites](#-prerequisites)
4. [Step-by-Step Installation](#-step-by-step-installation)
5. [MongoDB Atlas Configuration Guide](#-mongodb-atlas-configuration-guide)
6. [Running the Application](#-running-the-application)
7. [API Endpoints Reference](#-api-endpoints-reference)
8. [Testing APIs with Postman](#-testing-apis-with-postman)
9. [Error Handling & Status Codes](#-error-handling--status-codes)
10. [Troubleshooting Common Issues](#-troubleshooting-common-issues)

---

## 💻 Tech Stack

- **Runtime Environment:** [Node.js](https://nodejs.org/)
- **Web Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud NoSQL Database)
- **Object Data Modeling (ODM):** [Mongoose](https://mongoosejs.com/)
- **Environment Management:** [dotenv](https://www.npmjs.com/package/dotenv)
- **Development Tool:** [nodemon](https://www.npmjs.com/package/nodemon) (automatic server restart)
- **API Testing:** [Postman](https://www.postman.com/)

---

## 📁 Project Folder Structure

```text
Backend-Tutorial/
│
├── config/
│   └── db.js                 # MongoDB Atlas connection logic using Mongoose
│
├── controllers/
│   └── studentController.js  # Business logic & CRUD operations for Students
│
├── models/
│   └── Student.js            # Mongoose Schema & Model definition for Student
│
├── routes/
│   └── studentRoutes.js      # Express routing mapping endpoints to controllers
│
├── .env                      # Secret environment variables (ignored in Git)
├── .env.example              # Example environment variable template
├── .gitignore                # Files and folders ignored by Git
├── package.json              # Project metadata, dependencies, and npm scripts
├── README.md                 # Complete project documentation and guide
└── server.js                 # Main server entry point
```

### Folder Explanations:
- **`config/db.js`**: Connects your Express application to the MongoDB Atlas cloud database.
- **`models/Student.js`**: Defines what data a Student document contains (`name`, `email`, `age`, `course`) and sets validation rules.
- **`controllers/studentController.js`**: Handles the actual incoming request data, interacts with the database, and sends back appropriate HTTP responses.
- **`routes/studentRoutes.js`**: Maps URLs (like `/api/students`) to controller functions based on HTTP methods (`GET`, `POST`, `PUT`, `DELETE`).
- **`server.js`**: The main entry point where Express starts, loads middleware, connects to the database, and listens on a port.

---

## ⚙️ Prerequisites

Before you begin, make sure you have the following installed on your computer:
1. **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
2. **Postman Desktop App** - [Download Postman](https://www.postman.com/downloads/)
3. A free account on **MongoDB Atlas** - [Sign up for MongoDB](https://www.mongodb.com/cloud/atlas/register)

---

## 🚀 Step-by-Step Installation

### 1. Open Terminal in the Project Directory
Open your terminal (PowerShell, Command Prompt, or VS Code terminal) and navigate to the project directory:
```bash
cd "C:\Users\Lenovo\OneDrive\Documents\Desktop\Backend-Tutorial"
```

### 2. Install Dependencies
All necessary packages are defined in `package.json`. Install them with:
```bash
npm install
```
This installs `express`, `mongoose`, `dotenv`, and developer tool `nodemon`.

---

## ☁️ MongoDB Atlas Configuration Guide

Follow these steps to create your free MongoDB Atlas database:

### Step 1: Create an Account & Cluster
1. Log in to [MongoDB Atlas](https://account.mongodb.com/).
2. Click **Create** or **Build a Database**.
3. Choose the **M0 Free** tier.
4. Select a provider (AWS) and a region closest to you (e.g., `Mumbai / ap-south-1`).
5. Click **Create Deployment**.

### Step 2: Create a Database User
1. In the **Security Quickstart** screen (or under **Security > Database Access**):
   - Choose **Username and Password**.
   - Enter a **Username** (e.g., `studentAdmin`).
   - Enter a secure **Password** (e.g., `MyPassword123` - avoid `@`, `:`, `/` or URL-encode them).
   - Click **Create Database User**.

### Step 3: Configure Network Access (IP Whitelist)
1. Go to **Security > Network Access** in the left sidebar.
2. Click **Add IP Address**.
3. Click **Allow Access from Anywhere** (`0.0.0.0/0`).
4. Click **Confirm**. *(This allows your local Node.js server to connect to Atlas without IP restriction issues).*

### Step 4: Get Your Connection String
1. Go to **Database > Clusters** in the left sidebar.
2. Click the **Connect** button on your cluster.
3. Select **Drivers** (Node.js).
4. Copy the connection string provided. It looks like:
   ```text
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

### Step 5: Update the `.env` File
1. Open the `.env` file in the root folder of this project.
2. Replace `<username>` and `<password>` with the credentials you created in Step 2.
3. Add the database name (e.g., `studentDB`) right before the `?` mark.
4. Your `.env` file should look like this:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://studentAdmin:MyPassword123@cluster0.xxxxx.mongodb.net/studentDB?retryWrites=true&w=majority
   ```
5. Save the `.env` file.

---

## ▶️ Running the Application

### Option A: Development Mode (Auto-reloads on file changes)
```bash
npm run dev
```

### Option B: Production Mode (Standard Node run)
```bash
npm start
```

### Expected Output in Terminal:
```text
🚀 Server is running on port 5000
📡 Base URL: http://localhost:5000
📚 API Endpoint: http://localhost:5000/api/students
✅ MongoDB Connected Successfully: cluster0-shard-00-00.xxxxx.mongodb.net
```

---

## 📡 API Endpoints Reference

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | API Welcome message & endpoint directory | None |
| **POST** | `/api/students` | Register a new student | JSON `{ name, email, age, course }` |
| **GET** | `/api/students` | Get list of all students | None |
| **GET** | `/api/students/:id` | Get details of a single student by ID | None |
| **PUT** | `/api/students/:id` | Update an existing student | JSON (fields to update) |
| **DELETE** | `/api/students/:id` | Delete a student by ID | None |

---

## 🧪 Testing APIs with Postman

Open the **Postman** application and follow the steps below for each API:

### 1. Create a Student (POST)
- **Method:** `POST`
- **URL:** `http://localhost:5000/api/students`
- **Headers:**
  - Key: `Content-Type`
  - Value: `application/json`
- **Body:** Select **raw** and set type to **JSON**:
  ```json
  {
    "name": "Rahul Sharma",
    "email": "rahul.sharma@example.com",
    "age": 20,
    "course": "B.Tech Computer Science"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "success": true,
    "message": "Student registered successfully",
    "data": {
      "_id": "6724a8f9...",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@example.com",
      "age": 20,
      "course": "B.Tech Computer Science",
      "createdAt": "2026-11-01T17:15:00.000Z",
      "updatedAt": "2026-11-01T17:15:00.000Z",
      "__v": 0
    }
  }
  ```
> 💡 **Tip:** Copy the `_id` from this response. You will need it for the GET by ID, PUT, and DELETE requests!

---

### 2. Get All Students (GET)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students`
- **Body:** None
- **Response:** `200 OK`
  ```json
  {
    "success": true,
    "count": 1,
    "data": [
      {
        "_id": "6724a8f9...",
        "name": "Rahul Sharma",
        "email": "rahul.sharma@example.com",
        "age": 20,
        "course": "B.Tech Computer Science",
        "createdAt": "2026-11-01T17:15:00.000Z",
        "updatedAt": "2026-11-01T17:15:00.000Z"
      }
    ]
  }
  ```

---

### 3. Get Single Student by ID (GET)
- **Method:** `GET`
- **URL:** `http://localhost:5000/api/students/<STUDENT_ID>` *(replace with the actual `_id`)*
  - Example: `http://localhost:5000/api/students/6724a8f9...`
- **Body:** None
- **Response:** `200 OK`
  ```json
  {
    "success": true,
    "data": {
      "_id": "6724a8f9...",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@example.com",
      "age": 20,
      "course": "B.Tech Computer Science"
    }
  }
  ```

---

### 4. Update Student Details (PUT)
- **Method:** `PUT`
- **URL:** `http://localhost:5000/api/students/<STUDENT_ID>`
  - Example: `http://localhost:5000/api/students/6724a8f9...`
- **Headers:** `Content-Type: application/json`
- **Body:** raw -> JSON:
  ```json
  {
    "age": 21,
    "course": "B.Tech CSE - AI & ML"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "success": true,
    "message": "Student updated successfully",
    "data": {
      "_id": "6724a8f9...",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@example.com",
      "age": 21,
      "course": "B.Tech CSE - AI & ML"
    }
  }
  ```

---

### 5. Delete a Student (DELETE)
- **Method:** `DELETE`
- **URL:** `http://localhost:5000/api/students/<STUDENT_ID>`
  - Example: `http://localhost:5000/api/students/6724a8f9...`
- **Body:** None
- **Response:** `200 OK`
  ```json
  {
    "success": true,
    "message": "Student deleted successfully",
    "data": {
      "_id": "6724a8f9...",
      "name": "Rahul Sharma",
      "email": "rahul.sharma@example.com"
    }
  }
  ```

---

## 🛡️ Error Handling & Status Codes

This project implements standard HTTP response codes:
- **`200 OK`**: Request succeeded (GET, PUT, DELETE).
- **`201 Created`**: New student created successfully (POST).
- **`400 Bad Request`**: Validation failed (e.g. missing fields, invalid email format, duplicate email, invalid ID format).
- **`404 Not Found`**: Student with given ID does not exist or URL endpoint is incorrect.
- **`500 Internal Server Error`**: Unexpected server or database error.

---

## 🔧 Troubleshooting Common Issues

### 1. `MongooseServerSelectionError: connect ECONNREFUSED` or Timeout
- **Cause:** MongoDB Atlas Network Access is not allowing your IP.
- **Fix:** Go to MongoDB Atlas > **Network Access** > Click **Add IP Address** > Choose **Allow Access From Anywhere (`0.0.0.0/0`)** > Save.

### 2. `MongoServerError: bad auth : Authentication failed`
- **Cause:** Incorrect username or password in `.env`.
- **Fix:** Double-check your MongoDB Atlas Database User credentials in **Database Access**. If your password contains special characters (like `@`, `#`), change it to an alphanumeric password or URL-encode special characters.

### 3. `Port 5000 is already in use`
- **Cause:** Another process is running on port 5000.
- **Fix:** In `.env`, change `PORT=5000` to `PORT=5001` or another open port.
