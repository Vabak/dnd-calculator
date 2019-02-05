import React from 'react';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom'
// import { Draggable } from 'react-beautiful-dnd';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from '../../constants/contsansts'
import flow from ''

const StyledNumber = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: lightblue;
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
			return null
		}
		const dragIndex = monitor.getItem().index
        const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = (findDOMNode(
			component,
		)).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = (clientOffset).y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
	},
}


const sourceCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging(),
    }
}

const dropCollect = (connect) => {
    return {connectDropTarget: connect.dropTarget()}
}

const Cell = ({connectDragSource, connectDragPreview, isDragging, ...props}) => {
    return connectDragSource(
        <div>
             <StyledNumber
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
               
    );
}

export default DragSource(ItemTypes.NumberCell, cellSource, sourceCollect)(Cell);
