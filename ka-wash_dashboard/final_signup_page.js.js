document.addEventListener('DOMContentLoaded', function() {
    // Function to generate affiliate link
    function generateAffiliateLink(name, address, carWashName) {
        // Generate unique link based on provided information
        return 'https://example.com/affiliate/' + encodeURIComponent(name) + '/' + encodeURIComponent(address) + '/' + encodeURIComponent(carWashName);
    }

    // Form submission event listener
    document.getElementById('signupForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Get form values
        var carWashName = document.getElementById('carWashName').value;
        var address = document.getElementById('address').value;
        var city = document.getElementById('city').value;
        var name = document.getElementById('firstName').value + ' ' + document.getElementById('surname').value;

        // Generate unique affiliate link based on form values
        var affiliateLink = generateAffiliateLink(name, address, carWashName);

        // Redirect to the dashboard page with affiliate link as a URL parameter
        window.location.href = 'dashboard.html?affiliateLink=' + encodeURIComponent(affiliateLink);

        // Add user to usersByTownship object
        if (!usersByTownship.hasOwnProperty(city)) {
            usersByTownship[city] = [];
        }
        usersByTownship[city].push({
            name: name,
            address: address,
            carWashName: carWashName,
            affiliateLink: affiliateLink
        });

        // Clear form fields
        document.getElementById('carWashName').value = '';
        document.getElementById('address').value = '';
        document.getElementById('city').value = '';
        document.getElementById('firstName').value = '';
        document.getElementById('surname').value = '';

        // Display success message
        alert('Signup successful!');
    });

    // Sample user information categorized by township
    var usersByTownship = {};

    // Function to create container holders for each user based on township
    function createContainers() {
        var containerDiv = document.getElementById('container-div');
        Object.keys(usersByTownship).forEach(function(township) {
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
                        <p><strong>Name:</strong> ${user.name}</p>
                        <p><strong>Address:</strong> ${user.address}</p>
                        <p><strong>Car Wash:</strong> ${user.carWashName}</p>
                    </div>
                    <!-- Light bulb indicator -->
                    <div class="light-bulb"></div>
                    <!-- Book button -->
                    <button class="book-button" onclick="book('${user.affiliateLink}')">Book</button>
                    <!-- Time stamp -->
                    <div class="time-stamp-container">
                        <div class="time-stamp" onclick="toggleLightBulb(this)"></div>
                    </div>
                `;
                wrapper.appendChild(container);
            });
            containerDiv.appendChild(wrapper);
        });
    }

    // Function to redirect to the dashboard page with affiliate link as a URL parameter
    function book(affiliateLink) {
        window.location.href = affiliateLink;
    }

    // Function to toggle light bulb color based on availability
    function toggleLightBulb(timeStamp) {
        timeStamp.classList.toggle('on');
        var container = timeStamp.closest('.booking-container');
        container.classList.toggle('available');
        var lightBulb = container.querySelector('.light-bulb');
        lightBulb.style.backgroundColor = container.classList.contains('available') ? 'green' : 'red';
    }
});
