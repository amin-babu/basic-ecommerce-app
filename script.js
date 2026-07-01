const menuIcon = document.querySelector(".menu-icon");
const mobileMenu = document.querySelector(".mobile-nav-menu");

let isMenuOpen = false;

menuIcon.addEventListener("click", () => {
  if (!isMenuOpen) {
    // Open menu
    mobileMenu.classList.add("show-menu");

    menuIcon.classList.add("animate");

    setTimeout(() => {
      menuIcon.classList.remove("fa-bars");
      menuIcon.classList.add("fa-xmark");
    }, 200);

    // setTimeout(() => {
    //   menuIcon.classList.remove("animate");
    // }, 1000);

    isMenuOpen = true;
  } else {
    // Close menu
    menuIcon.classList.add("no-transition");
    menuIcon.classList.remove("animate");
    mobileMenu.classList.remove("show-menu");


    menuIcon.classList.remove("fa-xmark");
    menuIcon.classList.add("fa-bars");

    setTimeout(() => {
      menuIcon.classList.remove("no-transition");
    }, 0);

    isMenuOpen = false;
  }
});


const cartContainer = document.querySelector('.products_container .cart_container');

// showing products in UI
productsData.forEach((product) => {
  cartContainer.innerHTML += `
    <div class="cart">
      <div class="img">
        <img
          src="${product.image}"
          alt="${product.name}"
          />
      </div>
      <div class="product_info">
        <div class="price_name">
          <h4>${product.name}</h4>
          <p class="price">$${product.price}</p>
        </div>
        <p>${product.description}</p>
      </div>
      <div class="cta">
        <button onclick="addToCart(this)">Add to cart <i class="fa-brands fa-first-order"></i></button>
      </div>
    </div>
  `;
});

// set ID in every product
const allProducts = document.querySelectorAll('.cart');
for (let i = 0; i < allProducts.length; i++) {
  allProducts[i].id = i + 1;
}


// set up random colors
const cards = document.querySelectorAll(".cart");
let colorIndex = 0;

cards.forEach(card => {

  if (colorIndex === colorPairs.length) colorIndex = 0;
  card.style.background = colorPairs[colorIndex].card;
  card.querySelector('.cta button').style.background =
    colorPairs[colorIndex].button;

  colorIndex++;

});

const cartDetailsContainer = document.querySelector('.cart_details_container');
const showCartDetails = document.querySelector('.nav-action');
const removeCartDetails = document.querySelector('.card_details_header button');

showCartDetails.addEventListener('click', () => {
  cartDetailsContainer.style.transform = 'translateX(0px)';
});

removeCartDetails.addEventListener('click', () => {
  cartDetailsContainer.style.transform = 'translateX(4500px)';
});


const cartProductContainer = document.querySelector('.cart_product_info');
const cartQuantity = document.querySelector('.nav-action span');

const addToCart = (productInfo) => {


  showMessage('Product added to cart', 'success');
  const product = productInfo.parentElement.parentElement;
  const addToCartBtn = product.querySelector('.cta button');

  addToCartBtn.innerHTML = `Added to cart <i class="fa-solid fa-check"></i>`;
  addToCartBtn.classList.add('disable');

  cartProductContainer.innerHTML += `
    <div id="${product.id}" class="cart_product">
      <div class="cart_product_left">
        <img src="${product.querySelector('.img img').src}" alt="">
        <div class="cart_product_heading">
          <h5>${product.querySelector('.price_name h4').textContent}</h5>
          <div class="quantity">
            <button class="decrease">-</button>
            <button class="quantity_value">1</button>
            <button class="increase">+</button>
          </div>
        </div>
      </div>

      <div class="cart_product_right">
        <h3>${product.querySelector('.price_name .price').textContent}</h3>
        <button onclick="deleteProduct(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `;

  const allCartProducts = document.querySelectorAll('.cart_product');
  cartQuantity.innerText = `(${allCartProducts.length})`;
};


const deleteProduct = (productInfo) => {
  showMessage('Product deleted', 'delete');
  const thisProductID = productInfo.parentElement.parentElement.id;
  const allCartProducts = [...document.querySelectorAll('.cart_product')];
  const updatedProducts = allCartProducts.filter(product => product.id !== thisProductID);

  cartProductContainer.innerHTML = '';

  cartProductContainer.innerHTML += updatedProducts
    .map(product => `
    <div id="${product.id}" class="cart_product">
      <div class="cart_product_left">
        <img src="${product.querySelector('.cart_product_left img').src}" alt="">
        <div class="cart_product_heading">
          <h5>${product.querySelector('.cart_product_heading h5').textContent}</h5>
          <div class="quantity">
            <button class="decrease">-</button>
            <button class="quantity_value">1</button>
            <button class="increase">+</button>
          </div>
        </div>
      </div>

      <div class="cart_product_right">
        <h3>${product.querySelector('.cart_product_right h3').textContent}</h3>
        <button onclick="deleteProduct(this)">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    </div>
  `).join("");

  cartQuantity.innerText = `(${updatedProducts.length})`;

  const allProducts = [...document.querySelectorAll('.cart')];
  for (product of allProducts) {
    if (product.id === thisProductID) {
      const addToCartBtn = product.querySelector('.cta button');
      addToCartBtn.classList.remove('disable');
      addToCartBtn.innerHTML = `
        Add to cart <i class="fa-brands fa-first-order"></i>
      `;
    }
  }


};

const showNotification = document.querySelector('.pop_notification');
const showNotificationMessage = showNotification.querySelector('p');

const showMessage = (message, status) => {
  showNotificationMessage.innerText = message;
  showNotification.classList.add(status);
  showNotification.style.left = '50px';
  setTimeout(() => {
    showNotification.style.left = '-300px';
    showNotification.classList.remove('delete');
  }, 4000);
};


