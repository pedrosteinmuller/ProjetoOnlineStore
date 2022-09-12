import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import StarRating from '../components/Rate';

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
        <form>
          <label htmlFor="email">
            Email:
            <input
              data-testid="product-detail-email"
              id="email"
              type="email"
              name="email"
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
