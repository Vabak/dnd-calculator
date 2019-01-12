import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';

const OPERATORS = ['/', '+', '-', '*'];

class Calculator extends Component {
    state = {
        row: {
            id: Date.now(),
            checked: false,
            data: [],
        }
    }

    handleInputChange = (event, id) => {
    event.stopPropagation();
        if (OPERATORS.includes(event.target.value.slice(-1))) {
            this.createMathOperator(event.target.value.slice(-1)) 
            // event.target.blur();
        } else if (event.target.value.match(/[0-9]+/) || event.target.value === '') {
            this.inputChangeNumber(event, id);
        }    
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
    }

    handleKeyDown = (event, id) => {
        if (event.key.match(/[0-9]+/)) {
            this.checkNum(event.key, id);
        } else if (event.key === 'Backspace') {
            this.deleteElement()
        }
        return
    }

    deleteElement() {
        let newData = [...this.state.row.data];
        newData.pop();
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData,
            }
        })

    }

    checkNum = (num, id) => {
        // if row is empty or last element is operator
            if (this.state.row.data.length === 0 || this.state.row.data[this.state.row.data.length-1].type === 'operator') {
                this.createNumber();
                return;
            }
        return;
    }

    createNumber = () => {
        let newData = [...this.state.row.data];
        const newNumber = { 
            id: Date.now(),
            value: '',
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

    // getInputRef = (node) => {
    //     this.inputEl = node;
    // }
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
                <InputRow 
                handleInput={this.handleInputChange}
                keyDown={this.handleKeyDown} 
                rowId={this.state.row.id}
                values={this.state.row.data} />
            </div>

        );
    }
}

export default Calculator;