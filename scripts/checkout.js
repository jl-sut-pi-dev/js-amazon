import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayMentSummary } from "./checkout/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";

async function runderChecnout() {
  try {
    await loadProductFetch();
  } catch (error) {
    console.log("error from runderCheckout", error);
  }
  renderCheckoutHeader();
  renderOrderSummary();
  renderPayMentSummary();
}
runderChecnout();
