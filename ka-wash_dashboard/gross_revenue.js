document.addEventListener("DOMContentLoaded", function() {
    const orders = [
        { product: "Product 1", price: 100 },
        { product: "Product 2", price: 150 },
        { product: "Product 3", price: 80 }
        // Add more orders here if needed
    ];

    const tbody = document.querySelector("tbody");
    orders.forEach(order => {
        const grossRevenue = order.price - 10; // Subtract transaction fee
        const row = `
            <tr>
                <td>${order.product}</td>
                <td>${order.price}</td>
                <td>${grossRevenue}</td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const affiliateCode = getAffiliateCodeFromURL();
    if (affiliateCode) {
        fetch(`https://your-backend-server.com/api/gross-revenue?affiliate=${affiliateCode}`)
            .then(response => response.json())
            .then(data => {
                const grossRevenue = data.grossRevenue;
                console.log(`Gross revenue for affiliate ${affiliateCode}: R${grossRevenue}`);
                // Display the gross revenue in your dashboard
            })
            .catch(error => {
                console.error('Error fetching gross revenue:', error);
            });
    }
});
