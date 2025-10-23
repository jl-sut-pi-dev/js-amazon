import { products } from "../data/products.js";
import { cart, deleteFromCart, updateCartQuantity } from "../data/cart.js";
import { showMoney } from "./utils/money.js";
import { showCalculateCartItem } from "../data/cart.js";
// document.querySelector(".js-quantity-input");

const checkoutHeaderQuantity = document.querySelector(
  ".js-checkout-header-quantity"
);
let htmlStr = `
   `;

showCalculateCartItem(checkoutHeaderQuantity, cart);

// loop cart and show in checkout
cart.forEach((cartItem) => {
  let cartItemProduct;
  products.forEach((product) => {
    if (product.id === cartItem.productId) {
      cartItemProduct = product;
    }
  });

  htmlStr += `
   <div class="cart-item-container js-cart-item-container-${
     cartItemProduct.id
   }">
        <div class="delivery-date">Delivery date: Tuesday, June 21</div>

        <div class="cart-item-details-grid">
          <img
            class="product-image"
            src="${cartItemProduct.image}"
          />

          <div class="cart-item-details">
            <div class="product-name">
            ${cartItemProduct.name}
            </div>
            <div class="product-price">$${showMoney(
              cartItemProduct.priceCents
            )}</div>
            <div class="product-quantity ">
              <span class="" > Quantity: <span class="quantity-label js-product-quantity-${
                cartItemProduct.id
              }">${cartItem.quantity}</span> </span>
              <span  class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                cartItemProduct.id
              }">
                Update
              </span>
            
                <input  class="quantity-input js-quantity-input-${
                  cartItemProduct.id
                }">
                <span  class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                  cartItemProduct.id
                }">save</span>
           
              <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${
                cartItemProduct.id
              }">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                checked
                class="delivery-option-input"
                name="delivery-option-${cartItemProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Tuesday, June 21</div>
                <div class="delivery-option-price">FREE Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItemProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Wednesday, June 15</div>
                <div class="delivery-option-price">$4.99 - Shipping</div>
              </div>
            </div>
            <div class="delivery-option">
              <input
                type="radio"
                class="delivery-option-input"
                name="delivery-option-${cartItemProduct.id}"
              />
              <div>
                <div class="delivery-option-date">Monday, June 13</div>
                <div class="delivery-option-price">$9.99 - Shipping</div>
              </div>
            </div>
          </div>
        </div>
    </div>
  `;
});

document.querySelector(".js-order-summary").innerHTML = htmlStr;

document.querySelectorAll(".js-delete-quantity-link").forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const { productId } = deleteLink.dataset;
    deleteFromCart(productId);
    showCalculateCartItem(checkoutHeaderQuantity, cart);
    document.querySelector(`.js-cart-item-container-${productId}`).remove();
  });
});

document
  .querySelectorAll(".js-update-quantity-link")
  .forEach((updateButton) => {
    updateButton.addEventListener("click", () => {
      const { productId } = updateButton.dataset;

      const inputValue = document.querySelector(
        `.js-quantity-input-${productId}`
      );

      document
        .querySelector(`.js-cart-item-container-${productId}`)
        .classList.add("is-editing-quantity");

      inputValue.addEventListener("keyup", function (event) {
        // handle the keyup event
        if (event.key === "Enter") {
          inputValue.value;
          updateCartQuantity(
            productId,
            Number(inputValue.value),
            checkoutHeaderQuantity
          );

          showQuantityInDom(productId, inputValue.value);
        }
      });
    });
  });
document
  .querySelectorAll(".js-save-quantity-link")
  .forEach((saveQuantityLink) => {
    saveQuantityLink.addEventListener("click", () => {
      const { productId } = saveQuantityLink.dataset;

      const inputValue = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );

      // let exitingObj;
      updateCartQuantity(productId, inputValue, checkoutHeaderQuantity);
      showQuantityInDom(productId, inputValue);
    });
  });
function showQuantityInDom(productId, inputValue) {
  document
    .querySelector(`.js-cart-item-container-${productId}`)
    .classList.remove("is-editing-quantity");
  document.querySelector(`.js-product-quantity-${productId}`).innerHTML =
    inputValue;
}
