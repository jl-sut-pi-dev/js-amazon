import { cart } from "../data/cart-calss.js";
import { cancelOrder, orders } from "../data/orders.js";
import { getProduct, loadProductFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function loadOrderPage() {
  await loadProductFetch();
  let orderHtml = "";
  console.log(orders);

  orders.forEach((order) => {
    const orderDate = dayjs(order.orderTime).format("MMMM D");

    orderHtml += `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderDate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
          ${renderDetail(order)}
      
      </div>
      `;
  });
  document.querySelector(".js-orders-grid").innerHTML = orderHtml;
  function renderDetail(order) {
    let orderDetails = "";

    order.products.forEach((productDetail) => {
      const product = getProduct(productDetail.productId);

      const deliveryDate = dayjs(productDetail.estimatedDeliveryTime).format(
        "MMMM D"
      );

      orderDetails += `
  <div class="order-details-grid">
      <div class="product-image-container">
        <img src="${product.image}" />
      </div>
      <div class="product-details">
        <div class="product-name">
          ${product.name}
        </div>
        <div class="product-delivery-date">Arriving on:${deliveryDate}</div>
        <div class="product-quantity">Quantity: ${productDetail.quantity}</div>
        <button class="buy-again-button button-primary  js-buy-it-again" data-product-id=${product.id}>
          <img class="buy-again-icon" src="../images/icons/buy-again.png" />
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html?productId=${product.id}&orderId=${order.id}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
        <button class="track-package-button cancel-order js-cancel-order" data-order-id=${order.id}>
            Cancel order
        </button>
      </div>
  </div>
`;
    });

    return orderDetails;
  }
  document.querySelectorAll(".js-buy-it-again").forEach((button) => {
    button.addEventListener("click", () => {
      const { productId } = button.dataset;

      cart.addToCart(productId, 1);
      button.innerHTML = "Added";

      setTimeout(() => {
        button.innerHTML = `
         <img class="buy-again-icon" src="../images/icons/buy-again.png" />
         <span class="buy-again-message">Buy it again</span>
         `;
      }, 1000);
    });
  });
  document.querySelectorAll(".js-cancel-order").forEach((button) => {
    button.addEventListener("click", () => {
      const { orderId } = button.dataset;
      if (orderId) {
        const modalContainer = document.querySelector(".js-modal-container");
        modalContainer.style.display = "block";
        document.querySelector(".js-modal").innerHTML = `
          <span class="close-btn">&times;</span>
          <h3 class="modal-title">You are about to cancel the order</h3>
          <div class="modal-content js-modal-content">
          This will cancel your order <br>Are You Sure
          </div>
          <div class="js-modal-buttons">
            <button class="button-secondary button-outline js-button-cancel">No</button>
            <button class="button-delete js-button-cancel-order">Yes</button>
          </div>
        `;
        document
          .querySelector(".js-button-cancel-order")
          .addEventListener("click", () => {
            cancelOrder(orderId);
            loadOrderPage();
            modalContainer.style.display = "none";
          });
        document
          .querySelector(".js-button-cancel")
          .addEventListener("click", () => {
            modalContainer.style.display = "none";
          });
        document.querySelector(".close-btn").addEventListener("click", () => {
          modalContainer.style.display = "none";
        });
      }
    });
  });
}
loadOrderPage();
