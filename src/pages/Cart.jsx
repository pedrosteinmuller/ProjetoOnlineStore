import { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartItems, addItem, removeItem } from '../services/itemCartAPI';

class Cart extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const products = await getCartItems();
    this.setState({ products });
  }

  removeAllItens = (title) => {
    const productList = getCartItems();
    productList.forEach((item) => item.title === title && removeItem(item));
    const products = getCartItems();
    this.setState({ products });
  };

  amouthCart = (element) => {
    const productList = getCartItems();
    productList.forEach((item) => {
      if (item.title === element.title && item.quantity < item.available_quantity) {
        removeItem(element);
        const storage = {
          title: element.title,
          price: element.price,
          thumbnail: element.thumbnail,
          quantity: element.quantity + 1,
          available_quantity: element.available_quantity,
        };
        addItem(storage);
      }
    });
    const products = getCartItems();
    this.setState({ products });
  };

  decreaseCart = (element) => {
    const productList = getCartItems();
    productList.forEach((item) => {
      if (item.title === element.title) {
        removeItem(element);
        const storage = {
          title: element.title,
          price: element.price,
          thumbnail: element.thumbnail,
          quantity: element.quantity - 1,
          available_quantity: element.available_quantity,
        };
        if (storage.quantity > 0) {
          addItem(storage);
        }
      }
    });
    const products = getCartItems();
    this.setState({ products });
  };

  // moveToCheckout = () => {
  //   const { history } = this.props;
  //   history.push('/cart/checkout');
  // };

  render() {
    const { products } = this.state;

    return (
      <section>
        {products.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) }
        {products.length !== 0 ? products
          .map((element, id) => (
            <div key={ id }>
              <p data-testid="shopping-cart-product-name">{element.title}</p>
              <p>{element.price}</p>
              <p data-testid="shopping-cart-product-quantity">{element.quantity}</p>
              <button
                data-testid="remove-product"
                type="button"
                onClick={ () => this.removeAllItens(element.title) }
              >
                Remover
              </button>
              <button
                data-testid="product-decrease-quantity"
                type="button"
                onClick={ () => this.decreaseCart(element) }
              >
                -
              </button>
              <button
                data-testid="product-increase-quantity"
                type="button"
                onClick={ () => this.amouthCart(element) }
              >
                +
              </button>
            </div>
          )) : null}
        <button
          data-testid="checkout-products"
          type="button"
          onClick={ this.moveToCheckout }
        >
          Finalizar compra
        </button>
      </section>
    );
  }
}
Cart.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Cart;
