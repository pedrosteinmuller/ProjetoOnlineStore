import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import StarRating from '../components/Rate';
import { addItem, getCartItems, removeItem } from '../services/itemCartAPI';

class ProductsDetails extends Component {
  state = {
    cartProducts: {},
  };

  componentDidMount() {
    this.productDetails();
  }

  productDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const details = await getProductById(id);
    this.setState({
      cartProducts: details,
    });
  };

  storageProducts = (element) => {
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

  render() {
    const { cartProducts } = this.state;
    return (
      <div>
        <h1>Carrinho de produtos</h1>
        <div>
          <Link to="/Cart" data-testid="shopping-cart-button">
            Carrinho de compras
          </Link>
        </div>
        <div>
          <div>
            <img
              data-testid="product-detail-image"
              src={ cartProducts.thumbnail }
              alt={ cartProducts.title }
            />
          </div>
          <div>
            <p data-testid="product-detail-name">{ cartProducts.title }</p>
            <p data-testid="product-detail-price">{`Preço: ${cartProducts.price}`}</p>
          </div>
        </div>
        <div>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.storageProducts(cartProducts) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="product-detail-email"
              id="email"
              type="email"
              name="emailUser"
              placeholder="exemplo@exemplo.com"
              required
            />
          </label>
          <label htmlFor="usermensage">
            <textarea
              id="usermensage"
              cols="40"
              rowls="10"
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
            />
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
          >
            Avaliar
          </button>
          <StarRating required />
        </form>
      </div>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductsDetails;
