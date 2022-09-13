import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './pages/Home';
import './CSS/body.css';
import ProductsDetails from './pages/ProductsDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/ProductsDetails/:id" component={ ProductsDetails } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/cart/checkout" component={ Checkout } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
