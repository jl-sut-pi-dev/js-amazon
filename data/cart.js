export let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
    cart.push({ productId, quantity: quantity });
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
export function showCalculateCartItem(element, cart) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  element.innerHTML = cartQuantity;
}
export function updateCartQuantity(productId, newQuantity, element) {
  let cartToUpdate;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartToUpdate = cartItem;
    }
  });
  cartToUpdate.quantity = newQuantity;
  showCalculateCartItem(element, cart);
  saveToLocalStorage();
}
