import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';

const RegNumbers = /[0-9]/;
const RegSigns = /[/\+\-\*]/;

class Calculator extends Component {
    state = { 
       rows: [
           {
               id: Date.now(),
               data: '',
               solution: '',
           }
       ],
     
    }

    handleChange = (event) => {
        this.setState({inputValue: event.target.value})
    }

    handleKeyDown = (event, id) => {
        if (RegNumbers.exec(event.key)) {
            // this.addNumber(event.key, id);
        } else if (RegSigns.exec(event.key)) {
        } 
        return
    }

    // addNumber = (num, id) => {
    //     let newRowIndex;
    //     const newRow = this.state.rows.find((row, idx) => {
    //         newRowIndex = idx;
    //         return row.id === id});
    //         newRow.data += num;
    //         const newRows = [...this.state.rows];
    //         newRows[newRowIndex] = newRow;
    //         this.setState({rows: newRows})
    // }

    render() { 
        let rows = this.state.rows.map(row => (
            <InputRow
            handleChange={this.handleChange}
            value={this.state.inputValue}
            keyDown={this.handleKeyDown}
            key={row.id}
            id={row.id}
            mathRow={row.data} />   
        ))
        return (
            <div>
                {rows}
            </div>
            
        );
    }
}
 
export default Calculator;