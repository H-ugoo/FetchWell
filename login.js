function vm() {
    const self = this;
    self.users = ko.observableArray(JSON.parse(localStorage.getItem('users')) || []);
    self.username = ko.observable("");
    self.password = ko.observable("");
    self.loginErrorMessage = ko.observable("");
    self.login = function () {
        const enteredUsername = self.username().trim();
        const enteredPassword = self.password().trim();
        const user = self.users().find(u => u.username === enteredUsername && u.password === enteredPassword);

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user.id));
            self.loginErrorMessage(""); 
            alert(`Welcome, ${user.firstName}!`); 
            window.location.href = 'index.html'; 
        } else {
            self.loginErrorMessage("Invalid username or password.");
        }
    };
}

ko.applyBindings(new vm());
