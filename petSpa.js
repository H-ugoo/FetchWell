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
    self.loadCurrentUser();};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
});