import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayMentSummary } from "./checkout/paymentSummary.js";
import { loadsProducts } from "../data/products.js";
loadsProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPayMentSummary();
});
