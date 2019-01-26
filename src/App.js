import React, { Component } from 'react';
import './App.css';
import Calculator from './containers/Calc/Calc'

import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Calculator</h1>
        <Calculator />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
 