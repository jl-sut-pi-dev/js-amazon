import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayMentSummary } from "./checkout/paymentSummary.js";
import { loadProductFetch } from "../data/products.js";

/*
Promise.all([
  loadProductFetch(),
  new Promise((resolve) => {
    loadsCart(() => {
      resolve();
    });
  }),
]).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPayMentSummary();
});

*/

async function runderChecnout() {
  await loadProductFetch();

  renderCheckoutHeader();
  renderOrderSummary();
  renderPayMentSummary();
}
runderChecnout();
/*

new Promise((resolve) => {
  console.log("first step");
  loadsProducts(() => {
    console.log("finished");
    resolve("value1");
  });
  console.log("promise");
})

  .then((value) => {
    console.log(value);
    return new Promise((resolve) => {
      loadsCart(() => {
        resolve();
      });
    });
  })

  .then(() => {});

  */
