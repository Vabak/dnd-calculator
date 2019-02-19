import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components'
import Calculator from './containers/Calc/Calc'


import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

const Headline = styled.h1`
  font-weight: normal;
  text-transform: uppercase;
`;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Headline>Reactive drag-n-drop calculator</Headline>
        <Calculator />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
 