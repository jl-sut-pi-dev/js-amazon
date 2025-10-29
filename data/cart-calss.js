import { validDeliveryOption } from "./deliveryOptions.js";
class Cart {
  #localStorageKey;
  cartItem;
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }
  #loadFromStorage() {
    this.cartItems =
      JSON.parse(localStorage.getItem(this.#localStorageKey)) || [];
  }
  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  addToCart(productId, quantity) {
    let exitingObj;
    //check alreday exist in the cart or not
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        exitingObj = cartItem;
      }
    });

    // add quantity if already in the cart and if not push to the carts
    // cart quantity with cartQuantity
    if (exitingObj) {
      exitingObj.quantity += quantity;
    } else {
      this.cartItems.push({
        productId,
        quantity: quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToLocalStorage();
  }
  deleteFromCart(productId) {
    const filteredCart = this.cartItems.filter(
      (cartItem) => cartItem.productId !== productId
    );

    this.cartItems = filteredCart;
    this.saveToLocalStorage();
  }
  updateCartQuantity(productId, newQuantity) {
    let cartToUpdate;
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartToUpdate = cartItem;
      }
    });
    cartToUpdate.quantity = newQuantity;
    this.saveToLocalStorage();
  }
  calculateCartItem() {
    let cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    // element.innerHTML = cartQuantity;
    return cartQuantity;
  }
  updateDeliveryOption(productId, deliveryOptionId) {
    let filteredCart;
    const valid = validDeliveryOption(deliveryOptionId);
    if (!valid) {
      return;
    }
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        filteredCart = cartItem;
      }
    });
    if (!filteredCart) {
      return;
    }

    filteredCart.deliveryOptionId = deliveryOptionId;
    this.saveToLocalStorage();
  }
}

export const cart = new Cart("cart-oop");
const businessCart = new Cart("business-cart-oop");
