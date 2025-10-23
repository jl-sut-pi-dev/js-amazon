export function showCalculateCartItem(element, cart) {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  element.innerHTML = cartQuantity;
}
