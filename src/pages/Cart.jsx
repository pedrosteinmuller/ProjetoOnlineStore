import React, { Component } from 'react';

class Cart extends Component {
  state = {
    cartProducts: [],
  };

  render() {
    const { cartProducts } = this.state;
    return (
      <div>
        <h1>Carrinho de produtos</h1>
        {
          cartProducts.length === 0 && (
            <span
              data-testid="shopping-cart-empty-message"
            >
              Seu carrinho está vazio
            </span>
          )
        }
      </div>
    );
  }
}

export default Cart;
