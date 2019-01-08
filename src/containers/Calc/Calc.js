import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';

const RegNumbers = /[0-9]/;
const RegSigns = /[/\+\-\*]/;

class Calculator extends Component {
    state = {
        row: {
            id: Date.now(),
            checked: false,
            data: [],
        }
    }

    handleInputChange = (event, id) => {
        console.log(RegNumbers.test(event.target.value), RegSigns.test(event.target.value) )
        if (RegNumbers.test(event.target.value)) {
            this.inputChangeNumber(event, id);
        } else if (RegSigns.test(event.target.value)) {
            this.createMathOperator(event.target.value)
        }
        return
    }

    inputChangeNumber = (event, id) => {
        let newValueIndex = null;
        const newValue = this.state.row.data.find((elem, index) => {
            newValueIndex = index
            return elem.id === id;
        })
        newValue.value = event.target.value;
        let newData = [...this.state.row.data];
        newData.newValueIndex = newValue;
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData,
            }
        })
        // this.setState({ inputValue: event.target.value })
    }

    handleKeyDown = (event, id) => {
        if (RegNumbers.test(event.key)) {
            this.checkNum(event.key, id);
        } else if (RegSigns.test(event.key)) {
            
        }
        return
    }

    checkNum = (num, id) => {
            if (this.state.row.data.length === 0) {
                this.createNumber(num);
                return;
            }
        return;
    }

    createNumber = (num) => {
        let newData = [...this.state.row.data];
        const newNumber = { 
            id: Date.now(),
            value: num,
            type: 'number',
        };
        newData.push(newNumber);
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData,
            }
        })
    }
    
    createMathOperator = (operator) => {
        console.log('math')
        let newData = [...this.state.row.data];
        const newOperator = { 
            id: Date.now(),
            value: operator,
            type: 'operator'
        };
        newData.push(newOperator);
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData,
            }
        })
    }
    // checkNum = (num, id) => {
    //     let newRowIndex;
    //     const newRow = this.state.rows.find((row, idx) => {
    //         newRowIndex = idx;
    //         return row.id === id
    //     });
    //     newRow.data += num;
    //     const newRows = [...this.state.rows];
    //     newRows[newRowIndex] = newRow;
    //     this.setState({ rows: newRows })
    // }

    render() {
        return (
            <div>
                <InputRow keyDown={this.handleKeyDown} 
                handleInput={this.handleInputChange}
                rowId={this.state.row.id}
                values={this.state.row.data} />
            </div>

        );
    }
}

export default Calculator;