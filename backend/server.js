// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Import the cookie-parser library

const app = express();
const port = 5000;

const SECRET_KEY = '288c2e4187c38a7132a0e7717a8d29b4d3d7614d7204416a9f18b7d765f538866cb41c4d20b18f96ba3e755ea2d14625';

// Sample user data (Replace this with data from your database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$K8IRHTzzyKJW9FE2C5Yvo.bH2F8kC/G4JBJiwzKinCwZuSxSCfeL.', // "password"
  },
];

app.use(bodyParser.json());
app.use(cookieParser()); // Use cookie-parser middleware
app.use(cors());

function verifyToken(req, res, next) {
  const token = req.cookies.token; // Read token from cookie

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

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    // Successful login

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '48h' });

    // Set the token in a cookie with the name "token", expires in 48 hours
    res.cookie('token', token, { httpOnly: true, maxAge: 48 * 3600000 }); // 48 hours in milliseconds


    // Send a success message
    res.status(200).json({ message: 'Login successful', user: { username: user.username } });
  } else {
    // Invalid credentials
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.get('/api/protected', verifyToken, (req, res) => {
  // Only authorized users can access this route
  res.status(200).json({ message: 'Protected route accessed successfully' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
