import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import '../CSS/home.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      queryValue: '',
      products: [],
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
    const fetchProducts = await getProductsFromCategoryAndQuery(queryValue);
    this.setState({
      products: fetchProducts.results,
    });
  };

  render() {
    const { categories, products, queryValue } = this.state;
    return (
      <main>
        <section
          data-testid="home-initial-message"
          className="categories"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
          <div>
            <Link
              data-testid="shopping-cart-button"
              to="/Cart"
            />
          </div>
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
            >
              {category.name}
            </button>
          ))}
        </section>
        <section className="product">
          {products.map((product) => (
            <div data-testid="product" key={ product.id } className="products">
              <h4>{products.title}</h4>
              <h5>{`Preço: R$ ${product.price}`}</h5>
              <img src={ product.thumbnail } alt={ product.title } />
            </div>
          ))}
          { products.length === 0 && (
            <p>Nenhum produto foi encontrado</p>
          )}
        </section>
      </main>
    );
  }
}
export default Home;
