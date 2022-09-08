import { Component } from 'react';
import { getCategories } from '../services/api';

// import { getProductsFromCategoryAndQuery } from '../services/api';
import { Link } from 'react-router-dom';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [],
    };
  }

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({
      categories,
    });
  }

  render() {
    const { categories } = this.state;
    return (
      <main>
        <section
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
          <div>
            <Link
              data-testid="shopping-cart-button"
              to="/Cart"
            />
          </div>
        </section>
        {categories.map((category) => (
          <button
            className="button-categories"
            type="button"
            data-testid="category"
            name="category"
            key={ category.id }
            // onClick={ async () => {
            //   const product = await getProductsFromCategoryAndQuery(category.name);
            //   const {results} = product;
            //   this.setState({
            //     product
            //   })
            // } }
          >
            {category.name}
          </button>
        ))}

      </main>
    );
  }
}
export default Home;
