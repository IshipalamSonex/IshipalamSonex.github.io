// Define global variables
let returnBookingsData = []; // Variable to store return bookings
let qualifiedCustomers = []; // Variable to store qualified customers
const requiredReturnCount = 4; // Number of returns required to qualify for funeral cover

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

    filterQualifiedCustomers();
    displayQualifiedCustomers();
}

// Function to filter qualified customers
function filterQualifiedCustomers() {
    qualifiedCustomers = returnBookingsData.filter(returnBooking => {
        return returnBooking.items.length >= requiredReturnCount;
    });
}

// Function to display qualified customers
function displayQualifiedCustomers() {
    const qualifiedCustomersContainer = document.getElementById("qualified-customers");
    qualifiedCustomersContainer.innerHTML = ""; // Clear previous qualified customers

    qualifiedCustomers.forEach(customer => {
        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = `${customer.customer.name} ${customer.customer.surname}`;
        row.appendChild(nameCell);

        const plateCell = document.createElement("td");
        plateCell.textContent = customer.items.map(item => item.plate).join(", ");
        row.appendChild(plateCell);

        const returnDateCell = document.createElement("td");
        returnDateCell.textContent = customer.items.map(item => item.returnDate).join(", ");
        row.appendChild(returnDateCell);

        qualifiedCustomersContainer.appendChild(row);
    });

    // Check and send alerts
    checkAndSendAlerts();
}

// Function to check and send alerts
function checkAndSendAlerts() {
    qualifiedCustomers.forEach(customer => {
        // Logic to send alerts to customer, user, and back office
        // This part will be handled by the backend code in a real-world scenario
        // For demonstration purposes, we'll just log a message here
        console.log(`Congratulations! ${customer.customer.name} ${customer.customer.surname} qualifies for funeral cover.`);
    });
}

// Call fetchReturnBookings function when the DOM is loaded
document.addEventListener("DOMContentLoaded", fetchReturnBookings);
