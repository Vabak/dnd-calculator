import React, { Component } from 'react';

import { NUMBERS, OPERATORS } from '../../constants/constants'
import InputRow from '../InputRow/InputRow';


class Calculator extends Component {
    state = {
        rows: {
            'row-1': {
                id: 'row-1',
                elementsOrder: [],
                result: 0,
                isValid: true,
            },
        },
        rowIds: ['row-1'],
        elementsValues: {
        },
        caret: {
            positionRow: null,
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
        }, )
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
            result: 0,
            isValid: true,
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
        if (newElementsOrder.length !== 0 && newElementsOrder[newElementsOrder.length-1].type === 'number') return;
        const newElementId = 'num-' + Date.now().toString();

        const newElement = {
            id: newElementId,
            type: 'number',
            valueId: newElementId,
            bound: false,
        }
        newElementsOrder.push(newElement);
        this.setState({
            rows: {
                ...this.state.rows,
                [rowId]: {
                    ...this.state.rows[rowId],
                    elementsOrder: newElementsOrder,
                }
            },
            elementsValues: {
                ...this.state.elementsValues,
                [newElementId]: {
                    value: '',
                    tied: [{
                        rowId: rowId,
                        id: newElementId
                    }],
                }
            },
        }, )
    }

    createMathOperator = (operator, inputId, rowId) => {
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];
        if (newElementsOrder.length === 0 || newElementsOrder[newElementsOrder.length-1].type === 'operator') return;
        const newElementId = 'opr-' + Date.now().toString();
        const newElement = {
            id: newElementId,
            type: 'operator',
            valueId: newElementId,
        }
        newElementsOrder.push(newElement);
        this.setState({
            ...this.state,
            rows: {
                ...this.state.rows,
                [rowId]: {
                    ...this.state.rows[rowId],
                    elementsOrder: newElementsOrder,
                }
            },
            elementsValues: {
                ...this.state.elementsValues,
                [newElementId]: {
                    value: operator,
                }
            },
        })
    }

    addCaret = (rowId, index) => {
        this.setState({
            caret: {
                positionRow: rowId,
            }
        })
    }

    removeCaret = (rowId) => {
        this.setState({
            caret: {
                positionRow: null,
            }
        })
    }

    deleteElement() {
        // Delete from ElementsOrder
        const caretpositionRow = this.state.caret.positionRow;
        const newElementsOrder = [...this.state.rows[caretpositionRow].elementsOrder];
        if (newElementsOrder.length === 0) return;
        const deleted = newElementsOrder.pop();

        if (deleted.type === 'operator') {
            const newValues = {...this.state.elementsValues}
            delete newValues[deleted.valueId]
            this.setState({
                elementsValues: newValues,
                rows: {
                    ...this.state.rows,
                    [caretpositionRow]: {
                        ...this.state.caretpositionRow,
                        elementsOrder: newElementsOrder,
                    }
                }
            })
            return;
        }

        // Delete from ElementsValues
        const newValues = {...this.state.elementsValues}
        const newTied = newValues[deleted.valueId].tied.filter(el => {
           return el.id !== deleted.id
        })
        newValues[deleted.valueId].tied = newTied

        if ( newTied.length === 0 ) { 
            delete newValues[deleted.valueId]
        }

        // Unbound single element
        if ( newTied.length === 1 ) {
            const unbound = newTied[0];
            const unboundElementsOrder = [...this.state.rows[unbound.rowId].elementsOrder]
            unboundElementsOrder.map(el => {
                if ( el.id === unbound.id ) return el.bound = false;
            })
            this.setState({
                elementsValues: newValues,
                rows: {
                    ...this.state.rows,
                    [unbound.rowId]: {
                        ...this.state.rows[unbound.rowId],
                        elementsOrder: unboundElementsOrder,
                    },

                    [caretpositionRow]: {
                        ...this.state.caretpositionRow,
                        elementsOrder: newElementsOrder,
                    }
                }
            })
            return;
        }

        this.setState({
            elementsValues: newValues,
            rows: {
                ...this.state.rows,
                [caretpositionRow]: {
                    ...this.state.caretpositionRow,
                    elementsOrder: newElementsOrder,
                }
            }
        })
    }

    validateBeforeEval = (str, rowId) => {
        if (str.length === 0) return true;
        const elementsOrder = this.state.rows[rowId].elementsOrder
        let counter = 0;
        let prev = elementsOrder[0].type
        for (let i = 0; i <= elementsOrder.length-1 ; i++) {
            const current = elementsOrder[i];
            if (prev === current.type) {
                counter++;
            } else {
                prev = current.type;
                counter = 0;
            }
            if (counter >= 2) return false;
        }
        return true;
    }

    calculation = (rowId) => {
        let equation = '';
        this.state.rows[rowId].elementsOrder.map(el => {
            equation = equation + this.state.elementsValues[el.valueId].value
        })
        try {
            if (!this.validateBeforeEval(equation, rowId)) {
                throw '';
            };
            let result = eval(equation);
            if (result === undefined) result = 0;
            const newRows = Object.assign({}, this.state.rows)
            newRows[rowId].result = result;
            newRows[rowId].isValid = true;
            this.setState({
                rows: newRows
            })
        } catch(e) {
            const newRows = Object.assign({}, this.state.rows)
            newRows[rowId].result = 'error';
            newRows[rowId].isValid = false;
            this.setState({
                rows: newRows 
            })
        }
    }

    swapCells = (rowId, srcIndex, destIndex) => {
        const newElementsOrder = [...this.state.rows[rowId].elementsOrder];
        const srcEl = Object.assign({}, newElementsOrder[srcIndex]);
        newElementsOrder[srcIndex] = newElementsOrder[destIndex];
        newElementsOrder[destIndex] = srcEl;
        this.setState({
            ...this.state,
            rows: {
                ...this.state.rows,
                [rowId]: {
                    ...this.state.rows[rowId],
                    elementsOrder: newElementsOrder,
                }
            },
        }, )
    }

    swapCellsBetweenRows = (srcRow, destRow, srcIndex, destIndex) => {
        const srcElementsOrder = [...this.state.rows[srcRow].elementsOrder];
        const destElementsOrder = [...this.state.rows[destRow].elementsOrder];
        const srcEl = Object.assign({}, srcElementsOrder[srcIndex]);
        const destEl = Object.assign({}, destElementsOrder[destIndex]);
        srcElementsOrder[srcIndex] = destEl;
        destElementsOrder[destIndex] = srcEl;
        
        const newValues = Object.assign({},this.state.elementsValues);
        newValues[srcEl.valueId].tied.map(el => {
            if ( el.id === srcEl.id ) {
                return el.rowId = destRow;
            }
        })
        newValues[destEl.valueId].tied.map(el => {
            if ( el.id === destEl.id ) {
                return el.rowId = srcRow;
            }
        })

        this.setState({
            elementsValues: newValues,
            rows: {
                ...this.state.rows,
                [srcRow]: {
                    ...this.state.rows[srcRow],
                    elementsOrder: srcElementsOrder,
                },
                [destRow]: {
                    ...this.state.rows[destRow],
                    elementsOrder: destElementsOrder,
                }
            },
        })
    }

    cloneNumber = (srcRow, destRow, srcIndex) => {
        const srcElementsOrder = [...this.state.rows[srcRow].elementsOrder];
        const destElementsOrder = [...this.state.rows[destRow].elementsOrder];
        const srcEl = srcElementsOrder[srcIndex];
        const newElementId = 'num-' + Date.now().toString();
        const cloneEl = {
            id: newElementId,
            type: 'number',
            valueId: srcEl.valueId,
            bound: true,
        };
        destElementsOrder.push(cloneEl);
        const newValue = Object.assign({}, this.state.elementsValues[srcEl.valueId]); 
        newValue.tied.push({
            rowId: destRow,
            id: newElementId,
        })
        if (!srcEl.bound) srcEl.bound = true;
        this.setState({
            ...this.state,
            elementsValues: {
                ...this.state.elementsValues,
                [srcEl.valueId]: newValue
            },
            rows: {
                ...this.state.rows,
                [srcRow]: {
                    ...this.state.rows[srcRow],
                    elementsOrder: srcElementsOrder,
                },
                [destRow]: {
                    ...this.state.rows[destRow],
                    elementsOrder: destElementsOrder,
                }
            },
        }, )
    }

    render() { 
        const rows = this.state.rowIds.map(rowId => (
            <InputRow
                setRef={this.setTextInputRef}
                caretPos={this.state.caret.positionRow}
                addCaret={this.addCaret}
                removeCaret={this.removeCaret}
                key={rowId}
                swapCells={this.swapCells}
                swapCellsBetween={this.swapCellsBetweenRows}
                cloneNumber={this.cloneNumber}
                handleInput={this.handleInputChange}
                keyDown={this.handleKeyDown}
                rowId={rowId}
                calc={this.calculation}
                elementsValues={this.state.elementsValues}
                result={this.state.rows[rowId].result}
                isValid={this.state.rows[rowId].isValid}
                elementsOrder={this.state.rows[rowId].elementsOrder}
            />
        ))
        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default Calculator;