import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import InputRow from '../InputRow/InputRow';

const OPERATORS = ['/', '+', '-', '*'];
const NUMBERS = /^\d*$/

class Calculator extends Component {
    state = {
        rows: {
            'row-1': { 
                id: 'row-1',
                elementsOrder: [],
                eval: 0,
            },
        },
        rowIds: ['row-1'],
        elements: {},
        counter: 2
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.row.data !== this.state.row.data) this.calculation()
    // }
    getCounter() {
        let newCounter = this.state.counter;
        newCounter++;
        this.setState({
            counter: newCounter
        });
        return this.state.counter;
    }
    handleInputChange = (event, id) => {
        const value = event.target.value;
        if (this.inputValidation(value) === 'number') {            
            this.handleChangeNumber(value, id)
        }

    }



    // setInputRef = element => {
    //     this.inputElement = element;
    // };

    // inputFocus() {
    //     this.inputElement.focus();
    // }

    inputValidation = (value) => {
        if (NUMBERS.test(value)) return 'number';
        if (OPERATORS.includes(value) || value.slice(-1)) return 'operator';
        if (value === 'Backspace') return 'Backspace';
        if (value === 'Enter') return 'Enter';
        return;
    }

    handleChangeNumber = (value, id) => {
        let newElements = {...this.state.elements}
        const newElement = newElements[id];
        newElement.value = value;
        newElements = {
            ...newElements,
            [id] : newElement
        }
        this.setState({
            elements: newElements
        })
    }

    handleKeyDown = (event, rowId) => {
        const validatedInput = this.inputValidation(event.key)
        switch (validatedInput) {
            case 'number':
                this.createNumber(event.key, rowId)
                break;
            case 'operator':
                this.createMathOperator(event.key, rowId)
                break;
            case 'Backspace':
                this.deleteElement()
                break;
            case 'Enter':
                this.createRow();
                break;
            default:
                break;
        }
    }
    deleteElement() {
    }

    checkOperator = (operator) => {
        if (this.state.row.data[this.state.row.data.length - 1].type === 'number') {
            this.createMathOperator(operator);
        } else if (this.state.row.data[this.state.row.data.length - 1].type === 'operator') {
            this.replaceOperator(operator)
        }
    }
    // checkNum = (num, id) => {
    //     // if row is empty or last element is operator
    //     if (this.state.row.data.length === 0 || this.state.row.data[this.state.row.data.length - 1].type === 'operator') {
    //         this.createNumber();
    //         return;
    //     }
    //     return;
    // }

    createNumber = (num, rowId) => {
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];
        const newElementId = Date.now().toString();

        newElementsOrder.push(newElementId);
        const newElement = {
            id: newElementId,
            type: 'number',
            value: '',
        }
        this.setState({
            ...this.state,
            rows: {
                ...this.state.rows,
                [rowId]: { 
                    // ...this.state.rows[rowId],
                    elementsOrder: newElementsOrder,
                }
            },
            elements: {
                ...this.state.elements,
                [newElementId]: newElement,
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
        let equation = '';

        if (this.state.row.data.length !== 0) {
            this.state.row.data.map(el => {
                equation = equation + el.value;
            })
        } else {
            equation = 0;
        }
        if (OPERATORS.includes(equation[equation.length - 1])) {
            return;
        }

        const newEval = (string) => {
            return eval(string);
        }
        this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                eval: newEval(equation)
            }
        })
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
        const srcElement = this.state.row.data[source.index];
        newData.splice(source.index, 1);
        newData.splice(destination.index, 0, srcElement);


        this.setState(this.setState({
            ...this.state,
            row: {
                ...this.state.row,
                data: newData
            }
        }))

    }

    render() {
        const rows = this.state.rowIds.map(rowId => (
            <InputRow
                // inputRef={this.setInputRef}
                key={rowId}
                handleInput={this.handleInputChange}
                keyDown={this.handleKeyDown}
                rowId={rowId}
                elements={this.state.elements}
                eval={this.state.rows[rowId].eval}
                elementsOrder={this.state.rows[rowId].elementsOrder}
            />
        ))
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <div>
                    {rows}
                </div>
            </DragDropContext>


        );
    }
}

export default Calculator;