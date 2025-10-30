import { renderCheckoutHeader } from "./checkout/checkout-header.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPayMentSummary } from "./checkout/paymentSummary.js";
import { loadsProducts } from "../data/products.js";
import { loadsCart } from "../data/cart-calss.js";

Promise.all([
  new Promise((resolve) => {
    loadsProducts(() => {
      resolve();
    });
  }),
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

// new Promise((resolve) => {
//   console.log("first step");
//   loadsProducts(() => {
//     console.log("finished");
//     resolve("value1");
//   });
//   console.log("promise");
// })

//   .then((value) => {
//     console.log(value);
//     return new Promise((resolve) => {
//       loadsCart(() => {
//         resolve();
//       });
//     });
//   })

//   .then(() => {});
console.log("HI KO MICHEL");
