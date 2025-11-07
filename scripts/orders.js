import { cart } from "../data/cart-calss.js";
import { orders } from "../data/orders.js";
import { getProduct, loadProductFetch } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

loadProductFetch().then(() => {
  let orderHtml = "";

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
});
