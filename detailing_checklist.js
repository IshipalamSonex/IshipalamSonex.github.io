document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM content loaded");

    // Get the form element
    var form = document.getElementById("carWashForm");

    // Add event listener for form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        
        // Get form data
        var formData = new FormData(form);

        // You can perform further actions here, such as sending form data to a server using AJAX
        // For demonstration purposes, let's log the form data to the console
        console.log("Form data:", formData);

        // Clear the form after submission
        form.reset();
    });

    // Get the canvas element
    var canvas = document.querySelector(".signature-container canvas");

    // Check if the canvas element exists
    if (canvas) {
        // Get the 2D drawing context
        var ctx = canvas.getContext("2d");

        // Your further canvas drawing logic can go here
    }

    // Function to handle form submission
    function submitForm() {
        // Get form data
        var customerName = document.getElementById("customerName").value;
        var customerEmail = document.getElementById("customerEmail").value;
        var backOfficeUser = "backoffice@example.com"; // Replace with actual back office user

        // Send email to standard recipient
        var standardEmail = "kawashwithus@gmail.com";
        sendEmail(standardEmail, "Standard Email", customerName, customerEmail);
        // Send email to customer
        sendEmail(customerEmail, "Customer Email", customerName);
        // Send email to back office user
        sendEmail(backOfficeUser, "Back Office User", customerName);

        alert("Form submitted successfully!");
    }

    // Function to send emails
    function sendEmail(recipient, type, customerName, customerEmail) {
        // Dummy function to simulate sending emails (replace with actual email sending logic)
        console.log(`Sending ${type} email to ${recipient}`);
        console.log(`Customer Name: ${customerName}`);
        if (customerEmail) {
            console.log(`Customer Email: ${customerEmail}`);
        }
    }
});
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware for parsing application/json
app.use(bodyParser.json());

// Route for handling form submission and sending emails
app.post('/send-emails', (req, res) => {
    const { customerName, customerEmail, message } = req.body;

    // Send email to kawashwithus@gmail.com
    sendEmail('kawashwithus@gmail.com', 'Car Wash Form Submission', message);

    // Send email to the dashboard user (car wash owner)
    sendEmail('dashboarduser@example.com', 'Car Wash Form Submission', message);

    // Send email to the customer
    sendEmail(customerEmail, 'Car Wash Form Submission Confirmation', 'Thank you for submitting the form.');

    res.sendStatus(200);
});

// Function to send email using Nodemailer
function sendEmail(recipient, subject, body) {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your_email@gmail.com', // Replace with your Gmail email
            pass: 'your_password' // Replace with your Gmail password
        }
    });

    const mailOptions = {
        from: 'your_email@gmail.com',
        to: recipient,
        subject: subject,
        text: body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
