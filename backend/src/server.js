const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
const port = 5000;

// Sample user data (Replace this with data from your database)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$K8IRHTzzyKJW9FE2C5Yvo.bH2F8kC/G4JBJiwzKinCwZuSxSCfeL.', // "password"
  },
];

app.use(bodyParser.json());
app.use(cors());

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find((user) => user.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    // Successful login
    res.status(200).json({ message: 'Login successful' });
  } else {
    // Invalid credentials
    res.status(401).json({ error: 'Invalid username or password' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
