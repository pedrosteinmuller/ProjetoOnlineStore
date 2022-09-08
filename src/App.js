import React, { Component } from 'react';
import * as api from './services/api';

class App extends Component {
  render() {
    return (
      <div>
        {api.getCategories().then((categories) => { console.log(categories); })}
      </div>
    );
  }
}

export default App;
