import { getDeliveryWeekday } from "../data/deliveryOptions.js";
import { getOrder } from "../data/orders.js";
import { getProduct, loadProductFetch, products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

async function LoadTrackingPage() {
  await loadProductFetch();

  // get orderId and proudctId form tracking url
  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");
  // getDeliveryOption()

  getDeliveryWeekday();
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

  //calcuate percentage for tracking label bar
  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetail.estimatedDeliveryTime);

  // Use .diff() to get milliseconds difference
  const percentage =
    (today.diff(orderTime) / deliveryTime.diff(orderTime)) * 100;
  const progress = Math.min(Math.max(percentage, 0), 100);

  const deliveredMessage =
    today < deliveryTime ? "Arriving on" : "Delivered on";

  document.querySelector(".js-tacking-order");
  document.querySelector(
    ".js-order-tracking"
  ).innerHTML = ` <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">${deliveredMessage} ${date}</div>

        <div class="product-info">
         ${product.name}
        </div>

        <div class="product-info">Quantity: ${productDetail.quantity}</div>

        <img
          class="product-image"
          src="${product.image}"
        />

<div class="progress-labels-container">
    <div class="progress-label ${
      progress < 50 ? "current-status" : ""
    }">Preparing</div>
    <div class="progress-label ${
      progress >= 50 && progress < 100 ? "current-status" : ""
    }">Shipped</div>
    <div class="progress-label ${
      progress >= 100 ? "current-status" : ""
    }">Delivered</div>
  </div>

  <div class="progress-bar-container">
    <div class="progress-bar" style="width: ${progress}%;"></div>
  </div>`;
}
LoadTrackingPage();
