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


    handleChange = (event) => {
        this.setState({ inputValue: event.target.value })
    }

    handleKeyDown = (event, id) => {
        if (RegNumbers.exec(event.key)) {
            this.checkNum(event.key, id);
        } else if (RegSigns.exec(event.key)) {
            
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
        console.log('createNum' + num)
        let newData = [...this.state.row.data];
        const newNumber = { 
            id: Date.now(),
            value: num,
        };
        newData.push(newNumber);
        console.log('newdata', newData);
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
                <InputRow keyDown={this.handleKeyDown} />
            </div>

        );
    }
}

export default Calculator;