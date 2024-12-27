var vm = function () {
    const self = this
const products = [
    { id: 1, animal: "Dog" , type: "Food" , name: "PURINA ONE junior", price: 16.99, image: "https://www.purina.pt/sites/default/files/styles/product_380x380/public/2024-04/7613035027022_hero.jpg.webp?itok=dvdX7zyH" },
    { id: 2, animal: "Dog" , type: "Food" , name: "Royal Canin Maxi Puppy", price: 71.49, image: "https://media.zooplus.com/bilder/0/400/253296_253297_pla_royalcanin_puppymaxi_dog_hs_01_0.jpg" },
    { id: 3, animal: "Cat" , type: "Toys" , name: "Mouse Plush - Cat Toy", price: 5.99, image: "https://www.homesalive.ca/media/catalog/product/p/e/petstages-squeak-mouse-plush-cat-toy_1_.jpg" },
    { id: 4, animal: "Dog" , type: "Health and Beauty" , name: "Simply Wau Shampoo", price: 29.99, image: "https://fluffycollective.com/cdn/shop/files/The-Shampoo-Fluffy-Collective-116918488.jpg?v=1731485735&width=1946" },

    { id: 5, animal: "Dog" , type: "Food" , name: "Acana Light & Fit", price: 19.25, image: "https://lojadocao.pt/13225-medium_default/acana-light-fit.jpg" },
    { id: 6, animal: "Cat" , type: "Food" , name: "PURINA Pro Plan Live", price: 20.61, image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTly_8cIGEA4MFxTRrTB7CKlOCNYjO3jtQre8fmmhs3sLK6bEl6k3pO9JSncDrtJulFcPgIUHsFRAgr96wjkjD9uFQsIGhp93haMUB2eyA&usqp=CAc" },
    { id: 7, animal: "Dog&Cat" , type: "Health and Beauty" , name: "Toalhitas húmidas", price: 1.99, image: "https://static.petness.pt/media/10/photos/products/506574/toallitas-sumsu-de-talco-653b7a23ad075_g.jpg" },
    { id: 8, animal: "Dog&Cat" , type: "Toys" , name: "Trixie Duck", price: 4.51, image: "https://petswithbenefit.com/wp-content/uploads/2022/11/Trixie-Junior-Mini-ring-soundless-latex-o-8-cm-2.png" },
    
    { id: 9, animal: "Dog" , type: "Food" , name: "Purina Pro Plan", price: 56.86, image: "https://www.biscoitinho.pt/10388-thickbox_default/purina-pro-plan-cao-adulto-all-sizes-lightsterilised-borrego.jpg" },
    { id: 10, animal: "Cat" , type: "Food" , name: "Orijen Original Cat", price: 16.45, image: "https://www.orijenpetfoods.com/dw/image/v2/BFDW_PRD/on/demandware.static/-/Sites-orijen-na-master-catalog/en_CA/dwa322ebe3/ORIJEN%20Cat%20Domestic%202022/ORI%20Original%20Cat%20Carousel%201000x10002.png?sw=250" },
    { id: 11, animal: "Dog&Cat" , type: "Health and Beauty" , name: "Vet aquadent", price: 13.99, image: "https://www.superpetclub.pt/26572-large_default/virbac-vet-aquadent-higiene-bucodental-para-perros-y-gatos.jpg" },
    { id: 12, animal: "Dog" , type: "Toys" , name: "Ducky Plush - Dog Toy", price: 8.88, image: "https://m.media-amazon.com/images/I/61INR8wmmnL.jpg" },
    
    { id: 13, animal: "Cat" , type: "Toys" , name: "Cat Play Shaking", price: 5.65, image: "https://static.miscota.com/media/1/photos/products/510192/Cat-Play-Conejo-Con-Cuerda-64cbb2e97bf8f_g.jpg" },
    { id: 14, animal: "Dog&Cat" , type: "Health and Beauty" , name: "Care Shampoo", price: 12.40, image: "https://static.zoomalia.com/prod_img/123007/xl_122a0a080f42e6f13b3a2df133f073095dd1690290954.jpg" },
    { id: 15, animal: "Dog" , type: "Food" , name: "Acana Classics Prairie", price: 16.74, image: "https://static.petness.pt/media/10/photos/products/181469/181469_0_g.png" },
    { id: 16, animal: "Cat" , type: "Food" , name: "Schesir Adult Cat", price: 20.95, image: "https://www.schesir.com/cdn/shop/products/ALL_02044720_MAIN.jpg?v=1696223366" },
    
    { id: 17, animal: "Dog" , type: "Food" , name: "Traveness Natural", price: 68.00, image: "https://m.media-amazon.com/images/I/41K9R-LSl1L.jpg" },
    { id: 18, animal: "Dog" , type: "Toys" , name: "Chew Bone For Dogs", price: 6.59, image: "https://www.justdogsstore.com/wp-content/uploads/2023/08/Drools-Chew-Bone-Teething-Dog-Toy-1.webp" },
    { id: 19, animal: "Cat" , type: "Food" , name: "Royal Canin British", price: 26.47, image: "https://lojadocao.pt/14572-large_default/royal-canin-seca-british-shorthair-adulto.jpg" },
    { id: 20, animal: "Dog&Cat" , type: "Health and Beauty" , name: "Glove Pro", price: 5.99, image: "https://www.homestoreandmore.ie/dw/image/v2/BCBN_PRD/on/demandware.static/-/Sites-master/default/dw6916667c/images/Perfect-Paws-Deshedding-Grooming-Glove-pet-hygiene-090854-hi-res-0.jpg?sw=1500" }
];

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

const searchInput = document.querySelector('.form-control');
const productsContainer = document.getElementById("products-container");
const CART_KEY = "shopping_cart";

function getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

window.addToCart = function (productId) {
    const cart = getCart();
    const product = products.find(p => p.id === productId);

    if (product) {
        cart.push(product);
        saveCart(cart);
        updateCartCount();
        alert(`${product.name} added to your cart!`);
    }
};


function updateCartCount() {
    const cart = getCart();
    document.getElementById("cart-count").textContent = cart.length;
}

window.onload = function() {
    updateCartCount();
    displayProducts(products);
};

function displayProducts(productList) {
    productsContainer.innerHTML = "";

    if (productList.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products-message" style=" grid-column-start: 2;grid-column-end: 4;">
                <h4>No products found!</h4>
            </div>
        `;
        return;
    }

    productList.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
        <div class="row justify-content-start">
            <div class="col-10">
                <h5>${product.type}</h5>
            </div>
            <div class="col-1">
                <button onclick="addToCart(${product.id})"><i class="fa fa-cart-plus" aria-hidden="true"></i></button>
            </div>
        </div>
        <h3>${product.name}</h3>
        <img style="max-height:227px;"src="${product.image}" alt="${product.name}">
        <div class="preco" style="max-width:80px;">${product.price.toFixed(2)} €</div>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function filterProducts() {
    const selectedFilters = {
        animal: [],
        type: []
    };

    if (document.getElementById("filter-dog").checked) selectedFilters.animal.push("Dog"),selectedFilters.animal.push("Dog&Cat");
    if (document.getElementById("filter-cat").checked) selectedFilters.animal.push("Cat"),selectedFilters.animal.push("Dog&Cat");
    if (document.getElementById("filter-health").checked) selectedFilters.type.push("Health and Beauty");
    if (document.getElementById("filter-food").checked) selectedFilters.type.push("Food");
    if (document.getElementById("filter-toys").checked) selectedFilters.type.push("Toys");

    const searchTerm = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product => {
        const matchesAnimal = selectedFilters.animal.length === 0 || selectedFilters.animal.includes(product.animal);
        const matchesType = selectedFilters.type.length === 0 || selectedFilters.type.includes(product.type);
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        return matchesAnimal && matchesType && matchesSearch;
    });

    displayProducts(filteredProducts);
}

searchInput.addEventListener('input', filterProducts);

document.querySelectorAll(".form-check-input").forEach(checkbox => {
    checkbox.addEventListener("change", filterProducts);
});
};

$(document).ready(function () {
    window.viewModel = new vm(); 
    ko.applyBindings(window.viewModel);
});