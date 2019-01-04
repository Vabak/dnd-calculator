import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';

const RegNumbers = /[0-9]/;
const RegSigns = /[/\+\-\*]/;

class Calculator extends Component {
    state = { 
       rows: [
           {
               id: Date.now(),
               data: [],
               solution: '',
           }
       ],
     
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value})
    }

    handleKeyDown = (event, id) => {
        console.log(id)
        if (RegNumbers.exec(event.key)) {
            console.log('number ' + event.key)
        } else if (RegSigns.exec(event.key)) {
            console.log('sign' + event.key)
        } 
        return
    }

    addNumber = (num, id) => {
    }
    render() { 
        let rows = this.state.rows.map(row => (
            <InputRow
            handleChange={this.handleChange}
            value={this.state.inputValue}
            keyDown={this.handleKeyDown}
            key={row.id}
            id={row.id} />   
        ))
        return (
            <div>
                {rows}
            </div>
            
        );
    }
}
 
export default Calculator;