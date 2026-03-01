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

        try {
            const nameEl = feedbackForm.querySelector('#user-name');
            const emailEl = feedbackForm.querySelector('#user-email');
            const phoneEl = feedbackForm.querySelector('#user-phone');
            const typeEl = feedbackForm.querySelector('#request-type');
            const messageEl = feedbackForm.querySelector('#message');
            const customOrderEl = feedbackForm.querySelector('#custom-order');

            const name = nameEl ? nameEl.value.trim() : '';
            const email = emailEl ? emailEl.value.trim() : '';
            const phone = phoneEl ? phoneEl.value.trim() : '';
            const type = typeEl ? typeEl.value : '';
            const message = messageEl ? messageEl.value.trim() : '';
            const customOrder = !!(customOrderEl && customOrderEl.checked);

            if (!name) {
                alert('Please enter your name.');
                return;
            }

            const customerData = { name, email, phone, type, message, customOrder };

            // Use a safe storage key: prefer name, fallback to timestamp
            const storageKey = name || `request-${Date.now()}`;
            localStorage.setItem(storageKey, JSON.stringify(customerData));

            console.log('Saved contact request to localStorage key=', storageKey, customerData);
            alert(`Thank you, ${name}! Your request has been saved.`);
            feedbackForm.reset();
        } catch (err) {
            console.error('Error saving feedback form:', err);
            alert('Sorry — there was a problem saving your request. See console for details.');
        }
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
