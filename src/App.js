import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

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
