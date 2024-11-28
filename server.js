const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const WebSocket = require('ws'); // Move this to the correct place

const app = express();
const port = 5000;

// Enable CORS for all origins (you can restrict this in production)
app.use(cors());

// Parse JSON bodies
app.use(bodyParser.json());

// MySQL connection with provided credentials
const db = mysql.createConnection({
  host: 'localhost', // or your host if it's not localhost
  user: 'root',       // or your MySQL username if different
  password: 'abdulmalik99',  // your password
  database: 'userPortalTwo', // make sure this matches your database name
  port: 3306           // default MySQL port, use if necessary
});

// Create a WebSocket server
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

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Server is running!');
});

// Login route (this needs to handle POST requests)
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

// Register route (new route to handle user registration)
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
  console.log(`HTTP server running at http://localhost:${port}`);
});
