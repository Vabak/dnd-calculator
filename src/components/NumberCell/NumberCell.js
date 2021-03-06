import React from 'react';
import styled from 'styled-components';

import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../../constants/constants'
import flow from 'lodash.flow'

const StyledNumber = styled.div`
    height: 40px;
    padding: 10px;
    padding-top: 13px;
    border-radius: 20%;
    background-color: ${props => props.isOver ? 'lightgreen' : props.bound ? 'orange' : 'lightblue'};
    opacity: ${props => props.isDragging ? 0 : 1};
    display: inline-block;
`;

const Input = styled.input`
    width: 100%;
    height: 80%;
    font-size: 1.3em;
    background-color: lightgray;
    border: none;  
`;

const cellSource = {
    beginDrag(props) {
        return {
            sourceId: props.id,
            sourceRowId: props.rowId,
            sourceIndex: props.index,
        };
    },
};

const cellTarget = {
	drop(props, monitor, component) {
		if (!component) {
			return null;
        }
        const destRow = props.rowId;
        const sourceRow = monitor.getItem().sourceRowId;
        const dragIndex = monitor.getItem().sourceIndex;
        if (sourceRow === destRow) {
            props.swapCells(destRow, dragIndex, props.index)
            return;
        } 
        props.swapCellsBetween(sourceRow, destRow, dragIndex, props.index)
	},
}


const sourceCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    }
}

const Cell = ({connectDragSource, connectDragPreview, connectDropTarget, isDragging, bound, isOver, ...props}) => {
    return connectDragSource(connectDropTarget(
        <div style={{height: '60px', width: '60px', padding: 0, margin: '0 10px', 'border-radius': '20%'}}>
            <StyledNumber
                isOver={isOver}
                isDragging={isDragging}
                bound={bound}>
                    <Input
                        autoFocus
                        onFocus={(e) => {e.stopPropagation()}}
                        value={props.value}
                        rowId={props.rowId}
                        onKeyDown={e => e.stopPropagation()}
                        onChange={(event) => { props.handleInput(event, props.valueId, props.rowId) }}
                    />
            </StyledNumber>
        </div>
    )
               
    );
}

export default flow(DragSource(ItemTypes.NumberCell, cellSource, sourceCollect), DropTarget(ItemTypes.NumberCell, cellTarget, dropCollect))(Cell);
