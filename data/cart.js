import { validDeliveryOption } from "./deliveryOptions.js";

export let cart;
loadFromStorage();
function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
export function addToCart(productId, quantity) {
  let exitingObj;
  //check alreday exist in the cart or not
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      exitingObj = cartItem;
    }
  });

  // add quantity if already in the cart and if not push to the carts
  // cart quantity with cartQuantity
  if (exitingObj) {
    exitingObj.quantity += quantity;
  } else {
    cart.push({ productId, quantity: quantity, deliveryOptionId: "1" });
  }

  saveToLocalStorage();
}

export function deleteFromCart(productId) {
  const filteredCart = cart.filter(
    (cartItem) => cartItem.productId !== productId
  );

  cart = filteredCart;
  saveToLocalStorage();
}

export function updateCartQuantity(productId, newQuantity) {
  let cartToUpdate;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartToUpdate = cartItem;
    }
  });
  cartToUpdate.quantity = newQuantity;
  saveToLocalStorage();
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let filteredCart;
  const valid = validDeliveryOption(deliveryOptionId);
  if (!valid) {
    return;
  }
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      filteredCart = cartItem;
    }
  });
  if (!filteredCart) {
    return;
  }

  filteredCart.deliveryOptionId = deliveryOptionId;
  saveToLocalStorage();
}
export function calculateCartItem(cart) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  // element.innerHTML = cartQuantity;
  return cartQuantity;
}
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
}
