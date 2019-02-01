import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const StyledNumber = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: ${props => props.isDragging ? 'lightgreen' : 'lightblue'};
    display: inline-block;
    margin: 0 10px;
`;

const Input = styled.input`
    width: 80%;
    height: 80%;
    background-color: lightgray;
    border: none;  
`;

const Cell = (props) => {
    return (
        <Draggable draggableId={props.inputId} index={props.index}>
            {(provided, snapshot) => (
                <StyledNumber
                // onClick={(rowId, index) => props.addCaret(props.rowId, props.index)}
                isDragging={snapshot.isDragging}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <Input
                        autoFocus={props.focus}
                        value={props.value}
                        rowId={props.rowId}
                        onKeyDown={e => e.stopPropagation()}
                        onChange={(event) => { props.handleInput(event, props.valueId, props.rowId) }}
                        readOnly={props.read} />
                </StyledNumber>)}
        </Draggable>
    );
}

export default Cell;
