export function formatCurrency(productPriceCents) {
  return (Math.round(productPriceCents) / 100).toFixed(2);
}
