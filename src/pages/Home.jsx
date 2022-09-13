import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery, catById } from '../services/api';
import '../CSS/home.css';
import storageProducts from '../services/storageProducts';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      queryValue: '',
      products: [],
      clickCategories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  handleInput = ({ target }) => {
    const { value } = target;
    this.setState({
      queryValue: value,
    });
  };

  handleClickProducts = async () => {
    const { queryValue } = this.state;
    const fetchProducts = await getProductsFromCategoryAndQuery(undefined, queryValue);
    const { results } = fetchProducts;
    this.setState({
      products: results,
    });
  };

  handleClickCategories = async (id) => {
    const products = await catById(id);
    this.setState({
      clickCategories: products.results,
    });
  };

  render() {
    const { categories, products, queryValue, clickCategories } = this.state;
    return (
      <main>
        <section
          data-testid="home-initial-message"
          className="categories"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
          <input
            data-testid="query-input"
            type="text"
            placeholder="O que buscas?"
            name={ queryValue }
            value={ queryValue }
            onChange={ this.handleInput }
          />
          <button
            data-testid="query-button"
            type="button"
            onClick={ this.handleClickProducts }
          >
            Pesquisar
          </button>
        </section>
        <section>
          {categories.map((category) => (
            <button
              className="button-categories"
              type="button"
              data-testid="category"
              name="category"
              key={ category.id }
              onClick={ () => this.handleClickCategories(category.id) }
            >
              {category.name}
            </button>
          ))}
        </section>
        <section>
          {
            clickCategories.map((product) => (
              <div key={ product.id }>
                <Link
                  to={ `/ProductsDetails/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <div data-testid="product">
                    <h4>{product.title}</h4>
                    <h5>{`Preço: R$ ${product.price}`}</h5>
                    <img src={ product.thumbnail } alt={ product.title } />
                  </div>
                </Link>
                <button
                  type="button"
                  name="product-add-to-cart"
                  data-testid="product-add-to-cart"
                  onClick={ () => storageProducts(product) }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            ))
          }
        </section>
        <section className="product">
          { products.length !== 0 ? (
            products.map((product, index) => (
              <div
                data-testid="product"
                key={ index }
              >
                <Link
                  to={ `/ProductsDetails/${product.id}` }
                  data-testid="product-detail-link"
                >
                  <h4>{product.title}</h4>
                  <h5>{`Preço: R$ ${product.price}`}</h5>
                  <img
                    src={ product.thumbnail }
                    alt={ product.title }
                  />
                </Link>
                <div>
                  <button
                    type="button"
                    name="product-add-to-cart"
                    data-testid="product-add-to-cart"
                    disabled={ isDisabled }
                    onClick={ () => storageProducts(product) }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))) : <p>Nenhum produto foi encontrado</p>}
        </section>
        <div>
          <Link
            data-testid="shopping-cart-button"
            to="/Cart"
          >
            Carrinho
          </Link>
        </div>
      </main>
    );
  }
}
export default Home;
