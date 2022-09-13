import { addItem, getCartItems, removeItem } from './itemCartAPI';

const storageProducts = (element) => {
  const productList = getCartItems();
  const itemInCart = productList.some((item) => item.title === element.title);
  if (itemInCart) {
    productList.forEach((secondItem) => {
      if (secondItem.title === element.title) {
        removeItem(secondItem);
        const storage = {
          title: secondItem.title,
          price: secondItem.price,
          thumbnail: secondItem.thumbnail,
          quantity: secondItem.quantity + 1,
          available_quantity: secondItem.available_quantity,
        };
        addItem(storage);
      }
    });
  } else {
    const storage = {
      title: element.title,
      price: element.price,
      thumbnail: element.thumbnail,
      quantity: 1,
      available_quantity: element.available_quantity,
    };
    addItem(storage);
  }
  // this.Total(); 13
};

export default storageProducts;
