export let orders = JSON.parse(localStorage.getItem("orders")) || [];
export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}
function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
export function getOrder(orderId) {
  return orders.find((order) => order.id === orderId);
}

export function cancelOrder(orderId) {
  orders = orders.filter((order) => order.id !== orderId);
  saveToStorage();
}
