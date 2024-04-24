const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Sample data for bookings
let bookings = [
    { date: '2024-04-15', bookings: 10 },
    { date: '2024-04-16', bookings: 15 },
    { date: '2024-04-17', bookings: 20 }
];

// API endpoint to get booking data
app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});

// API endpoint to add a new booking
app.post('/api/bookings', express.json(), (req, res) => {
    const newBooking = req.body;
    bookings.push(newBooking);
    res.status(201).json(newBooking);

    // Send socket.io message to update the dashboard
    io.emit('bookingAdded', newBooking);
});

// API endpoint to update an existing booking
app.put('/api/bookings/:date', express.json(), (req, res) => {
    const date = req.params.date;
    const updatedBooking = req.body;
    const index = bookings.findIndex(booking => booking.date === date);
    if (index !== -1) {
        bookings[index] = updatedBooking;
        res.json(updatedBooking);

        // Send socket.io message to update the dashboard
        io.emit('bookingUpdated', updatedBooking);
    } else {
        res.status(404).json({ error: 'Booking not found' });
    }
});

// API endpoint to delete an existing booking
app.delete('/api/bookings/:date', (req, res) => {
    const date = req.params.date;
    const index = bookings.findIndex(booking => booking.date === date);
    if (index !== -1) {
        bookings.splice(index, 1);
        res.status(204).end();

        // Send socket.io message to update the dashboard
        io.emit('bookingDeleted', { date });

    } else {
        res.status(404).json({ error: 'Booking not found' });
    }
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Socket.io integration
const socketIo = require('socket.io');
const io = socketIo(server);
