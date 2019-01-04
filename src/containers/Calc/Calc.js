import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';


class Calculator extends Component {
    state = { 
        inputValue: ''
     
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value})
    }

    handleKeyDown = (event) => {
        console.log(event.key)
    }
    render() { 
        return (
            <div>
                <InputRow
            handleChange={this.handleChange}
            value={this.state.inputValue}
            keyDown={this.handleKeyDown} />
            <InputRow
            handleChange={this.handleChange}
            value={this.state.inputValue} />
            </div>
            
        );
    }
}
 
export default Calculator;