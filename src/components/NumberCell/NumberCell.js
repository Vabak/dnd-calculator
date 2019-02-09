import React from 'react';
import styled from 'styled-components';
// import { findDOMNode } from 'react-dom'
// import { Draggable } from 'react-beautiful-dnd';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../../constansts/contsansts'
import flow from 'lodash.flow'

const StyledNumber = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: ${props => props.isOver ? 'lightgreen' : 'lightblue'};
    opacity: ${props => props.isDragging ? 0 : 1};
    display: inline-block;
    margin: 0 10px;
`;

const Input = styled.input`
    width: 80%;
    height: 80%;
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
	hover(props, monitor, component) {
		if (!component) {
			return null;
        }
        const sourceRow = props.rowId;
        const destRow = monitor.getItem().sourceRowId;
        const dragIndex = monitor.getItem().sourceIndex;
        const hoverIndex = props.index;


		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}
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

const Cell = ({connectDragSource, connectDragPreview, connectDropTarget, isDragging, isOver, ...props}) => {
    return connectDragSource(connectDropTarget(
        <div style={{height: '60px', width: '60px', padding: 0, margin: '0 10px',}}>
             <StyledNumber
                isOver={isOver}
                isDragging={isDragging}
                onClick={(rowId, index) => props.addCaret(props.rowId, props.index)}>
                    <Input
                        autoFocus={props.focus}
                        value={props.value}
                        rowId={props.rowId}
                        onKeyDown={e => e.stopPropagation()}
                        onChange={(event) => { props.handleInput(event, props.valueId, props.rowId) }}
                        readOnly={props.read} />
                </StyledNumber>
        </div>
    )
               
    );
}

export default flow(DragSource(ItemTypes.NumberCell, cellSource, sourceCollect), DropTarget(ItemTypes.NumberCell, cellTarget, dropCollect))(Cell);
