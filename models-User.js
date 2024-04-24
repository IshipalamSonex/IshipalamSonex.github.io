// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    carWashName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postalCode: {
        type: String,
        required: true
    },
    image: String,
    firstName: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    city: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
