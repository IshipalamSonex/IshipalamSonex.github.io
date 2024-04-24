// server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/car-washer', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(bodyParser.json());

// Signup route
app.post('/signup', async (req, res) => {
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Create a new user instance with hashed password
        const newUser = new User({
            email: req.body.email,
            password: hashedPassword
            // Add additional user data fields here if needed
        });

        // Save the user to the database
        const savedUser = await newUser.save();
        
        // Return success response
        res.status(201).json({ message: "User created successfully", user: savedUser });
    } catch (err) {
        // Handle errors
        console.error('Error during signup:', err);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
