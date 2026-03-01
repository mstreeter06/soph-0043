// --- GALLERY FEATURES (sessionStorage) ---
const cartModal = document.getElementById('cartModal');
const viewCartBtn = document.getElementById('view-cart-btn');
const closeBtn = document.querySelector('.close');

// Add item to cart using sessionStorage
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = button.getAttribute('data-price');
        
        let cart = JSON.parse(sessionStorage.getItem('bhCart')) || [];
        cart.push({ name: itemName, price: itemPrice });
        
        sessionStorage.setItem('bhCart', JSON.stringify(cart));
        alert(`${itemName} added to cart!`);
    });
});

// View Cart logic
if (viewCartBtn) {
    viewCartBtn.onclick = function() {
        const cart = JSON.parse(sessionStorage.getItem('bhCart')) || [];
        const list = document.getElementById('cart-items-list');
        list.innerHTML = cart.length === 0 ? "Your cart is empty." : "";
        
        cart.forEach(item => {
            list.innerHTML += `<p><strong>${item.name}</strong> - $${item.price}</p>`;
        });
        cartModal.style.display = "block";
    }
}

// Clear Cart logic
const clearCartBtn = document.getElementById('clear-cart');
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        sessionStorage.removeItem('bhCart');
        alert("Cart cleared.");
        location.reload(); 
    });
}

// Process Order logic
const processOrderBtn = document.getElementById('process-order');
if (processOrderBtn) {
    processOrderBtn.addEventListener('click', () => {
        sessionStorage.removeItem('bhCart');
        alert("Thank you! Your order has been processed.");
        location.reload();
    });
}

// Close modal
if (closeBtn) {
    closeBtn.onclick = () => cartModal.style.display = "none";
}

// --- ABOUT US FEATURES (localStorage) ---
const feedbackForm = document.getElementById('feedback-form');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Capture form data including the new checkbox
        const customerData = {
            name: document.getElementById('user-name').value,
            email: document.getElementById('user-email').value,
            phone: document.getElementById('user-phone').value,
            type: document.getElementById('request-type').value,
            message: document.getElementById('message').value,
            customOrder: document.getElementById('custom-order').checked // Captures true/false
        };

        // Save to localStorage using the user's name as the Key
        localStorage.setItem(customerData.name, JSON.stringify(customerData));
        
        alert("Thank you, " + customerData.name + "! Your request has been saved.");
    });
}

// --- NEWSLETTER SUBSCRIPTION (footer forms) ---
document.querySelectorAll('footer form').forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value.trim() : '';
        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }
        alert(`Thanks for subscribing with ${email}!`);
        form.reset();
    });
});
