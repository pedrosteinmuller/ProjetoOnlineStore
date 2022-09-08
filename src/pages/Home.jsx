import { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <main>
        <section
          data-testid="home-initial-message"
        >
          Digite algum termo de pesquisa ou escolha uma categoria.
        </section>
        {/* <button
          type="submit"
        >
          Pesquisar
        </button> */}
      </main>
    );
  }
}
export default Home;
