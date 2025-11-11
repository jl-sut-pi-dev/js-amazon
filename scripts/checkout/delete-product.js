import { cart } from "../../data/cart-calss.js";
import { renderCheckoutHeader } from "./checkout-header.js";
import { renderOrderSummary } from "./orderSummary.js";
import { renderPayMentSummary } from "./paymentSummary.js";

export function deleteProductHandler(deleteLink) {
  const { productId } = deleteLink.dataset;

  if (productId) {
    document.querySelector(".js-modal-container").style.display = "block";
    document.querySelector(".js-modal").innerHTML = `
          <span class="close-btn">&times;</span>
          <h3 class="modal-title">You are about to delete a product</h3>
          <div class="modal-content js-modal-content">
          This will delete your product from cart<br>Are You Sure
          </div>
          <div class="js-modal-buttons">
            <button class="button-secondary button-outline js-button-cancel">Cancel</button>
            <button class="button-delete js-button-delete-product">Delete</button>
          </div>
        `;

    document
      .querySelector(".js-button-delete-product")
      .addEventListener("click", () => {
        cart.deleteFromCart(productId);
        document.querySelector(".js-modal-container").style.display = "none";

        // Now safe to re-render after DOM updates
        renderCheckoutHeader();
        renderOrderSummary();
        renderPayMentSummary();
      });

    document
      .querySelector(".js-button-cancel")
      .addEventListener("click", () => {
        document.querySelector(".js-modal-container").style.display = "none";
      });

    // handle modal close button
    document.querySelector(".close-btn").addEventListener("click", () => {
      document.querySelector(".js-modal-container").style.display = "none";
    });
  }
}
