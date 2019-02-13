import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { DropTarget } from 'react-dnd'
import Caret from '../../components/Caret/Caret';
import NumberCell from '../../components/NumberCell/NumberCell';
import Operator from '../../components/Operator/Operator';
import { ItemTypes } from '../../constants/constants'

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
    drop(props, monitor, component) {
        const destRow = props.rowId;
        const sourceRow = monitor.getItem().sourceRowId;
        if (destRow === sourceRow) return;
        if (monitor.didDrop()) return;
        const dragIndex = monitor.getItem().sourceIndex;
        
        props.cloneCell(sourceRow, destRow, dragIndex);
	},
}

const InputRow = ({ connectDropTarget, isOver, ...props }) => {

    let mathRow = props.elementsOrder.map((elem, index) => {
        switch (elem.type) {
            case 'number':
                return <NumberCell
                    handleInput={props.handleInput}
                    inputId={elem.id}
                    index={index}
                    bound={elem.bound}
                    key={elem.id}
                    swapCells={props.swapCells}
                    swapCellsBetween={props.swapCellsBetween}
                    rowId={props.rowId}
                    addCaret={props.addCaret}
                    valueId={elem.valueId}
                    value={props.elementsValues[elem.valueId].value} />
            case 'operator':
                return <Operator
                    index={index}
                    operatorId={elem.id}
                    key={elem.id}
                    addCaret={props.addCaret}
                    operator={props.elementsValues[elem.valueId].value} />
            case 'caret':
                return <Caret
                    key={elem.id}
                    id={elem.id}
                    rowId={props.rowId}
                />
            default:
                return null;
        }

    });

    return connectDropTarget(
        <div>
            <Row
                isOver={isOver}
                tabIndex="0"
                onKeyDown={(event, id) => props.keyDown(event, props.rowId)}
                rowId={props.rowId}>
                {mathRow}
            </Row>
        </div>
    );
}

export default DropTarget(ItemTypes.NumberCell, rowTarget, rowCollect)(InputRow);