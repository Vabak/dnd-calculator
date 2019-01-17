import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import InputRow from '../InputRow/InputRow';

const OPERATORS = ['/', '+', '-', '*'];

class Calculator extends Component {
    state = {
        row: {
            id: Date.now().toString(),
            checked: false,
            data: [],
            eval: 0,
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.row.data !== this.state.row.data) this.calculation()
    }

    handleInputChange = (event, id) => {
        if (OPERATORS.includes(event.target.value.slice(-1))) {
            this.checkOperator(event.target.value.slice(-1))
            // this.inputFocus()
        } else if (event.target.value.match(/[0-9]+/) || event.target.value === '') {
            this.inputChangeNumber(event, id);
            // this.calculation()
        }    
    }

    // setInputRef = element => {
    //     this.inputElement = element;
    // };

    // inputFocus() {
    //     this.inputElement.focus();
    // }
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
            this.deleteElement();
        } else if (OPERATORS.includes(event.key)) {
            this.checkOperator(event.key);
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
        if (this.state.row.data[this.state.row.data.length - 1].type === 'number') {
            this.createMathOperator(operator);
        } else if (this.state.row.data[this.state.row.data.length - 1].type === 'operator') {
            this.replaceOperator(operator)
        }
    }
    checkNum = (num, id) => {
        // if row is empty or last element is operator
        if (this.state.row.data.length === 0 || this.state.row.data[this.state.row.data.length - 1].type === 'operator') {
            this.createNumber();
            return;
        }
        return;
    }

    createNumber = () => {
        let newData = [...this.state.row.data];
        const newNumber = {
            id: Date.now().toString(),
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
        newData[newData.length - 1] = newOperator;
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData,
            }
        })
    }

    calculation() {
        if (OPERATORS.includes(equation[equation.length-1])) {
            return;
        }
        if (this.state.row.data.length !== 0){
        let equation = '';
        this.state.row.data.map(el => {
            equation = equation + el.value;
        })}

        // still not work
        const newEval = (string) => {
            // if (string === '') return 0;
            return new Function('return ' + string)();
          }
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                eval: newEval(equation)
        }})
    }
    // Drag and Drop

    onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.draggableId &&
            destination.index === source.index
        ) {
            return;
        }
        const newData = [...this.state.row.data];
        const srcElement = this.state.row.data[source.index]
        console.log(srcElement)
        newData.splice(source.index, 1);
        newData.splice(destination.index, 0, srcElement);
        

        this.setState(this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData
        }}))

    }
    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    <InputRow
                        // inputRef={this.setInputRef}
                        handleInput={this.handleInputChange}
                        keyDown={this.handleKeyDown}
                        rowId={this.state.row.id}
                        values={this.state.row.data}
                        eval={this.state.row.eval} />
                </div>
            </DragDropContext>


        );
    }
}

export default Calculator;