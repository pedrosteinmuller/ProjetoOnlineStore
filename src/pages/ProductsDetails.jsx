import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';

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
    console.log(details);
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
