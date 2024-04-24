// Sample user information categorized by township
var usersByTownship = {
  "SOWETO": [
    { firstName: "John", surname: "Doe", address: "123 Main St", city: "SOWETO", carWashName: "Sparkle Wash", affiliateLink: "https://ishipalam.co.za/shop/store/ka-wash-services/" },
    // Add more users from SOWETO
  ],
  "Katlehong": [
    { firstName: "Jane", surname: "Smith", address: "456 Elm St", city: "Katlehong", carWashName: "Shine Bright", affiliateLink: "https://example.com/affiliate-link" },
    // Add more users from Katlehong
  ],
  "Vaal": [
    { firstName: "Michael", surname: "Johnson", address: "789 Oak St", city: "Vaal", carWashName: "Water Works", affiliateLink: "https://example.com/affiliate-link" },
    // Add more users from Vaal
  ],
  // Add more townships and users as needed
  "Kagiso": [
    { firstName: "Sarah", surname: "Brown", address: "456 Oak St", city: "Kagiso", carWashName: "Shiny Cars", affiliateLink: "https://example.com/affiliate-link" },
    // Add more users from Kagiso
  ],
  "Soshanguve": [
    { firstName: "David", surname: "Nguyen", address: "789 Elm St", city: "Soshanguve", carWashName: "Quick Clean", affiliateLink: "https://example.com/affiliate-link" },
    // Add more users from Soshanguve
  ]
};

// Sort townships alphabetically
var sortedTownships = Object.keys(usersByTownship).sort();

// Function to create container holders for each user based on township
function createContainers() {
  var containerDiv = document.getElementById('container-div');
  sortedTownships.forEach(function(township) {
    var users = usersByTownship[township];
    var townshipHeader = document.createElement('h2');
    townshipHeader.textContent = township;
    containerDiv.appendChild(townshipHeader);
    var wrapper = document.createElement('div');
    wrapper.className = 'container-wrapper';
    users.forEach(function(user) {
      var container = document.createElement('div');
      container.className = 'booking-container';
      container.innerHTML = `
        <div class="user-info">
          <p><strong>Name:</strong> ${user.firstName} ${user.surname}</p>
          <p><strong>Address:</strong> ${user.address}, ${user.city}</p>
          <p><strong>Car Wash:</strong> ${user.carWashName}</p>
        </div>
        <!-- Light bulb indicator -->
        <div class="light-bulb"></div>
        <!-- Book button with dynamic affiliate link -->
        <button class="book-button" onclick="book('${user.affiliateLink}')">Book</button>
      `;
      wrapper.appendChild(container);
    });
    containerDiv.appendChild(wrapper);
  });
}

// Call the function to create containers when the page loads
window.onload = createContainers;

// Function to redirect to the affiliate link
function book(affiliateLink) {
  window.location.href = affiliateLink;
}

// Function to toggle light bulb color based on availability
function toggleLightBulb(container) {
  var lightBulb = container.querySelector('.light-bulb');
  lightBulb.style.backgroundColor = container.classList.contains('available') ? 'green' : 'red';
}
