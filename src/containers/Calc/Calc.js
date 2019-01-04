import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';

const RegNumbers = /[0-9]/;
const RegSigns = /[/\+\-\*]/;

class Calculator extends Component {
    state = { 
        inputValue: ''
     
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value})
    }

    handleKeyDown = (event) => {
        if(RegNumbers.exec(event.key)) {
            console.log('number' + event.key)
        } else if (RegSigns.exec(event.key)) {
            console.log('sign' + event.key)
        }
        return

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