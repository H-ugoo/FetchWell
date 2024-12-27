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

const form = document.getElementById('myForm');
const submitButton = document.getElementById('submitButton');
const modal = document.getElementById('successModal');

const errors = {
    question1: document.getElementById('errorQuestion1'),
    question2: document.getElementById('errorQuestion2'),
    question3: document.getElementById('errorQuestion3'),
    question4: document.getElementById('errorQuestion4'),
    email: document.getElementById('errorEmail')
};

function validateField(fieldName) {
    let isValid = true;

    if (fieldName === 'email') {
        const emailValue = document.getElementById('emailInput').value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailValue)) {
            errors.email.textContent = " *Please enter a valid email: exemplo@dominio.com";
            isValid = false;
        } else {
            errors.email.textContent = "";
        }
    } else {
        const field = form[fieldName];
        if (!field.value) {
            errors[fieldName].textContent = " *Please select one.";
            isValid = false;
        } else {
            errors[fieldName].textContent = "";
        }
    }

    return isValid;
}

function validateForm() {
    let isValid = true;

    isValid &= validateField('question1');
    isValid &= validateField('question2');
    isValid &= validateField('question3');
    isValid &= validateField('question4');
    isValid &= validateField('email');

    return !!isValid;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
        modal.classList.add('show');
    }
});

form.addEventListener('input', (e) => {
    if (e.target.type === 'radio') {
        const siblings = e.target.closest('div').querySelectorAll('.custom-radio');
        siblings.forEach(sib => sib.classList.remove('selected'));
        e.target.parentElement.classList.add('selected');

        validateField(e.target.name);
    } else if (e.target.id === 'emailInput') {
        validateField('email');
    }
});
};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
});