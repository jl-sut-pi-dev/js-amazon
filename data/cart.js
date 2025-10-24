export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionId: "2",
  },
  {
    productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity: 1,
    deliveryOptionId: "1",
  },
];

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
export function updateDeliveryOption(productId, deliveryOptionId) {
  let filteredCart;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      filteredCart = cartItem;
    }
  });
  console.log(deliveryOptionId);
  console.log(filteredCart);
  filteredCart.deliveryOptionId = deliveryOptionId;
  console.log(filteredCart);
  saveToLocalStorage();
}
