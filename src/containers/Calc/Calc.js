import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import InputRow from '../InputRow/InputRow';

const OPERATORS = ['/', '+', '-', '*'];
const NUMBERS = /^\d*$/

class Calculator extends Component {
    state = {
        rows: {
            'row-1': {
                isActive: true,
                id: 'row-1',
                elementsOrder: ['caret', 'result', 'equal'],
                eval: 0,
            },
        },
        rowIds: ['row-1'],
        elements: {
            'caret': {
                id: 'caret',
                type: 'caret',
            },
            'result': {
                id: 'result',
                type: 'result',
                value: ''
            },
            'equal': {
                id: 'equal',
                type: 'operator',
                value: '='
            }
        },
        elementsValues: {
            'result': {
                id: 'result',
                value: '0'
            }
        },
        caret: {
            isExist: true,
            positionRowRow: 'row-1',
        }
    }

    handleInputChange = (event, id, rowId) => {
        const value = event.target.value;
        if (this.inputValidation(value) === 'number') {
            this.handleChangeNumber(value, id, rowId)
            return;
        }
        if (this.inputValidation(value) === 'operator') {
            this.createMathOperator(value.slice(-1), id, rowId)
            return;
        }
    }
    inputValidation = (value) => {
        if (NUMBERS.test(value)) return 'number';
        if (OPERATORS.includes(value) || OPERATORS.includes(value.slice(-1))) return 'operator';
        if (value === 'Backspace') return 'Backspace';
        if (value === 'Enter') return 'Enter';
        return;
    }

    handleChangeNumber = (value, id, rowId) => {
        this.setState({
            elementsValues: {
                ...this.state.elementsValues,
                [id]: {
                    ...this.state.elementsValues[id],
                    value: value
                }
            }
        }, () => this.calculation(rowId))
    }

    handleKeyDown = (event, rowId) => {
        const validatedInput = this.inputValidation(event.key)
        switch (validatedInput) {
            case 'number':
                this.createNumber(rowId)
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

    createNumber = (rowId) => {
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];
        const newElementId = 'num-' + Date.now().toString();

        newElementsOrder.push(newElementId);
        const newElement = {
            id: newElementId,
            type: 'number',
            valueId: newElementId
        }
        this.setState({
            rows: {
                ...this.state.rows,
                [rowId]: {
                    elementsOrder: newElementsOrder,
                }
            },
            elements: {
                ...this.state.elements,
                [newElementId]: newElement,
            },
            elementsValues: {
                ...this.state.elementsValues,
                [newElementId]: {
                    value: '',
                    tied: 1,
                }
            },
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
            },
        })
    }

    addCaret = (rowId, index) => {
        if (this.state.caret.isExist) return;
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];

        newElementsOrder.push('caret');
        this.setState({
            rows: {
                ...this.state.rows,
                [rowId]: {
                    elementsOrder: newElementsOrder,
                }
            },
            caret: {
                isExist: true,
                positionRow: rowId,
            }
        })
    }

    removeCaret = (rowId) => {
        const oldElementsOrder = [...this.state.rows[rowId].elementsOrder];
        const newElementsOrder = oldElementsOrder.filter(el => el !== 'caret');
        this.setState({
            rows: {
                ...this.state.rows,
                [rowId]: {
                    elementsOrder: newElementsOrder,
                }
            },
            caret: {
                isExist: false,
                positionRow: null,
            }
        })
    }

    deleteElement() {
        const caretpositionRow = this.state.caret.positionRow;
        const caretIndex = this.state.rows[caretpositionRow].elementsOrder.findIndex(el => el === 'caret');
        const newElementsOrder = [...this.state.rows[caretpositionRow].elementsOrder];
        // newElementsOrder.splice(caretIndex - 1, 1)
        newElementsOrder.pop();
        this.setState({
            rows: {
                ...this.state.rows,
                [caretpositionRow]: {
                    ...this.state.caretpositionRow,
                    elementsOrder: newElementsOrder,
                }
            }
        })
        this.calculation(caretpositionRow)
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
                typeCounter = 0;
            }
        }
        if (this.inputValidation(str) === 'operator') return false;
        return true;
    }

    calculation(rowId) {
        let equation = '';
        // if (this.state.rows[rowId].elementsOrder.length == 0) return;
        this.state.rows[rowId].elementsOrder.map(el => {
            equation = equation + this.state.elements[el].value
        })
        if (this.validateBeforeEval(equation, rowId)) {
            return;
        };
    }
    // Drag and Drop

    onDragEnd = result => {
        const { destination, source } = result;
        if (!destination) return;

        if (destination.droppableId === source.droppableId) {
            const droppableId = source.droppableId;
            if (destination.index === source.index || destination.index % 2) return;
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
            return;
        }

        if (destination.droppableId !== source.droppableId) {
            const newOrderSource = [...this.state.rows[source.droppableId].elementsOrder];
            const newOrderDest = [...this.state.rows[destination.droppableId].elementsOrder];
            const srcEl = newOrderSource[source.index];
            const destEl = {
                id: 'num-' + Date.now().toString(),
                type: 'number',
                valueId: srcEl,
            }

            newOrderDest[destination.index] = destEl.id;
            this.setState({
                rows: {
                    ...this.state.rows,
                    [destination.droppableId]: {
                        ...this.state.rows[destination.droppableId],
                        elementsOrder: newOrderDest,
                    }
                },
                elements: {
                    ...this.state.elements,
                    [destEl.id]: destEl
                },
            })
            return;
        }

    }

    render() {
        const rows = this.state.rowIds.map(rowId => (
            <InputRow
                isActive={this.state.rows[rowId].isActive}
                addCaret={this.addCaret}
                removeCaret={this.removeCaret}
                key={rowId}
                handleInput={this.handleInputChange}
                keyDown={this.handleKeyDown}
                rowId={rowId}
                elementsValues={this.state.elementsValues}
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