document.addEventListener("DOMContentLoaded", function () {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let row = document.querySelector(".row");
  let cartCount = document.querySelector(".cart-count");
  let clearCartBtn = document.querySelector(".clear-cart");

  if (cartItems.length === 0) {
    row.innerHTML =
      "<p class='text-center fs-4 text-danger fw-bold '>Your cart is empty.</p>";
    cartCount.innerHTML = "0";
    clearCartBtn.style.display = "none";
    return;
  }

  row.innerHTML = "";
  cartCount.innerHTML = cartItems.length;
  clearCartBtn.style.display = "block";

  cartItems.forEach((item) => {
    let productDiv = document.createElement("div");
    productDiv.classList.add("col-sm-6", "col-md-4", "col-lg-3", "mb-3");

    productDiv.innerHTML = `
        <div class="card p-3">
          <img src="${item.image}" class="card-img-top" alt="${item.title}" />
          <div class="card-body text-center">
            <h5 class="card-title text-danger">${item.title.slice(0, 21)}</h5>
            <p class="card-text">${
              item.price
            } <span class="dollar text-danger fs-4">$</span></p>
            <p class="">${item.category}</p>
            <button class="btn btn-danger remove-btn" data-id="${
              item.id
            }">Remove</button>
          </div>
        </div>
      `;
    row.appendChild(productDiv);
  });

  document.querySelectorAll(".remove-btn").forEach((button) => {
    button.addEventListener("click", function () {
      let productId = parseInt(this.dataset.id);
      removeFromCart(productId);
    });
  });

  clearCartBtn.addEventListener("click", function () {
    localStorage.removeItem("cart");
    cartCount.innerHTML = "0";
    location.reload();
  });
});

function removeFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  let updatedCart = cartItems.filter((item) => item.id !== productId);

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  document.querySelector(".cart-count").innerHTML = updatedCart.length;

  location.reload();
}
