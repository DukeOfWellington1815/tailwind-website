const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = 5000;

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database.');
});

const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Login route - Fetch users from the database
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to get the user
  const query = 'SELECT * FROM users WHERE username = ?';
  connection.query(query, [username], (error, results) => {
    if (error) {
      console.error('Error fetching user from the database:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    const user = results[0]; // Get the first user (assuming username is unique)

    if (user && bcrypt.compareSync(password, user.password)) {
      // Successful login

      // Generate a JWT token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '48h' });

      // Set the token in a cookie with the name "token", expires in 48 hours
      res.cookie('token', token, { httpOnly: true, maxAge: 48 * 3600000 });

      // Send a success message
      res.status(200).json({ message: 'Login successful', user: { username: user.username } });
    } else {
      // Invalid credentials
      res.status(401).json({ error: 'Invalid username or password' });
    }
  });
});

// Retrieve abstracts from the database and post as JSON in the protected route
app.get('/api/protected', verifyToken, (req, res) => {
  // Only authorized users can access this route

  // Query the database to get the abstracts
  const query = 'SELECT title, body FROM abstracts';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching abstracts from the database:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    // Send the abstracts as JSON
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
