import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const StyledNumber = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: blue;
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
            {(provided) => (
                <StyledNumber
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}>
                    <Input
                        autoFocus={props.focus}
                        value={props.value}
                        onKeyDown={e => e.stopPropagation()}
                        onChange={(event, id) => { props.handleInput(event, props.inputId) }}
                        readOnly={props.read} />
                </StyledNumber>)}
        </Draggable>
    );


}

export default Cell;
