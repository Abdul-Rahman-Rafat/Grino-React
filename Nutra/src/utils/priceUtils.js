export function getDiscountedPrice(product) {
  return product.price - (product.price * product.discountPercentage) / 100;
}

export function formatPrice(value) {
  return `$ ${Number(value).toFixed(2)}`;
}

export function getCartItemsCount(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export function getCartTotal(cart) {
  return cart.reduce(
    (total, item) => total + getDiscountedPrice(item) * item.quantity,
    0,
  );
}
