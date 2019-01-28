import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd'

const StyledOperator = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    margin: 0 10px;
    background-color: blue;
    text-align: center; 
    display: inline-block;
`;

const Operator = (props) => {
    return (
        <Draggable draggableId={props.operatorId} index={props.index} isDragDisabled={true}>
        {(provided, snapshot) => (
        <StyledOperator
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >{props.operator}</StyledOperator>)}
        </Draggable>

    );
}
 
export default Operator;
