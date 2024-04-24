// server.js
const express = require('express');
const mongoose = require('mongoose');
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
        // Create a new user instance
        const newUser = new User(req.body);
        // Save the user to the database
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
