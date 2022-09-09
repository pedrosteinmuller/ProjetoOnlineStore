import React, { Component } from 'react';

class Cart extends Component {
  render() {
    return (
      <div>
        <span
          data-testid="shopping-cart-empty-message"
        >
          Seu carrinho está vazio
        </span>
      </div>
    );
  }
}

export default Cart;
