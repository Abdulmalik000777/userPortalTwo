-- Create a new database named 'userPortalTwo'
CREATE DATABASE IF NOT EXISTS userPortalTwo;

-- Use the new database
USE userPortalTwo;

-- Create the 'users' table with the required structure
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    last_login TIMESTAMP NULL,  -- last login timestamp, can be NULL initially
    status ENUM('active', 'blocked') DEFAULT 'active',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Verify the structure of the users table
DESCRIBE users;

-- Insert sample data for testing
INSERT INTO users (name, email, password, last_login, status)
VALUES 
    ('Alice Johnson', 'alice@example.com', 'password123', NULL, 'active'),
    ('Bob Smith', 'bob@example.com', 'password123', NULL, 'blocked'),
    ('Charlie Brown', 'charlie@example.com', 'password123', NULL, 'active');

-- Query users, ordered by the last_login timestamp
SELECT * FROM users ORDER BY last_login DESC;
