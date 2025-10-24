import { products } from "../data/products.js";
import {
  cart,
  deleteFromCart,
  updateCartQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { showMoney } from "./utils/money.js";
import { showCalculateCartItem } from "../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../data/deliveryOptions.js";

console.log(dayjs());

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
  const { deliveryOptionId } = cartItem;
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  htmlStr += `
   <div class="cart-item-container js-cart-item-container-${
     cartItemProduct.id
   }">
        <div class="delivery-date">Delivery date: ${dateString}</div>

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
            ${deliveryOptionHtml(cartItemProduct, cartItem)}
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

function deliveryOptionHtml(matchingProduct, cartItem) {
  let html = "";
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");
    const priceString =
      deliveryOption.priceCents === 0
        ? "FREE"
        : ` $${showMoney(deliveryOption.priceCents)} -`;

    const isCheked = deliveryOption.id === cartItem.deliveryOptionId;
    html += `
    <div data-product-id=${matchingProduct.id} data-delivery-option-id=${
      deliveryOption.id
    } class="delivery-option js-delivery-option">
      <input
      type="radio"
      ${isCheked ? "checked" : ""}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}"
       />
      <div>
        <div class="delivery-option-date">${dateString}</div>
        <div class="delivery-option-price">${priceString} Shipping</div>
      </div>
    </div>
  `;
  });
  return html;
}

document.querySelectorAll(".js-delivery-option").forEach((element) => {
  element.addEventListener("click", () => {
    const { productId, deliveryOptionId } = element.dataset;
    console.log(productId, deliveryOptionId);
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
