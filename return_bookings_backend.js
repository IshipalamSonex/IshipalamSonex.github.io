const express = require('express');
const nodemailer = require('nodemailer');

const app = express();

// Configure nodemailer with your email service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_email_password'
    }
});

// Endpoint to send alert emails
app.post('/send-alert-email', (req, res) => {
    const { adminEmail, userEmail, customerEmail, customerName } = req.body;

    // Send email to admin
    transporter.sendMail({
        from: 'your_email@gmail.com',
        to: adminEmail,
        subject: 'New Funeral Cover Qualification',
        text: `A new customer (${customerName}) has qualified for funeral cover.`
    });

    // Send email to user
    transporter.sendMail({
        from: 'your_email@gmail.com',
        to: userEmail,
        subject: 'Congratulations! You Qualify for Funeral Cover',
        text: 'You have qualified for funeral cover. Contact us for more information.'
    });

    // Send email to customer
    transporter.sendMail({
        from: 'your_email@gmail.com',
        to: customerEmail,
        subject: 'Congratulations! You Qualify for Funeral Cover',
        text: 'You have qualified for funeral cover. Contact us for more information.'
    });

    res.status(200).json({ message: 'Emails sent successfully.' });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
