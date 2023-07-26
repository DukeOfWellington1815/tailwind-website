// index.js (Backend server)

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5001;

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
app.use(express.json());

// POST route to handle contact form submissions
app.post('/api/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email message configuration
  const mailOptions = {
    from: email,
    to: 'lfl135588@stud.gibb.ch', // Replace with the recipient's email address
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'An error occurred while sending the email' });
    }

    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
