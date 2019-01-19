import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import InputRow from '../InputRow/InputRow';

const OPERATORS = ['/', '+', '-', '*'];

class Calculator extends Component {
    state = {
        rows: {
            'row-1': {
                elementsOrder: [],
                eval: 0,
            },
        },
        rowIds: ['row-1'],
        elements: {},
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.row.data !== this.state.row.data) this.calculation()
    // }
    handleKeyDown = (event, id) => {
        const validatedInput = this.inputValidation(event.key)
        switch (validatedInput) {
            case 'number':
                this.createNumber(id)
                break;
            case 'operator':
                this.createMathOperator(event.key, id)
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

    inputValidation = (value) => {
        if (value.match(/[0-9]+/)) return 'number';
        if (OPERATORS.includes(value)) return 'operator';
        if (value === 'Backspace') return 'Backspace';
        if (value === 'Enter') return 'Enter';
        return;
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
        // checkNum = (num, id) => {
        //     // if row is empty or last element is operator
        //     if (this.state.row.data.length === 0 || this.state.row.data[this.state.row.data.length - 1].type === 'operator') {
        //         this.createNumber();
        //         return;
        //     }
        //     return;
        // }

        createNumber = (rowId) => {
            let newData = [...this.state.rowId.elementsOrder];
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
            // still not work
            const newEval = (string) => {
                return new Function('return ' + string)();
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
                    eval={this.state.rows.rowId.eval}
                    elementsOrder={this.state.rows.rowId.elementsOrder}
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