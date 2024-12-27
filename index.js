var vm = function () {
    var self = this;
    localStorage.setItem('users', JSON.stringify([
    { id:1, username: 'bea', password: '888', firstName:"Beatriz",lastName:"Gonçalves",email:"bea@gmail.com",phoneNumber:999888777,Location:"Aveiro",profilePic:"https://scontent.fopo6-2.fna.fbcdn.net/v/t39.30808-6/450585743_8353955484628465_5473312768146441146_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=UPRYYH7JbqIQ7kNvgFr59Qo&_nc_zt=23&_nc_ht=scontent.fopo6-2.fna&_nc_gid=Ayx0V7BLkb-KhMZFLjImsWv&oh=00_AYAnuqUfZ9Z--ViTbZyqUijCQ2sLCTazLwIzJBDe8bnepw&oe=677399D0",pets:[{id:"1",name:"Lucky",age:"7",type:"Dog",spec:"Chihuahua",fotos:["",""],sex:"Male", birthDay:"27/11/2017", microShipNum:1502,height:20,wheight:3.74,allergy:"",vacinations:[],vetVisits:[],reports:[],medications:[]},{id:"2",name:"Leonardo",age:"11",type:"Turtle",spec:"",fotos:["",""],sex:"Male", birthDay:"23/01/2013", microShipNum:2388,height:8,wheight:0.5,allergy:"",vacinations:[],vetVisits:[],reports:[],medications:[]}],purchaseHistory:[]},
    ]));

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

const productsBS = [
    { id: 1, type: "Food" , name: "PURINA ONE junior", price: 16.99, image: "https://www.purina.pt/sites/default/files/styles/product_380x380/public/2024-04/7613035027022_hero.jpg.webp?itok=dvdX7zyH" },
    { id: 2, type: "Food" , name: "Royal Canin Maxi Puppy", price: 71.49, image: "https://media.zooplus.com/bilder/0/400/253296_253297_pla_royalcanin_puppymaxi_dog_hs_01_0.jpg" },
    { id: 3, type: "Toys" , name: "Mouse Plush - Cat Toy", price: 5.99, image: "https://www.homesalive.ca/media/catalog/product/p/e/petstages-squeak-mouse-plush-cat-toy_1_.jpg" },
    { id: 4, type: "Health and Beauty" , name: "Simply Wau Shampoo", price: 29.99, image: "https://fluffycollective.com/cdn/shop/files/The-Shampoo-Fluffy-Collective-116918488.jpg?v=1731485735&width=1946" },
];

const productsContainer = document.getElementById("products-container");

productsBS.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
    <div class="row justify-content-start">
    <div class="col-10">
    <h5>${product.type}</h5>
    </div>
    <div class="col-1">
    <a href="shop.html" onclick="addToCartAndNavigate(${product.id}, event)"><button><i class="fa fa-cart-plus" aria-hidden="true"></i></button></a>
    </div>
    </div>
    <h3>${product.name}</h3>
    <img src="${product.image}" alt="${product.name}">
    <div class="preco"style="max-width:80px;">${product.price.toFixed(2)} €</div>
    `;
    productsContainer.appendChild(productDiv);
});


const CART_KEY = "shopping_cart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
window.addToCartAndNavigate = function(productId, event) {
    event.preventDefault(); 
    addToCart(productId); 
    setTimeout(() => {
        window.location.href = "shop.html"; 
    }, 100); 
}

function addToCart(productId) {
    console.log("debug")
    const cart = getCart();
    const product = productsBS.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        saveCart(cart);
    }
}
function updateCartCount() {
    const cart = getCart();
    document.getElementById("cart-count").textContent = cart.length;
}
window.onload = function() {
    
  };
};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
});
