document.addEventListener("DOMContentLoaded", function () {
    initializeDatepicker();
    fetchBookings(); // Call fetchBookings function when the DOM is loaded
});

function initializeDatepicker() {
    var picker = new Pikaday({ 
        field: document.getElementById('filter'),
        onSelect: applyFilter // Call applyFilter function when date is selected
    });
}

let bookingsData = []; // Variable to store all bookings
const bookingsPerPage = 10; // Maximum number of bookings per page

function fetchBookings() {
    // Dummy data for demonstration
    bookingsData = [
        { name: 'HATCHBACK WASH & GO', date: '2024-04-15', time: '10:00 AM', price: '70.00' },
        { name: 'HATCHBACK WASH & SHINE', date: '2024-04-15', time: '11:00 AM', price: '90.00' },
        { name: 'SEDAN WASH & GO', date: '2024-04-16', time: '09:00 AM', price: '70.00' },
        { name: 'SEDAN WASH & SHINE', date: '2024-04-16', time: '11:00 AM', price: '90.00' },
        { name: 'TAXI WASH & GO', date: '2024-04-17', time: '08:00 AM', price: '90.00' },
        { name: 'TAXI WASH & SHINE', date: '2024-04-17', time: '12:00 PM', price: '110.00' },
        { name: 'VAN WASH & GO', date: '2024-04-18', time: '10:00 AM', price: '90.00' },
        { name: 'VAN WASH & SHINE', date: '2024-04-18', time: '11:00 AM', price: '110.00' }
        // Add more booking data as needed
    ];

    renderBookingsTable(bookingsData);
}

function renderBookingsTable(bookings) {
    var bookingBody = document.getElementById('bookingBody');
    bookingBody.innerHTML = ''; // Clear previous content

    bookings.forEach(function(booking) {
        var row = document.createElement('tr');
        row.innerHTML = '<td>' + booking.name + '</td>' +
                        '<td>' + booking.date + '</td>' +
                        '<td>' + booking.time + '</td>' +
                        '<td>R ' + booking.price + '</td>'; // Include the Rand symbol here
        bookingBody.appendChild(row);
    });
}

function applyFilter(selectedDate) {
    var filteredBookings = bookingsData.filter(function(booking) {
        return booking.date === selectedDate;
    });
    renderBookingsTable(filteredBookings);
}

function resetFilter() {
    document.getElementById('filter').value = '';
    renderBookingsTable(bookingsData);
}

function applySort() {
    var sortType = document.getElementById('sort').value;
    var sortedBookings = bookingsData.slice(); // Create a copy of bookings data

    if (sortType === 'asc') {
        sortedBookings.sort(function(a, b) {
            return new Date(a.date) - new Date(b.date);
        });
    } else if (sortType === 'desc') {
        sortedBookings.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    }

    renderBookingsTable(sortedBookings);
}
