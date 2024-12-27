var vm = function () {  

    if (!localStorage.getItem('spaList')) {
        localStorage.setItem('spaList', JSON.stringify([
            { name: 'Relaxation Package', price: '20.00', description: 'A gentle bath with premium pet-friendly shampoos, ear cleaning, and a soothing massage to pamper your pet. Ideal for stress relief.', icon: 'fa fa-pagelines'},
            { name: 'Grooming Package', price: '30.00', description: "Includes a luxurious bath, haircut tailored to your pet's breed, nail trimming, and brushing to ensure a tidy and polished look.", icon: 'fa fa-bath' },
            { name: 'Luxuary Spa Package', price: '40.00', description: 'Comprehensive care with aromatherapy baths, moisturizing treatments, paw pad conditioning, and full grooming. The ultimate spa experience.', icon: 'fa fa-diamond' },
        ]));
    }

    const productList = document.getElementById('productList');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalPrice = document.getElementById('modalPrice');
    const productModal = document.getElementById('productModal');
    const successModal = document.getElementById('successModal');
    const overlay = document.getElementById('overlay');
    const payButton = document.getElementById('payButton');
    const closeModalButton = document.getElementById('closeModal');
    const redirectBtn = document.getElementById('redirectBtn');
    window.loadProducts = function () {
        const products = JSON.parse(localStorage.getItem('spaList')) || [];
        if (products.length === 0) {
            return;
        }

        products.forEach((product, index) => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.index = index;

            const icon = document.createElement('i');
            icon.className = `product-icon ${product.icon}`;

            const details = document.createElement('div');
            details.className = 'product-details';

            const name = document.createElement('div');
            name.className = 'product-name';
            name.textContent = product.name;

            const price = document.createElement('div');
            price.className = 'product-price';
            price.textContent = `Price: ${product.price}€`;

            const description = document.createElement('div');
            description.className = 'product-description';
            description.textContent = product.description;

            details.appendChild(name);
            details.appendChild(price);
            details.appendChild(description);
            productCard.appendChild(icon);
            productCard.appendChild(details);
            productList.appendChild(productCard);

            productCard.addEventListener('click', () => openModal(product));
        });
    };

    function openModal(product) {
        modalTitle.textContent = product.name;
        modalDescription.textContent = `${product.description}`;
        modalPrice.textContent = `Price: ${product.price}€`;
        productModal.classList.add('show');
        overlay.classList.add('show');
    }

    closeModalButton.addEventListener('click', closeModals);
    overlay.addEventListener('click', closeModals);

    function closeModals() {
        document.getElementById('email').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('expiryDate').value = '';
        document.getElementById('cvv').value = '';
        productModal.classList.remove('show');
        successModal.classList.remove('show');
        overlay.classList.remove('show');
    }

    payButton.addEventListener('click', () => {
        const email = document.getElementById('email').value.trim();
        const cardNumber = document.getElementById('cardNumber').value.trim();
        const expiryDate = document.getElementById('expiryDate').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
    
        const isValidEmail = (email) => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            return emailRegex.test(email);
        };
    
        const isValidCardNumber = (cardNumber) => {
            const cardRegex = /^[0-9]{12,19}$/; 
            return cardRegex.test(cardNumber);
        };
    
        const isValidExpiryDate = (expiryDate) => {
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;  
            return expiryRegex.test(expiryDate);
        };
    
        const isValidCVV = (cvv) => {
            const cvvRegex = /^[0-9]{3}$/;  
            return cvvRegex.test(cvv);
        };
    
        document.getElementById('emailError').style.display = 'none';
        document.getElementById('cardNumberError').style.display = 'none';
        document.getElementById('expiryDateError').style.display = 'none';
        document.getElementById('cvvError').style.display = 'none';
    
        let valid = true;
    
        if (!isValidEmail(email)) {
            document.getElementById('emailError').textContent = 'Please insert a valid email. (exemplo@dominio.com)';
            document.getElementById('emailError').style.display = 'block';
            valid = false;
        }
    
        if (!isValidCardNumber(cardNumber)) {
            document.getElementById('cardNumberError').textContent = 'Please insert a valid card number (must have 12 to 19 numbers).';
            document.getElementById('cardNumberError').style.display = 'block';
            valid = false;
        }
    
        if (!isValidExpiryDate(expiryDate)) {
            document.getElementById('expiryDateError').textContent = 'Please insert a valid expiry date: MM/AA.';
            document.getElementById('expiryDateError').style.display = 'block';
            valid = false;
        }
    
        if (!isValidCVV(cvv)) {
            document.getElementById('cvvError').textContent = 'Please insert a valid CVV (3 numbers).';
            document.getElementById('cvvError').style.display = 'block';
            valid = false;
        }
    
        if (valid) {
            productModal.classList.remove('show');
            successModal.classList.add('show');
        }
    });

    redirectBtn.addEventListener('click', () => {
        document.getElementById('email').value = '';
        document.getElementById('cardNumber').value = '';
        document.getElementById('expiryDate').value = '';
        document.getElementById('cvv').value = '';
    
        closeModals();
        setTimeout(() => {
            window.location.href = "index.html"; 
        }, 100); 
    });

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
};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
    loadProducts(); 
});
