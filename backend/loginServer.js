const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
require('dotenv').config();

const app = express();
const port = 5000;

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: 10
});

const SECRET_KEY = process.env.SECRET_KEY;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

function verifyToken(req, res, next) {
  const token = req.headers.authorization;

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

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM users WHERE username = ?';
  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error getting database connection:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    connection.query(query, [username], (error, results) => {
      connection.release();

      if (error) {
        console.error('Error fetching user from the database:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      const user = results[0];

      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '48h' });
        res.status(200).json({ token, message: 'Login successful', user: { username: user.username } });
      } else {
        res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });
});

app.get('/api/abstracts', verifyToken, (req, res) => {
  const query = `
    SELECT
      a.id,
      a.title,
      a.slogan,
      i.imagepath,
      a.body,
      ac.role AS collaborator_role,
      a.type,
      a.role AS own_role,
      a.year
    FROM Abstracts a
    LEFT JOIN Images i ON a.id = i.abstract_id
    LEFT JOIN AbstractCollaborators ac ON a.id = ac.abstract_id
    LEFT JOIN Collaborators c ON ac.collaborator_id = c.id
  `;

  pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error getting database connection:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }

    connection.query(query, (error, results) => {
      connection.release();

      if (error) {
        console.error('Error fetching abstracts from the database:', error);
        return res.status(500).json({ error: 'Internal server error' });
      }

      res.status(200).json(results);
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
