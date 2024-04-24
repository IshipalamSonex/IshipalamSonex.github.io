document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const readingHistory = document.getElementById('readingHistory');
    const datePickers = document.getElementById('datePickers');
    const meterReadingForm = document.getElementById('meterReadingForm');

    flatpickr("#startDate", {
        dateFormat: "Y-m-d",
        clickOpens: true,
        onChange: function(selectedDates, dateStr) {
            console.log("Start Date Selected:", dateStr);
        }
    });

    flatpickr("#endDate", {
        dateFormat: "Y-m-d",
        clickOpens: true,
        onChange: function(selectedDates, dateStr) {
            console.log("End Date Selected:", dateStr);
        }
    });

    // Define the toggleNavbar() function
    function toggleNavbar() {
        navbar.classList.toggle('show');
    }

    function toggleHistory() {
        readingHistory.classList.toggle('show');
        datePickers.classList.remove('show');
    }

    function toggleDatePickers() {
        datePickers.classList.toggle('show');
        readingHistory.classList.remove('show');
    }

    function confirmReading() {
        var readingValue = document.getElementById('reading').value;
        var confirmationMessage = "Confirm Meter Reading\n\nAre you sure you want to proceed with this number: " + readingValue + "?";
        return confirm(confirmationMessage);
    }

    // Add event listener for form submission
    meterReadingForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Get the reading value from the input field
        const readingValue = document.getElementById('reading').value;

        // Perform any necessary validation here
        if (readingValue.trim() === '') {
            alert('Please enter a valid reading value.');
            return;
        }

        // If validation passes, you can proceed with form submission
        // You may perform AJAX requests or handle form submission here
        // For demonstration purposes, let's display an alert
        alert('Reading logged successfully: ' + readingValue);

        // Optionally, you can reset the form after submission
        meterReadingForm.reset();
    });
});
