import { cart } from "../../data/cart-calss.js";
import { loadsProducts, loadProductFetch } from "../../data/products.js";
import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";

// integration test (test many units/pieces of code working together)
describe("test suite : render order summary", () => {
  const productId1 = "e43638ce-6aa0-4b85-b27f-e1d07eb678c6";
  const productId2 = "15b6fc6f-327a-4ec4-896f-486349e85a3d";
  // BeforeEach (jasmine's hook)

  beforeAll((done) => {
    loadProductFetch().then(() => {
      done();
    });
  });
  beforeEach(() => {
    spyOn(localStorage, "setItem");
    document.querySelector(".js-test-container").innerHTML = `
       <div class="js-order-summary"></div>
       <div class="js-payment-summary"></div>
       <div class="js-checkout-header"></div>
    `;

    cart.cartItems = [
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: "1",
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: "2",
      },
    ];
    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector(".js-test-container").innerHTML = "";
  });
  it("displays the cart", () => {
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      2
    );
    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain("Quantity: 2");
    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain("Quantity: 1");
    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain("$10.90");
    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain("Black and Gray Athletic Cotton Socks - 6 Pairs");
    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain("$20.95");
    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain("Intermediate Size Basketball");
  });
  it("removes a product", () => {
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll(".js-cart-item-container").length).toEqual(
      1
    );
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual(productId2);
  });
  it("update delivery option", () => {
    document.querySelector(`.js-delivery-option-${productId1}-2`).click();
    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-2`)
        .checked
    ).toEqual(true);

    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(productId1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("2");

    expect(
      document.querySelector(".js-payment-summary-shipping").innerText
    ).toEqual("$5.27");
    expect(
      document.querySelector(".js-payment-summary-total").innerText
    ).toEqual("$58.00");
  });
  it("does noting if delivery option does not exist", () => {
    cart.updateDeliveryOption(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      "does-not-exist"
    );
    expect(cart.cartItems.length).toEqual(2);
    expect(cart.cartItems[0].productId).toEqual(
      "e43638ce-6aa0-4b85-b27f-e1d07eb678c6"
    );
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
