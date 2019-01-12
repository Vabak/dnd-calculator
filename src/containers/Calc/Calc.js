import React, { Component } from 'react';

import InputRow from '../InputRow/InputRow';

const OPERATORS = ['/', '+', '-', '*'];

class Calculator extends Component {
    state = {
        row: {
            id: Date.now(),
            checked: false,
            data: [],
            eval: 0,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.row.data !== this.state.row.data) {
            this.calculation()
        }
    }
    handleInputChange = (event, id) => {
        if (OPERATORS.includes(event.target.value.slice(-1))) {
            this.checkOperator(event.target.value.slice(-1)) 
            this.inputFocus()
        } else if (event.target.value.match(/[0-9]+/) || event.target.value === '') {
            this.inputChangeNumber(event, id);
        }    
    }

    setInputRef = element => {
        this.inputElement = element;
    };

    inputFocus() {
        this.inputElement.focus();
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
        } else if (OPERATORS.includes(event.key)) {
            this.checkOperator(event.key)
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

    checkOperator = (operator) => {
        if (this.state.row.data[this.state.row.data.length-1].type === 'number') {
            this.createMathOperator(operator);
        } else if (this.state.row.data[this.state.row.data.length-1].type === 'operator') {
            this.replaceOperator(operator)
        }
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
    replaceOperator = (operator) => {
        let newData = [...this.state.row.data];
        const newOperator = { 
            id: Date.now(),
            value: operator,
            type: 'operator'
        };
        newData[newData.length-1] = newOperator;
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData,
            }
        })
    }

    calculation() {
        if (this.state.row.data.length === 0) return;
        let newEval = 0;
        let equation = '';
        this.state.row.data.map(el => {
            equation = equation + el.value;
        })
        newEval = eval(equation);
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                eval: newEval
        }})
    }

    render() {
        return (
            <div>
                <InputRow 
                inputRef={this.setInputRef}
                handleInput={this.handleInputChange}
                keyDown={this.handleKeyDown} 
                rowId={this.state.row.id}
                values={this.state.row.data}
                eval={this.state.row.eval} />
            </div>

        );
    }
}

export default Calculator;