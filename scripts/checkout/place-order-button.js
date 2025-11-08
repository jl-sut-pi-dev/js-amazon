import { cart } from "../../data/cart-calss.js";
import { addOrder } from "../../data/orders.js";

export async function placeOrderBtnClick() {
  // if cart is empty runder modal box
  if (cart.cartItems.length === 0) {
    // runder modal box
    document.querySelector(".js-modal-container").style.display = "block";

    document.querySelector(".js-modal").innerHTML = `
   
          <span class="close-btn">&times;</span>
          <h3 class="modal-title">Your cart is empty...</h3>
          <div class="modal-content js-modal-content">
            <p>please add some products</p>
          </div>
          <div class="js-modal-buttons">
            <a href="amazon.html" class="button-primary">Browse products</a>
          </div>
      
        `;
    // handle modal close button
    document.querySelector(".close-btn").addEventListener("click", () => {
      document.querySelector(".js-modal-container").style.display = "none";
    });
    return;
  }

  try {
    const response = await fetch("https://supersimplebackend.dev/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: cart }),
    });

    const order = await response.json();

    if (order.errorMessage) {
      throw error;
    }

    if (order) {
      cart.resetCart();
    }

    addOrder(order);

    window.location.href = "orders.html";
  } catch (error) {
    console.log("error", error);
  }
}
