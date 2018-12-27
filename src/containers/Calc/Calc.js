import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';


class Calculator extends Component {
    state = { 
        inputValue: ''
     
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value})
    }
    render() { 
        return (
            <InputRow
            handleChange={this.handleChange}
            value={this.state.inputValue} />
        );
    }
}
 
export default Calculator;