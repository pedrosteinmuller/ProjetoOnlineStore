const keyCartItem = 'detailProducts';

if (!JSON.parse(localStorage.getItem(keyCartItem))) {
  localStorage.setItem(keyCartItem, JSON.stringify([]));
}
const readingCart = () => JSON.parse(localStorage.getItem(keyCartItem));

const saveCart = (cartItems) => localStorage
  .setItem(keyCartItem, JSON.stringify(cartItems));

export const getCartItems = () => {
  const cartItems = readingCart();
  return (cartItems);
};

export const addItem = (item) => {
  if (item) {
    const cartItems = readingCart();
    saveCart([...cartItems, item]);
  }
};

export const removeItem = (item) => {
  const cartItems = readingCart();
  saveCart(cartItems.filter((save) => save.title !== item.title));
};
