const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Endpoint to send congratulations email
app.post('/send-congratulations-email', (req, res) => {
  const { email } = req.body;

  // Create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kawashwithus@gmail.com',
      pass: 'Qhawelihle1@'
    }
  });

  // Email options
  const mailOptions = {
    from: 'kawashwithus@gmail.com',
    to: email,
    subject: 'Congratulations on completing a period!',
    text: 'Congratulations! You have completed a period in the car wash system.'
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Failed to send email');
    } else {
      console.log('Congratulations email sent successfully:', info.response);
      res.status(200).send('Congratulations email sent successfully');
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
