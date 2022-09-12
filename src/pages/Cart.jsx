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

  componentDidMount() {
    const products = getCartItems();
    this.setState({ products });
  }

  removeAllItens = (title) => {
    const productList = getCartItems();
    productList.forEach((item) => item.title === title && removeItem(item));
    const products = getCartItems();
    this.setState({ products });
  };

  amouthCart = (unit) => {
    const productList = getCartItems();
    productList.forEach((item) => {
      if (item.title === unit.title && item.quantity < item.available_quantity) {
        removeItem(unit);
        const storage = {
          title: unit.title,
          price: unit.price,
          thumbnail: unit.thumbnail,
          quantity: unit.quantity + 1,
          available_quantity: unit.available_quantity,
        };
        addItem(storage);
      }
    });
    const products = getCartItems();
    this.setState({ products });
  };

  decreaseCart = (unit) => {
    const productList = getCartItems();
    productList.forEach((item) => {
      if (item.title === unit.title) {
        removeItem(unit);
        const storage = {
          title: unit.title,
          price: unit.price,
          thumbnail: unit.thumbnail,
          quantity: unit.quantity - 1,
          available_quantity: unit.available_quantity,
        };
        if (storage.quantity > 0) {
          addItem(storage);
        }
      }
    });
    const products = getCartItems();
    this.setState({ products });
  };

  // moveCheckout = () => {
  //   const { history } = this.props;
  //   history.push('/cart/checkout');
  // };

  render() {
    const { products } = this.state;
    return (
      <section>
        {products.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          products
            .map((unit) => (
              <div
                key={ unit.id }
              >
                <h1 data-testid="shopping-cart-product-name">{unit.title}</h1>
                <img
                  src={ unit.thumbnail }
                  alt={ unit.title }
                />
                <p>{unit.price}</p>
                <p data-testid="shopping-cart-product-quantity">{unit.quantity}</p>

                <button
                  data-testid="remove-product"
                  type="button"
                  onClick={ () => this.removeAllItens(unit.title) }
                >
                  Remover
                </button>
                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  onClick={ () => this.decreaseCart(unit) }
                >
                  -
                </button>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  onClick={ () => this.amouthCart(unit) }
                >
                  +
                </button>
              </div>
            )))}
        {/* <button
          data-testid="checkout-products"
          type="button"
          onClick={ this.moveCheckout }
        >
          Finalizar compra
        </button> */}
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
