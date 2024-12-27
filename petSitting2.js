var vm = function () {
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

    function validateDate(date) {
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        return dateRegex.test(date);
    }
    
    function validateDuration(duration) {
        const durationRegex = /^[1-9][0-9]*$/;
        return durationRegex.test(duration);
    }
    
    function checkFormValidity() {
        const frequency = document.querySelector('input[name="frequency"]:checked');
        const date = document.getElementById('date').value.trim();
        const duration = document.getElementById('duration').value.trim();
        const quantity = document.querySelector('input[name="quantity"]:checked');
        const time = document.querySelector('input[name="time"]:checked');
        const petType = document.querySelector('input[name="petType"]:checked');
        const submitButton = document.getElementById('submitButton');
    
        const dateValid = validateDate(date);
        const durationValid = validateDuration(duration);
    
        const allFieldsValid = frequency && dateValid && durationValid && quantity && time && petType;
        submitButton.disabled = !allFieldsValid;
    }
    
    function showErrorMessages() {
        const date = document.getElementById('date').value.trim();
        const duration = document.getElementById('duration').value.trim();
    
        const frequencyError = document.getElementById('frequencyError');
        const dateError = document.getElementById('dateError');
        const durationError = document.getElementById('durationError');
        const quantityError = document.getElementById('quantityError');
        const timeError = document.getElementById('timeError');
        const petTypeError = document.getElementById('petTypeError');
    
        if (!document.querySelector('input[name="frequency"]:checked')) {
            frequencyError.textContent = 'Please select a frequency';
            frequencyError.style.display = 'block';
        } else {
            frequencyError.style.display = 'none';
        }
    
        if (date && !validateDate(date)) {
            dateError.textContent = 'Invalid date format (dd/mm/yyyy)';
            dateError.style.display = 'block';
        } else {
            dateError.style.display = 'none';
        }
    
        if (duration && !validateDuration(duration)) {
            durationError.textContent = 'Duration must be a positive number';
            durationError.style.display = 'block';
        } else {
            durationError.style.display = 'none';
        }
    
        if (!document.querySelector('input[name="quantity"]:checked')) {
            quantityError.textContent = 'Please select a quantity';
            quantityError.style.display = 'block';
        } else {
            quantityError.style.display = 'none';
        }
    
        if (!document.querySelector('input[name="time"]:checked')) {
            timeError.textContent = 'Please select a time';
            timeError.style.display = 'block';
        } else {
            timeError.style.display = 'none';
        }
    
        if (!document.querySelector('input[name="petType"]:checked')) {
            petTypeError.textContent = 'Please select a pet type';
            petTypeError.style.display = 'block';
        } else {
            petTypeError.style.display = 'none';
        }
    }
    
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            showErrorMessages();
            checkFormValidity();
        });
    });
    
    document.getElementById('customForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const confirmationMessage = document.getElementById('confirmationMessage');
        confirmationMessage.style.display = 'block';
    });

    localStorage.setItem('sitters', JSON.stringify([
        { name: 'Elsa M.', price: '6.00', description: 'Your fur babies are important to me', image: 'https://imgcdn.stablediffusionweb.com/2024/11/12/8d6e45ab-9c5f-4c6f-b988-a9d87b515cab.jpg' },
        { name: 'Teresa C.', price: '12.00', description: 'Experienced, caring, pet lover', image: 'https://ccms.icongroup.global/wp-content/uploads/2024/05/240516-Icon-Cancer-Centre-Hobart_Alison-Hadley_web-1024x1024.png' },
        { name: 'Alice C.', price: '8.00', description: 'Will love your babies day or night', image: 'https://imgcdn.stablediffusionweb.com/2024/11/8/85256680-a38d-4729-a977-4a371dcf0643.jpg' },
        { name: 'Isabel B.', price: '15.00', description: 'Calm Pet paradise', image: 'https://cdn.openart.ai/published/VPjvOe73vp37RXqWZ4WW/imygbY81_AHED_1024.webp' },
        { name: 'Carlos S.', price: '11.00', description: 'You had me at woof', image: 'https://imgcdn.stablediffusionweb.com/2024/4/22/ff482646-f8b4-4537-8d79-ac4f32e81906.jpg' },
    ]));
    
    const closeModalButton = document.getElementById('closeModalButton');
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            const modal = document.getElementById('productModal');
            const overlay = document.getElementById('overlay');
            modal.classList.remove('show');
            overlay.classList.remove('show');
        });
    } else {
        console.error('Elemento closeModalButton não encontrado no DOM.');
    }
    
        const productList = document.getElementById('productList');
        const modal = document.getElementById('productModal');
        const overlay = document.getElementById('overlay');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalPrice = document.getElementById('modalPrice');

        self.loadProducts = function () {
            const productList = document.getElementById('productList');
            const products = JSON.parse(localStorage.getItem('sitters')) || [];
            console.log("Produtos carregados:", products);
        
            if (products.length === 0) {
                console.error("Nenhum produto encontrado na Local Storage!");
                return;
            }
        
            products.forEach((product, index) => {
                console.log("Produto:", product);
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                productCard.dataset.index = index;
        
                const image = document.createElement('img');
                image.className = 'product-image';
                image.src = product.image;
                image.alt = product.name;
        
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
        
                productCard.appendChild(image); 
                productCard.appendChild(details);
        
                productList.appendChild(productCard);
                productCard.addEventListener('click', () => self.openModal(product));
            });
        };
        
    
        
        

        self.openModal = function (product) {
            console.log("Abrindo modal para produto:", product);
            const modal = document.getElementById('productModal');
            const overlay = document.getElementById('overlay');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalPrice = document.getElementById('modalPrice');
            const modalImage = document.getElementById('modalImage'); 
        
            modalTitle.textContent = product.name;
            modalDescription.textContent = `${product.description}`;
            modalPrice.textContent = `Price: ${product.price}€`;
            modalImage.src = product.image; 
            modalImage.alt = product.name;
        
            modal.classList.add('show');
            overlay.classList.add('show');
            const closeModalButton = document.getElementById('closeModalButton');
            if (closeModalButton) {
                closeModalButton.addEventListener('click', self.closeCurrentModal);
            }
        };
        self.closeCurrentModal = function () {
            const modal = document.getElementById('productModal');
            const overlay = document.getElementById('overlay');
            modal.classList.remove('show');
            overlay.classList.remove('show');
        };
        document.getElementById('overlay').addEventListener('click', self.closeCurrentModal);
        
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
                const productModal = document.getElementById('productModal');
                if (productModal) {
                    productModal.classList.remove('show');
                }
        
                const successModal = document.getElementById('successModal');
                if (successModal) {
                    successModal.classList.add('show'); 
                }
        
                document.getElementById('email').value = '';
                document.getElementById('cardNumber').value = '';
                document.getElementById('expiryDate').value = '';
                document.getElementById('cvv').value = '';
            }
        });


        closeModalButton.addEventListener('click', () => {
            modal.classList.remove('show');
            overlay.classList.remove('show');
            document.getElementById('email').value = '';
            document.getElementById('cardNumber').value = '';
            document.getElementById('expiryDate').value = '';
            document.getElementById('cvv').value = '';
        });

        overlay.addEventListener('click', () => {
            modal.classList.remove('show');
            overlay.classList.remove('show');
            document.getElementById('email').value = '';
            document.getElementById('cardNumber').value = '';
            document.getElementById('expiryDate').value = '';
            document.getElementById('cvv').value = '';
        });

        const redirectBtn = document.getElementById('redirectBtn');
if (redirectBtn) {
    redirectBtn.addEventListener('click', () => {
        const successModal = document.getElementById('successModal');
        if (successModal) {
            successModal.classList.remove('show'); 
        }
        setTimeout(() => {
            window.location.href = "index.html"; 
        }, 100);
    });
}

        self.init = function () {
            self.loadProducts();
        };
    
        self.init();
};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
});
