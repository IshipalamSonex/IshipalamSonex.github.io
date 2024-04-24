// Initialize an empty array for timeSlots
const timeSlots = [];

// Function to update localStorage with availability data
function updateLocalStorage() {
    localStorage.setItem('availabilityData', JSON.stringify(timeSlots));
}

// Function to create booking containers based on availability data
function createBookingContainers() {
    // ...
    availabilitySwitch.addEventListener('change', () => {
        slot.available = availabilitySwitch.checked;
        updateLocalStorage(); // Update local storage when availability is toggled
    });
    // ...
}

// Generate time slots and create booking containers
createBookingContainers();

// Initialize localStorage with default availability data
updateLocalStorage();
