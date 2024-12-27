var vm = function () {
    var self = this;
    const CART_KEY = "shopping_cart";
    self.totalPrice = ko.observable(0);
    self.totalQuant = ko.observable(0);

    self.users = JSON.parse(localStorage.getItem('users')) || [];
    self.currentUserId = ko.observable(0);
    self.userInfo = ko.observable(null);

    self.loadCurrentUser = function () {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (currentUser) {
    self.currentUserId(currentUser);
    const user = self.users.find(u => u.id === self.currentUserId());
    if (user) {
        self.userInfo(user);
    } else {
        self.currentUserId(0); 
        self.userInfo(null);
    }
}
};
self.loadCurrentUser();

    function getCart() {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
    }

    function groupCartItems(cart) {
        const grouped = {};

        cart.forEach(item => {
            if (grouped[item.name]) {
                grouped[item.name].quantity += 1;
                grouped[item.name].totalPrice += item.price;
            } else {
                grouped[item.name] = { 
                    ...item, 
                    quantity: 1, 
                    totalPrice: item.price 
                };
            }
        });

        return Object.values(grouped);
    }

    function renderCart() {
        const cart = getCart();
        const groupedCart = groupCartItems(cart);
        const cartContainer = document.getElementById("cart-container");
    
        if (groupedCart.length === 0) {
            cartContainer.innerHTML = "<div style='text-align: center; margin-top:50px;margin-bottom:50px'><p>Your cart is empty.</p></div>";
        } else {
            cartContainer.innerHTML = `
            <div style="margin: 50px auto; max-width: 95%; text-align: center;">
                <table class="table align-middle">
                    <thead class="table">
                        <tr>
                            <th scope="col">Quantity</th>
                            <th scope="col">Product</th>
                            <th scope="col">Image</th>
                            <th scope="col"> Price </th>
                            <th scope="col">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                    ${groupedCart.map((item, index) => `
                        <tr>
                            <td>${item.quantity}</td>
                            <td>${item.name}</td>
                            <td>
                                <img src="${item.image}" alt="${item.name}" style="width: 90px; height: 90px; object-fit: cover;">
                            </td>
                            <td><p>${item.totalPrice.toFixed(2)}€</p></td>
                            <td>
                                <button class="btn btn-danger btn-sm produtos_do_carrinho" onclick="viewModel.removeFromCart('${item.name}')">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    `).join("")}
                    </tbody>
                </table>
            </div>
        `;
        }

        const totalPrice = groupedCart.reduce((total, item) => total + item.totalPrice, 0);
        self.totalPrice(totalPrice); 
        self.totalQuant(cart.length); 
    }
    

    self.removeFromCart = function (name) {
        const cart = getCart();
        const itemIndex = cart.findIndex(item => item.name === name);
    
        if (itemIndex !== -1) {
            cart.splice(itemIndex, 1);
        }
    
        saveCart(cart);
        renderCart(); 
    };

    renderCart(); 

    function validateField(input, regex, errorMessage) {
        const errorElement = input.nextElementSibling;
        if (!regex.test(input.value)) {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
            return false;
        } else {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            errorElement.style.display = 'none';
            return true;
        }
    }

    function togglePaymentDetails() {
        const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        const cardDetails = document.getElementById('cardDetails');
        const paypalDetails = document.getElementById('paypalDetails');

        if (selectedPaymentMethod) {
            if (selectedPaymentMethod.value === 'visa' || selectedPaymentMethod.value === 'mastercard') {
                cardDetails.style.display = 'block';
                paypalDetails.style.display = 'none';
            } else if (selectedPaymentMethod.value === 'paypal') {
                paypalDetails.style.display = 'block';
                cardDetails.style.display = 'none';
            }
        } else {
            cardDetails.style.display = 'none';
            paypalDetails.style.display = 'none';
        }
    }

    function addDynamicValidation() {
        document.getElementById('fullName').addEventListener('input', function () {
            validateField(this, /^\w+ \w+$/, 'Full Name must have at least 2 words.');
        });

        document.getElementById('address').addEventListener('input', function () {
            validateField(this, /^\w+( \w+)+$/, 'Address must have at least 2 words.');
        });

        document.getElementById('email').addEventListener('input', function () {
            validateField(this, /^\S+@\S+\.\S+$/, 'Exemple of a valid email: exemplo@dominio.com');
        });

        document.getElementById('cardName').addEventListener('input', function () {
            validateField(this, /^\w+ \w+$/, 'Name must have at least 2 words.');
        });

        document.getElementById('cardNumber').addEventListener('input', function () {
            validateField(this, /^\d+$/, 'Only numbers.');
        });

        document.getElementById('expiryDate').addEventListener('input', function () {
            validateField(this, /^\d{2}\/\d{2}/, 'Expiry Date format: MM/YY.');
        });

        document.getElementById('cvc').addEventListener('input', function () {
            validateField(this, /^\d{3}$/, 'CVC must have 3 numbers.');
        });

        document.getElementById('paypalPhone').addEventListener('input', function () {
            validateField(this, /^\d{9}$/, 'Phone Number must have 9 numbers.');
        });
    }

    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', togglePaymentDetails);
    });

    document.getElementById('checkoutForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let isValid = true;

        isValid &= validateField(document.getElementById('fullName'), /^\w+ \w+$/, 'Full Name must have at least 2 words.');
        isValid &= validateField(document.getElementById('address'), /^\w+( \w+)+$/, 'Address must have at least 2 words.');
        isValid &= validateField(document.getElementById('email'), /^\S+@\S+\.\S+$/, 'Exemple of a valid email: exemplo@dominio.com');

        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!paymentMethod) {
            isValid = false;
            const paymentError = document.getElementById('paymentError');
            paymentError.style.display = 'block';
        } else {
            document.getElementById('paymentError').style.display = 'none';
            if (paymentMethod.value === 'visa' || paymentMethod.value === 'mastercard') {
                isValid &= validateField(document.getElementById('cardName'), /^\w+ \w+$/, 'Name must have at least 2 words.');
                isValid &= validateField(document.getElementById('cardNumber'), /^\d+$/, 'Only numbers.');
                isValid &= validateField(document.getElementById('expiryDate'), /^\d{2}\/\d{2}/, 'Expiry Date format: MM/YY.');
                isValid &= validateField(document.getElementById('cvc'), /^\d{3}$/, 'CVC must have 3 numbers.');
            } else if (paymentMethod.value === 'paypal') {
                isValid &= validateField(document.getElementById('paypalPhone'), /^\d{9}$/, 'Phone Number must have 9 numbers.');
            }
        }

        if (isValid) {
            localStorage.removeItem('shopping_cart');
            document.getElementById('successModal').style.display = 'block';
        }
    });

    document.getElementById('redirectBtn').addEventListener('click', function () {
        window.location.href = 'index.html';
    });

    addDynamicValidation();
};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
});
