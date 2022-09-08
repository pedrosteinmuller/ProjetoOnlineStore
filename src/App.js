import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import * as api from './services/api';

api.getCategories().then((categories) => { console.log(categories); });

function App() {
  return (
    <BrowserRouter>
      <switch>
        <Route exact path="/" component={ Home } />
      </switch>
    </BrowserRouter>
  );
}

export default App;
