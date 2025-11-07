import { getOrder } from "../data/orders.js";
import { getProduct, loadProductFetch, products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function LoadTrackingPage() {
  await loadProductFetch();

  // get orderId and proudctId form tracking url
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  // get the data
  const product = getProduct(productId);
  const order = getOrder(orderId);

  // get product deatail to get delivery date
  const productDetail = order.products.find(
    (product) => product.productId === productId
  );

  const date = dayjs(productDetail.estimatedDeliveryTime).format(
    "dddd, MMMM D"
  );

  document.querySelector(".js-tacking-order");
  document.querySelector(
    ".js-order-tracking"
  ).innerHTML = ` <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">Arriving on ${date}</div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">Quantity: ${productDetail.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />

        <div class="progress-labels-container">
          <div class="progress-label">Preparing</div>
          <div class="progress-label current-status">Shipped</div>
          <div class="progress-label">Delivered</div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`;
}
LoadTrackingPage();
