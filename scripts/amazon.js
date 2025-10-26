import { products } from "../data/products.js";
import { addToCart } from "../data/cart.js";
import { showMoney } from "./utils/money.js";
// import { showCalculateCartItem } from "../data/cart.js";
import { renderAmazonHeader } from "./amazon/amazon-header.js";

// const cartQuantityElement = document.querySelector(".js-cart-quantity");
let productsHtml = "";

// get data from products.js and show the data
// set the data to js-products-grid dom element
// showCalculateCartItem(cartQuantityElement, cart);
renderAmazonHeader();

products.forEach((product) => {
  productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src= "${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              product.rating.count
            }</div>
          </div>

          <div class="product-price">$${showMoney(product.priceCents)}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-add-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${
            product.id
          }" >Add to Cart</button>
        </div>
  `;
});

document.querySelector(".js-products-grid").innerHTML = productsHtml;
let addedMessageTimeOut = {};

//interact add to cart button
document.querySelectorAll(".js-add-to-cart-button").forEach((button) => {
  //lintener add to loop button
  button.addEventListener("click", () => {
    // get product-id from buttton with data set value
    // get cart quantity with product id
    const { productId } = button.dataset;
    const quantity = Number(
      document.querySelector(`.js-quantity-selector-${productId}`).value
    );
    //add to cart
    addToCart(productId, quantity);
    // added message show
    addedMessageFun(productId);

    // calcualte and  update cart quatity to the dom
    // showCalculateCartItem(cartQuantityElement, cart);
    renderAmazonHeader();
  });
});

// added message show button
function addedMessageFun(productId) {
  //show added visible with 2s with setTimeOut

  const addedMessage = document.querySelector(`.js-add-to-cart-${productId}`);
  clearTimeout(addedMessageTimeOut[productId]);

  addedMessage.classList.add("added-to-cart-show");
  addedMessageTimeOut[productId] = setTimeout(() => {
    addedMessage.classList.remove(`added-to-cart-show`);
  }, 2000);
}
