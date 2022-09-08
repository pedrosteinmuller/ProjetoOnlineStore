import React from 'react';
import * as api from './services/api';

api.getCategories().then((categories) => { console.log(categories); });

function App() {
  return (
    <div>App</div>
  );
}

export default App;
