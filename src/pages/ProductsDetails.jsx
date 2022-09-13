import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductById } from '../services/api';
import storageProducts from '../services/storageProducts';
import '../CSS/StarRating.css';

class ProductsDetails extends Component {
  state = {
    cartProducts: {},
    userEmail: '',
    userText: '',
    rating: 0,
    hover: 0,
    valRt: false,
    valEm: false,
    evaluations: [],
  };

  componentDidMount() {
    this.productDetails();
  }

  productDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const savedReviews = JSON.parse(localStorage.getItem(id));
    const details = await getProductById(id);
    this.setState({
      cartProducts: details,
    });
    if (savedReviews) {
      this.setState({ evaluations: [...savedReviews] });
    }
  };

  handleChange = (e) => {
    const { userEmail } = this.state;
    this.setState({
      userEmail: e.target.value,
    });
    const patternEmail = userEmail
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      );
    if (patternEmail) {
      this.setState({
        valEm: true,
      });
    }
    // https://stackoverflow.com/questions/41348459/regex-in-react-email-validation -> referencia para fazer a validacao
  };

  handleClickSubmit = (e) => {
    e.preventDefault();
    const { userEmail, userText, rating, evaluations } = this.state;
    const { match: { params: { id } } } = this.props;
    const posts = { email: userEmail, text: userText, rating };
    this.setState((prevState) => ({
      evaluations: [...prevState.evaluations, posts],
      userEmail: '',
      userText: '',
      rating: 0,
      hover: 0,
    }));
    localStorage.setItem(id, JSON.stringify(evaluations));
  };

  render() {
    const { rating, hover, cartProducts, userEmail,
      userText, valEm, valRt, evaluations } = this.state;
    const validation = valEm && valRt;
    const starsNumber = 5;
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
            onClick={ () => storageProducts(cartProducts) }
          >
            Adicionar ao carrinho
          </button>
        </div>
        <form>
          <hr />
          {!validation && <p data-testid="error-msg">Campos inválidos</p>}

          <h3>Avaliações</h3>
          <label htmlFor="email">
            Email:
            <input
              data-testid="product-detail-email"
              id="email"
              type="email"
              name="email"
              value={ userEmail }
              placeholder="exemplo@exemplo.com"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="usermensage">
            <textarea
              id="usermensage"
              cols="40"
              rowls="10"
              name="usermensage"
              value={ userText }
              placeholder="Mensagem (opcional)"
              data-testid="product-detail-evaluation"
              onChange={ (e) => {
                this.setState({ userText: e.target.value });
              } }
            />
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleClickSubmit }
          >
            Avaliar
          </button>
          <div className="star-rating-area">
            {[...Array(starsNumber)].map((star, index) => {
              index += 1;
              return (
                <button
                  data-testid={ `${index}-rating` }
                  type="button"
                  key={ index }
                  value={ rating }
                  className={ index <= (hover || rating) ? 'on' : 'off' }
                  onClick={ () => this.setState({ rating: index, valRt: true }) }
                  onMouseEnter={ () => this.setState({ hover: index }) }
                  onMouseLeave={ () => this.setState({ rating }) }
                  // https://www.w3schools.com/jsref/event_onmouseenter.asp
                  // referencia para realizar o StarRating
                  // https://www.youtube.com/watch?v=eDw46GYAIDQ
                >
                  <span>&#9733;</span>
                </button>
              );
            })}
          </div>
        </form>
        {
          evaluations.length > 0 && evaluations.map((item, index) => (
            <div key={ index }>
              <p data-testid="review-card-email">{item.email}</p>
              <div>
                {[...Array(item.rating)].map((star, i) => {
                  i += 1;
                  return (
                    <button
                      data-testid="review-card-rating"
                      type="button"
                      key={ i }
                      className="on"
                    >
                      <span>&#9733;</span>
                    </button>
                  );
                })}
              </div>
              <p data-testid="review-card-evaluation">{item.text}</p>
            </div>
          ))
        }
      </div>
    );
  }
}

ProductsDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string.isRequired,
  }).isRequired,
  }).isRequired,
};
export default ProductsDetails;
