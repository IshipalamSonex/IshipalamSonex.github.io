// Initialize variables for stock purchases and car bookings
let stockPurchases = 0;
let carBookings = 0;

// Function to update the water level based on stock purchases and car bookings
function updateWaterLevel() {
  const liquid = document.querySelector('.liquid');

  // Calculate the total progress based on stock purchases and car bookings
  const totalProgress = (stockPurchases * 360 + carBookings * 30) / 360;

  // Set the height of the liquid based on totalProgress
  // You may adjust the multiplier to achieve the desired effect
  liquid.style.height = `${totalProgress}%`;

  console.log("Water level updated"); // Optional: Log a message to verify that the function is called

  // Check if the user completed 4 cycles (one period)
  if (totalProgress >= 100) {
    sendCongratulationsEmail('user@example.com'); // Call function to send congratulations email
    alert('Congratulations! You have completed a period.');
    resetProgress(); // Reset progress for the next period
  }
}

// Function to reset progress for the next period
function resetProgress() {
  stockPurchases = 0;
  carBookings = 0;
  updateWaterLevel(); // Update water level to reset display
}

// Function to send congratulations email to user
function sendCongratulationsEmail(email) {
  fetch('/send-congratulations-email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email: email })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to send email');
    }
    console.log('Congratulations email sent successfully');
  })
  .catch(error => {
    console.error('Error sending congratulations email:', error.message);
  });
}

// Example usage: Increase stock purchases by 1 (360 units) and update water level
stockPurchases++;
updateWaterLevel();

// Example usage: Increase car bookings by 30 and update water level
carBookings += 30;
updateWaterLevel();
