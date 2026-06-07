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

productsData.map((product) => {
  return cartContainer.innerHTML += `
    <div class="cart">
      <div class="img">
        <img
          src="${product.image}"
          alt=""
          loading="lazy">
      </div>
      <div class="product_info">
        <div class="price_name">
          <h4>${product.name}</h4>
          <p class="price">$${product.price}</p>
        </div>
        <p>${product.description}</p>
      </div>
      <div class="cta">
        <button>Order Now <i class="fa-brands fa-first-order"></i></button>
      </div>
    </div>
  `;
});


// random colors pick
const cards = document.querySelectorAll(".cart");

cards.forEach(card => {
  const randomPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];

  card.style.background = randomPair.card;
  card.querySelector('.cta button').style.background =
    randomPair.button;
});