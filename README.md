User Portal Web Application
Overview
This project is a user management web application built with JavaScript (React), MySQL, and Express.js. It includes user registration, login, and authentication, along with a user management table with functionalities for blocking, unblocking, and deleting users. The application ensures the uniqueness of user emails at the database level and includes multiple selection checkboxes for users. The application is designed with responsive UI using Bootstrap.

Features
User Authentication:

Registration and login functionalities with validation.
Block and unblock user status management.
Only authenticated users can access the user management panel.
User Management Table:

Displays users with the following columns:
Selection checkbox (to select one or multiple users).
Name, email, last login time, and status (active/blocked).
Users can be blocked, unblocked, or deleted (including self-management).
Database Constraints:

A unique index is created on the email field in MySQL to ensure email uniqueness across the system.
The application checks if the user exists and is not blocked before making any server request, ensuring proper access control.
Front-end:

Built using React with a responsive interface powered by Bootstrap.
Displays a table with user data and a toolbar with actions for managing users.
Setup
Prerequisites
Node.js and npm installed.
MySQL database set up locally or remotely.
Create a .env file to store the environment variables for MySQL configuration.
Installation
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <project-directory>
Install dependencies:

bash
Copy code
npm install
Set up your MySQL database:

Create the database and user table.
Use the following SQL to create the users table with a unique email index:
sql
Copy code
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL,
  last_login TIMESTAMP,
  status ENUM('active', 'blocked') DEFAULT 'active',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
Configure .env file with the following variables:

env
Copy code
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=userPortal
DB_PORT=3306
Backend Deployment (Not yet completed):

The backend is not yet deployed but can be tested locally on your machine.
To start the server locally, run:
bash
Copy code
npm run server
Backend deployment is still pending and will be updated once deployed on a platform like Heroku, Render, or AWS.
Start the application:

bash
Copy code
npm start
The application will be running on http://localhost:3000.

Usage
Users can register and log in.
The Admin Panel (user management table) is only accessible to authenticated users.
The toolbar allows for blocking, unblocking, and deleting users.
Admins can also block/unblock themselves but can delete any user.
Deployment
Backend Deployment: The backend (Node.js server with Express) is not yet deployed. However, it can be run locally by starting the server as mentioned in the installation instructions.

Frontend Deployment: The frontend React application can be deployed to services like Vercel, Netlify, or Heroku for a live web app. Please ensure the backend API is configured properly to be connected with the deployed frontend.



Known Issues / To-Do
Backend Deployment Pending: The backend server is yet to be deployed to a live environment. It is currently set up to run locally for testing purposes.
Further Testing Needed: Some features such as user blocking and database interactions may require testing once the backend is deployed. The web pages are styled with the help of CSS not any framework.
This README reflects the current state of the project, including the incomplete backend deployment. You can update the sections once the backend is deployed and everything is ready for production. Let me know if you'd like to modify any specific details or add more information!







