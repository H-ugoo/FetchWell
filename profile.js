var vm = function () {
    self.users = JSON.parse(localStorage.getItem('users')) || [];
    self.currentUserId = ko.observable(0);
    self.userInfo = ko.observable(null);
    window.logoutUser =function () {
        localStorage.removeItem('currentUser'); 
        location.reload(); 
    }
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

    window.loadUserInfo = function () {
        const currentUserId = JSON.parse(localStorage.getItem('currentUser')) || null;
        
        if (currentUserId === null) {
            alert('Nenhum usuário logado!');
            return;
        }
    
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const currentUser = users.find(user => user.id === currentUserId);
    
        if (currentUser) {

            document.getElementById('userFullName').textContent = `${currentUser.firstName} ${currentUser.lastName}`;
            document.getElementById('userEmail').textContent = currentUser.email;
            document.getElementById('userPhone').textContent = currentUser.phoneNumber;
            document.getElementById('userLocation').textContent = currentUser.Location;
    
            const profilePic = currentUser.profilePic || 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png';
            document.getElementById('userProfilePic').src = profilePic;
            const petsInfoDiv = document.getElementById('petsInfo');
            if (currentUser.pets.length > 0) {
                currentUser.pets.forEach(pet => {
                    const petDiv = document.createElement('div');
                    petDiv.classList.add('pet-info');
                    petDiv.innerHTML = `
                        <h4><b style="color:#FBB200">${pet.name}</b> (ID: ${pet.id})</h4>
                        <p><strong>Age:</strong> ${pet.age} anos</p>
                        <p><strong>Type:</strong> ${pet.type}</p>
                        <p><strong>Breed:</strong> ${pet.spec || 'Not specified'}</p>
                        <p><strong>Sex:</strong> ${pet.sex}</p>
                        <p><strong>BirthDay:</strong> ${pet.birthDay}</p>
                        <p><strong>Microship Number:</strong> ${pet.microShipNum}</p>
                        <p><strong>Height:</strong> ${pet.height} cm</p>
                        <p><strong>Wheight:</strong> ${pet.wheight} kg</p>
                        <p><strong>Allergy:</strong> ${pet.allergy || 'None'}</p>
                        <hr>
                    `;
                    petsInfoDiv.appendChild(petDiv);
                });
            } else {
                petsInfoDiv.innerHTML = '<p>No Pets Yet</p>';
            }
        } else {
            alert('User Not Found');
        }
    };
    
    window.loadUserInfo()
    function goBack() {
        window.history.back();
    }

};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
});