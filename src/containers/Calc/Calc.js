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
            // this.addNumber(event.key, id);
        } else if (RegSigns.exec(event.key)) {
            
        }
        return
    }

    checkNum = (num, id) => {
        if (this.state.row.id === id) {
            if (this.state.row.data.length === 0) {
                this.createNumer(num);
                return;
            }
        }
        return;
    }

    createNumer = (num) => {
        const oldData = [...this.state.row.data];
        const newNumber = { 
            id: Date.now(),
            value: num,
        }
        const newData = oldData.push()
        this.setState({})
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
                <InputRow />
            </div>

        );
    }
}

export default Calculator;