import { getProduct } from "../../data/products.js";

import {
  cart,
  deleteFromCart,
  updateCartQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";

import { showMoney } from "../utils/money.js";

import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  calculateDeliveryDate,
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPayMentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkout-header.js";

export function renderOrderSummary() {
  let htmlStr = `
   `;

  // loop cart and show in checkout
  cart.forEach((cartItem) => {
    const { productId } = cartItem;
    const cartItemProduct = getProduct(productId);

    const { deliveryOptionId } = cartItem;
    const deliveryOption = getDeliveryOption(deliveryOptionId);
    const dateString = calculateDeliveryDate(deliveryOption);

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
              <span >
                Quantity: <span class="quantity-label js-product-quantity-${
                  cartItemProduct.id
                }">${cartItem.quantity}</span>
              </span>
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

  document
    .querySelectorAll(".js-delete-quantity-link")
    .forEach((deleteLink) => {
      deleteLink.addEventListener("click", () => {
        const { productId } = deleteLink.dataset;
        deleteFromCart(productId);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPayMentSummary();
      });
    });

  document
    .querySelectorAll(".js-update-quantity-link")
    .forEach((updateButton) => {
      updateButton.addEventListener("click", () => {
        const { productId } = updateButton.dataset;

        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.add("is-editing-quantity");
      });
    });
  document
    .querySelectorAll(".js-save-quantity-link")
    .forEach((saveQuantityLink) => {
      saveQuantityLink.addEventListener("click", () => {
        const { productId } = saveQuantityLink.dataset;
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-editing-quantity");

        const inputValue = Number(
          document.querySelector(`.js-quantity-input-${productId}`).value
        );

        updateCartQuantity(productId, inputValue);
        renderCheckoutHeader();
        renderOrderSummary();
        renderPayMentSummary();
      });
    });

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
      updateDeliveryOption(productId, deliveryOptionId);
      renderPayMentSummary();
      renderOrderSummary();
    });
  });
}
