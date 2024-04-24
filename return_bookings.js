// Define global variables
let returnBookingsData = []; // Variable to store return bookings
let filteredReturnBookings = []; // Variable to store filtered return bookings
let currentPage = 1;
const returnBookingsPerPage = 10; // Maximum number of return bookings per page

// Function to fetch return bookings
function fetchReturnBookings() {
    // Dummy data for demonstration
    returnBookingsData = [
        { 
            customer: { name: "John", surname: "Doe" },
            items: [
                { plate: "ABC123", returnDate: "2024-03-02" },
                // Add more items as needed
            ]
        },
        { 
            customer: { name: "Jane", surname: "Smith" },
            items: [
                { plate: "XYZ789", returnDate: "2024-03-05" },
                // Add more items as needed
            ]
        },
        // Add more return bookings as needed
    ];

    filterReturnBookings();
    applyPagination();
}

// Function to filter return bookings
function filterReturnBookings() {
    // Filter return bookings for the current month
    const currentMonth = new Date().getMonth() + 1; // Months are zero-based in JavaScript, so we add 1
    const currentYear = new Date().getFullYear();
    filteredReturnBookings = returnBookingsData.filter(returnBooking => {
        return returnBooking.items.some(item => {
            const returnDate = new Date(item.returnDate);
            return returnDate.getMonth() + 1 === currentMonth && returnDate.getFullYear() === currentYear;
        });
    });
}

// Function to apply pagination
function applyPagination() {
    // Display only 10 return bookings per page
    const startIdx = (currentPage - 1) * returnBookingsPerPage;
    const paginatedReturnBookings = filteredReturnBookings.slice(startIdx, startIdx + returnBookingsPerPage);
    displayReturnBookings(paginatedReturnBookings);
    renderPagination();
}

// Function to display return bookings
function displayReturnBookings(returnBookings) {
    const returnBookingsContainer = document.getElementById("return-bookings");
    returnBookingsContainer.innerHTML = ""; // Clear previous return bookings

    returnBookings.forEach(returnBooking => {
        const bookingDiv = document.createElement("div");
        bookingDiv.classList.add("booking");

        const customerInfo = `
            <div class="customer-info">
                <p class="customer-name">${returnBooking.customer.name} ${returnBooking.customer.surname}</p>
            </div>
        `;
        bookingDiv.innerHTML += customerInfo;

        const itemsList = document.createElement("ul");
        itemsList.classList.add("items-list");

        returnBooking.items.forEach(item => {
            const itemElement = document.createElement("li");
            itemElement.innerHTML = `
                <span class="plate-number">${item.plate}</span>
                <span class="return-date">Return Date: ${item.returnDate}</span>
            `;
            itemsList.appendChild(itemElement);
        });

        bookingDiv.appendChild(itemsList);

        returnBookingsContainer.appendChild(bookingDiv);
    });
}

// Function to render pagination
function renderPagination() {
    const totalPages = Math.ceil(filteredReturnBookings.length / returnBookingsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = `Pages: ${totalPages}`; // Display number of pages
}

// Call fetchReturnBookings function when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchReturnBookings);
