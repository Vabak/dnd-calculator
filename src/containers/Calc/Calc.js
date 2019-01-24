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
        elements: {
            'caret': {
                id: 'caret',
                type: 'caret',
                value: '',
            },
        },
        caret: {
            isExist: false,
            position: null,
        }
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.row.data !== this.state.row.data) this.calculation()
    // }

    handleInputChange = (event, id, rowId) => {
        const value = event.target.value;
        if (this.inputValidation(value) === 'number') {
            this.handleChangeNumber(value, id)
        }
        if (this.inputValidation(value) === 'operator') {
            this.createMathOperator(value.slice(-1), id, rowId)
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
        if (OPERATORS.includes(value) || OPERATORS.includes(value.slice(-1))) return 'operator';
        if (value === 'Backspace') return 'Backspace';
        if (value === 'Enter') return 'Enter';
        return;
    }

    handleChangeNumber = (value, id) => {
        let newElements = { ...this.state.elements }
        const newElement = newElements[id];
        newElement.value = value;
        newElements = {
            ...newElements,
            [id]: newElement
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
                this.createMathOperator(event.key, null, rowId)
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

    createRow() {
        const newRowId = 'row-' + Date.now().toString();
        const newRowIds = Array.from(this.state.rowIds);
        newRowIds.push(newRowId);
        const newRow = {
            id: newRowId,
            elementsOrder: [],
            eval: 0,
        }
        this.setState({
            rowIds: newRowIds,
            rows: {
                ...this.state.rows,
                [newRowId]: newRow,
            }
        });
    }
    createNumber = (num, rowId) => {
        // if ()
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];
        const newElementId = 'num-' + Date.now().toString();

        newElementsOrder.push(newElementId);
        const newElement = {
            id: newElementId,
            type: 'number',
            value: '',
        }
        this.setState({
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

    createMathOperator = (operator, inputId, rowId) => {
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];
        const newElementId = 'opr-' + Date.now().toString();

        newElementsOrder.push(newElementId);
        const newElement = {
            id: newElementId,
            type: 'operator',
            value: operator,
        }
        this.setState({
            ...this.state,
            rows: {
                ...this.state.rows,
                [rowId]: {
                    elementsOrder: newElementsOrder,
                }
            },
            elements: {
                ...this.state.elements,
                [newElementId]: newElement,
            }
        })
    }

    addCaret = (rowId, index) => {
        if (this.state.caret.isExist) return;
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];

        newElementsOrder.splice(index + 1, 0, 'caret');
        this.setState({
            rows: {
                ...this.state.rows,
                [rowId]: {
                    elementsOrder: newElementsOrder,
                }
            },
            caret: {
                isExist: true,
                position: rowId,
            }
        })
    }

    deleteElement() {
        const caretPosition = this.state.caret.position;
        const caretIndex = this.state.rows[caretPosition].elementsOrder.findIndex(el => el === 'caret');
        const newElementsOrder = [...this.state.rows[caretPosition].elementsOrder];
        newElementsOrder.splice(caretIndex - 1, 1)
        this.setState({
            rows: {
                ...this.state.rows,
                [caretPosition]: {
                    ...this.state.caretPosition,
                    elementsOrder: newElementsOrder,
                }
            }
        })
    }
    // replaceOperator = (operator) => {
    //     let newData = [...this.state.row.data];
    //     const newOperator = {
    //         id: Date.now(),
    //         value: operator,
    //         type: 'operator'
    //     };
    //     newData[newData.length - 1] = newOperator;
    //     this.setState({
    //         ...this.state,
    //         row: {
    //             ...this.state.row,
    //             data: newData,
    //         }
    //     })
    // }
    validateBeforeEval = (str, rowId) => {
        let prevEl = null;
        let typeCounter = 0;
        for (let i = 0; i < this.state.rows[rowId].elementsOrder; i++) {
            if (typeCounter >= 2) return false;
            const el = this.state.rows[rowId].elementsOrder[i];
            if (prevEl === el) {
                typeCounter++;
            } else {
                prevEl = el;
            }
        }
        if (this.inputValidation(str[str.length-1]) === 'operator') return false; 
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
        const { destination, source } = result;
        const droppableId = source.droppableId;
        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index % 2
        ) return;
        const newOrder = [...this.state.rows[source.droppableId].elementsOrder];
        const srcEl = newOrder[source.index];
        const destEl = newOrder[destination.index];
        newOrder[source.index] = destEl;
        newOrder[destination.index] = srcEl;
        this.setState({
            rows: {
                ...this.state.rows,
                [droppableId]: {
                    // ...this.state.rows[rowId],
                    elementsOrder: newOrder,
                }
            },
        })
    }


    render() {
        const rows = this.state.rowIds.map(rowId => (
            <InputRow
                // inputRef={this.setInputRef}
                addCaret={this.addCaret}
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
            <DragDropContext
                onDragEnd={this.onDragEnd}>
                <div>
                    {rows}
                </div>
            </DragDropContext>
        );
    }
}

export default Calculator;