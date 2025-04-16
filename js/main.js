let links = document.querySelector(".links");
let user_info = document.querySelector(".userinfo");
let user_name = document.querySelector(".user");
let logout = document.querySelector(".logout");
let one = document.querySelector(".one");
let cartCount = document.querySelector(".cart-count");
let cartShopping = document.querySelector("#cart-shopping");
let search = document.querySelector("#search");
let count = 0;
let products = [];
let length = document.querySelector(".length");
let create = document.querySelector(".create");
if (localStorage.getItem("username")) {
  if (links) links.remove();
  user_info.style.display = "flex";
  user_name.innerHTML = localStorage.getItem("username");
}

logout.addEventListener("click", function () {
  localStorage.clear();
  setTimeout(() => (window.location = "Register.html"), 1500);
});

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    if (localStorage.getItem("newproduct")) {
      products.push(JSON.parse(localStorage.getItem("newproduct")));
    }
    if (one) displayData(products);
    console.log(products);
  });

function displayData(data) {
  one.innerHTML = "";
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  data.forEach((el) => {
    let isFavorite = favorites.some((item) => item.id === el.id);
    one.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-3 mb-3 mr-2">
        <div class="card overflow-hidden p-3" style="width: 100%">
          <i class="fa-solid fa-heart heart ${
            isFavorite ? "favorite" : ""
          }" onclick="toggleFavorite(${el.id}, this)"></i>
          <img src="${el.image}" class="card-img-top" alt="Product Image" />
          <div class="card-body text-center">
            <h5 class="card-title">${el.title}</h5>
            <p class="card-text">${el.category}</p>
            <span class="product-price d-block mt-1 mb-2 fs-4">${
              el.price
            } <span class="dollar text-primary fs-6">$</span></span>
            <button class="btn btn-primary mt-2" onclick="addToCart(${
              el.id
            })">Add To Cart</button>
          </div>
        </div>
      </div>`;
  });
}

function addToCart(productId) {
  if (localStorage.getItem("username")) {
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (!cartItems.some((item) => item.id === productId)) {
      let selectedProduct = products.find((el) => el.id === productId);
      if (selectedProduct) {
        cartItems.push(selectedProduct);
        localStorage.setItem("cart", JSON.stringify(cartItems));
      }
    }
    cartCount.innerHTML = cartItems.length;
    localStorage.setItem("count", cartItems.length);
  } else {
    window.location = "login.html";
  }
}

cartShopping.addEventListener("click", function () {
  if (localStorage.getItem("username")) {
    window.location = "addtocart.html";
  } else {
    window.location = "login.html";
  }
});

window.onload = function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount.innerHTML = cartItems.length;
};

search.addEventListener("keyup", function () {
  let searchValue = search.value.toLowerCase();
  searchItems(searchValue, products);
});

function searchItems(title, arr) {
let searchResult = arr.filter((el)=> el.title.toLowerCase().indexOf(title) !== -1);
  
  displayData(searchResult);
}

function toggleFavorite(productId, element) {
  if (localStorage.getItem("username")) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let isFavorite = favorites.some((item) => item.id === productId);
    if (isFavorite) {
      favorites = favorites.filter((item) => item.id !== productId);
    } else {
      let selectedProduct = products.find((el) => el.id === productId);
      if (selectedProduct) {
        favorites.push(selectedProduct);
      }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    element.classList.toggle("favorite");
  } else {
    window.location = "login.html";
  }
}
create.addEventListener("click", function () {
  if (localStorage.getItem("username")) {
    window.location = "createproduct.html";
  } else {
    window.location = "login.html";
  }
});
