import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { getCartItems } from '../services/itemCartAPI';

class Checkout extends Component {
  state = {
    products: [],
    fullname: '',
    email: '',
    phone: '',
    cpf: '',
    cep: '',
    address: '',
    pay: '',
    redirectUser: false,
    validation: false,
  };

  componentDidMount() {
    const products = getCartItems();
    this.setState({ products });
  }

  handleChangeInputs = ({ target }) => {
    const { value, name } = target;

    this.setState({
      [name]: value,
    });
  };

  handleButtonSubmit = (event) => {
    event.preventDefault();
    const { fullname, email, phone, cpf, cep, address, pay } = this.state;
    if (fullname && email && phone && cpf && cep && address && pay) {
      localStorage.setItem('detailProducts', JSON.stringify([]));
      this.setState({ redirectUser: true }, () => {
        this.setState({
          fullname: '',
          email: '',
          phone: '',
          cpf: '',
          cep: '',
          address: '',
          pay: '',
        });
      });
    } else {
      this.setState({
        validation: true,
      });
    }
  };

  render() {
    const { products, fullname, email, phone,
      cpf, cep, address, redirectUser, validation } = this.state;
    return (
      <div>
        <div>
          {products.length === 0 ? <h1>A lista de produtos está vazia!</h1> : (
            products.map((element, index) => (
              <div key={ index }>
                <div>
                  <img src={ element.thumbnail } alt={ element.title } />
                  <p>{element.title}</p>
                  <p>{`Valor do produto: ${element.price}`}</p>
                </div>
              </div>
            )))}
        </div>
        <form>
          <h2>Informações do Comprador</h2>
          <div>
            <label htmlFor="fullname">
              <input
                data-testid="checkout-fullname"
                id="fullname"
                type="text"
                name="fullname"
                value={ fullname }
                placeholder="Nome Completo"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="email">
              <input
                data-testid="checkout-email"
                id="email"
                type="text"
                name="email"
                value={ email }
                placeholder="Email"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="cpf">
              <input
                data-testid="checkout-cpf"
                id="cpf"
                type="text"
                name="cpf"
                value={ cpf }
                placeholder="Digite um CPF no formato: xxx.xxx.xxx-xx"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="phone">
              <input
                data-testid="checkout-phone"
                id="phone"
                type="text"
                name="phone"
                value={ phone }
                placeholder="Telefone"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="cep">
              <input
                data-testid="checkout-cep"
                id="cep"
                type="text"
                name="cep"
                value={ cep }
                placeholder="CEP"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="address">
              <input
                data-testid="checkout-address"
                id="address"
                type="text"
                name="address"
                value={ address }
                placeholder="Endereço"
                onChange={ this.handleChangeInputs }
              />
            </label>
          </div>
          <div>
            <label htmlFor="pay1">
              Boleto
              <input
                type="radio"
                name="pay"
                id="pay1"
                data-testid="ticket-payment"
                value="Boleto"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="pay2">
              Visa
              <input
                type="radio"
                name="pay"
                id="pay2"
                data-testid="visa-payment"
                value="Visa"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="pay3">
              Master Card
              <input
                type="radio"
                name="pay"
                id="pay3"
                data-testid="master-payment"
                value="Master-card"
                onChange={ this.handleChangeInputs }
              />
            </label>
            <label htmlFor="pay4">
              Elo
              <input
                type="radio"
                name="pay"
                id="pay4"
                data-testid="elo-payment"
                value="Elo"
                onChange={ this.handleChangeInputs }
              />
            </label>
          </div>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.handleButtonSubmit }
          >
            Comprar

          </button>
        </form>
        {
          redirectUser && <Redirect to="/" />
        }
        {
          validation && <p data-testid="error-msg">Campos inválidos</p>
        }
      </div>
    );
  }
}
export default Checkout;
