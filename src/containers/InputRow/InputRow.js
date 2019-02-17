import React, { Component } from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { DropTarget } from 'react-dnd'
import Caret from '../../components/Caret/Caret';
import NumberCell from '../../components/NumberCell/NumberCell';
import Operator from '../../components/Operator/Operator';
import { ItemTypes } from '../../constants/constants'
import Result from '../../components/Result/Result';

const Row = styled.div`
    width: 100%;
    background-color: ${props => props.isOver ? 'darkgrey' : '#f1f1f1'};
    height: 100px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
`;

const rowCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

const rowTarget = {
    drop(props, monitor) {
        const destRow = props.rowId;
        const sourceRow = monitor.getItem().sourceRowId;
        if (destRow === sourceRow) return;
        if (monitor.didDrop()) return;
        const dragIndex = monitor.getItem().sourceIndex;
        
        props.cloneCell(sourceRow, destRow, dragIndex);
	},
}


class InputRow extends Component {
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.elementsOrder !== this.props.elementsOrder ||
            prevProps.elementsValues !== this.props.elementsValues)
            this.props.calc(this.props.rowId)
    }
    
    render() { 
        let mathRow = this.props.elementsOrder.map((elem, index) => {
            switch (elem.type) {
                case 'number':
                    return <NumberCell
                        handleInput={this.props.handleInput}
                        inputId={elem.id}
                        index={index}
                        bound={elem.bound}
                        key={elem.id}
                        swapCells={this.props.swapCells}
                        swapCellsBetween={this.props.swapCellsBetween}
                        rowId={this.props.rowId}
                        addCaret={this.props.addCaret}
                        valueId={elem.valueId}
                        value={this.props.elementsValues[elem.valueId].value} />
                case 'operator':
                    return <Operator
                        index={index}
                        operatorId={elem.id}
                        key={elem.id}
                        addCaret={this.props.addCaret}
                        operator={this.props.elementsValues[elem.valueId].value} />
                default:
                    return null;
            }
        });
        const {connectDropTarget, isOver} = this.props
        const caret = this.props.caretPos === this.props.rowId ? <Caret /> : null; 
        return connectDropTarget(
            <div>
                <Row
                    isOver={isOver}
                    tabIndex="0"
                    onFocus={() => this.props.addCaret(this.props.rowId)}
                    onBlur={() => this.props.removeCaret(this.props.rowId)}
                    onKeyDown={(event, id) => this.props.keyDown(event, this.props.rowId)}
                    rowId={this.props.rowId}>
                    {mathRow}
                    {caret}
                    <Operator operator={'='} />
                    <Result 
                        isValid={this.props.isValid}
                        result={this.props.result}
                    />
                </Row>
            </div>
        );
    }
}
 
// const InputRow = ({ connectDropTarget, isOver, ...props }) => {

//     let mathRow = props.elementsOrder.map((elem, index) => {
//         switch (elem.type) {
//             case 'number':
//                 return <NumberCell
//                     handleInput={props.handleInput}
//                     inputId={elem.id}
//                     index={index}
//                     bound={elem.bound}
//                     key={elem.id}
//                     swapCells={props.swapCells}
//                     swapCellsBetween={props.swapCellsBetween}
//                     rowId={props.rowId}
//                     addCaret={props.addCaret}
//                     valueId={elem.valueId}
//                     value={props.elementsValues[elem.valueId].value} />
//             case 'operator':
//                 return <Operator
//                     index={index}
//                     operatorId={elem.id}
//                     key={elem.id}
//                     addCaret={props.addCaret}
//                     operator={props.elementsValues[elem.valueId].value} />
//             default:
//                 return null;
//         }

//     });
//     const caret = props.caretPos === props.rowId ? <Caret /> : null; 
//     return connectDropTarget(
//         <div>
//             <Row
//                 isOver={isOver}
//                 tabIndex="0"
//                 onFocus={() => props.addCaret(props.rowId)}
//                 onBlur={() => props.removeCaret(props.rowId)}
//                 onKeyDown={(event, id) => props.keyDown(event, props.rowId)}
//                 rowId={props.rowId}>
//                 {mathRow}
//                 {caret}
//                 <Operator operator={'='} />
//                 <Result 
//                     isValid={props.isValid}
//                     result={props.result}
//                 />
//             </Row>
//         </div>
//     );
// }

export default DropTarget(ItemTypes.NumberCell, rowTarget, rowCollect)(InputRow);