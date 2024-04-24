const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

// Sample meter readings data
const meterReadings = [
    { dateTime: '2024-04-01 10:00', place: 'Place A', reading: 100 },
    { dateTime: '2024-04-02 11:00', place: 'Place B', reading: 150 },
    { dateTime: '2024-04-03 12:00', place: 'Place C', reading: 200 },
    // Add more sample data as needed
];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle fetching readings between selected dates
app.get('/readings', (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    
    // Filter readings between selected dates
    const filteredReadings = meterReadings.filter(reading => {
        const readingDate = new Date(reading.dateTime);
        return readingDate >= new Date(startDate) && readingDate <= new Date(endDate);
    });
    
    res.json(filteredReadings);
});

// Route to handle receiving new meter readings
app.post('/readings', (req, res) => {
    const newReading = req.body;
    meterReadings.push(newReading);
    res.status(201).json(newReading);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
