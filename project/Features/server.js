require('dotenv').config(); // ← must be first

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/send-welcome-email', async (req, res) => {
  const { name, email } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: 'Diaspire <team@diaspire.org>',
    to: email,
    subject: 'Welcome to Diaspire!',
    text: `Hi ${name},

Welcome to Diaspire! 🎉 We're thrilled to have you join our community of learners, dreamers, and changemakers.

Your mentee profile has been successfully created, and you're now one step closer to unlocking the guidance, support, and growth you deserve. Whether you're here to sharpen your skills, explore new paths, or connect with mentors who truly understand your goals — you've come to the right place.

Here’s what happens next:
✅ You’ll be matched with mentors aligned to your interests  
✅ You’ll gain access to exclusive resources and events  
✅ You’ll start building the future you’ve envisioned

If you ever need help or have questions, our team is here for you. Just reply to this email or reach out through your dashboard.

Let’s make this journey unforgettable.
— The Diaspire Team`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
