// Import required modules
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,  // Use DB_HOST from .env file
  user: process.env.DB_USER,  // Use DB_USER from .env file
  password: process.env.DB_PASSWORD,  // Use DB_PASSWORD from .env file
  database: process.env.DB_NAME,  // Use DB_NAME from .env file
  port: process.env.DB_PORT,  // Use DB_PORT from .env file
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL');
});

// WebSocket server
const wss = new WebSocket.Server({ port: 5001 }); // Use a different port to avoid conflict with HTTP server

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server response: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:5001');

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// API route to fetch users
app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching users' });
    }
    res.status(200).json({ users: results });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate user credentials
  db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error in database query' });
      }
      if (results.length > 0) {
        res.status(200).json({ message: 'Login successful', user: results[0] });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    }
  );
});

// Register route
app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  // Insert new user into the database
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error in database query' });
      }
      res.status(200).json({ message: 'Registration successful' });
    }
  );
});

// Start the HTTP server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
