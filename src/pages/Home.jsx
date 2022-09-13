import { Component } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery, catById } from '../services/api';
import '../CSS/home.css';
// import storageProducts from '../services/storageProducts';
import { getCartItems, removeItem, addItem } from '../services/itemCartAPI';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      queryValue: '',
      products: [],
      clickCategories: [],
      sumCartItens: 0,
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.totalCartItens();
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
    this.totalCartItens();
  };

  totalCartItens() {
    const totalItens = getCartItems();

    if (totalItens) {
      let cartItens = 0;
      totalItens.forEach((item) => {
        cartItens += item.quantity;
        this.setState({ sumCartItens: cartItens });
      });
    }
  }

  render() {
    const {
      categories, products, queryValue, clickCategories, sumCartItens,
    } = this.state;
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
          <div>
            <Link
              data-testid="shopping-cart-button"
              to="/Cart"
            >
              <p data-testid="shopping-cart-size">
                {`Carrinho: ${sumCartItens}`}
              </p>
            </Link>
          </div>
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
                  onClick={ () => this.storageProducts(product) }
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
                    onClick={ () => this.storageProducts(product) }
                  >
                    Adicionar ao carrinho
                  </button>
                </div>
              </div>
            ))) : <p>Nenhum produto foi encontrado</p>}
        </section>
      </main>
    );
  }
}
export default Home;
