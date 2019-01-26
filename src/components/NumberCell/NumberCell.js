import React from 'react';
import styled from 'styled-components';
// import { Draggable } from 'react-beautiful-dnd';
import { DragSource } from 'react-dnd';
import { ItemTypes } from '../../constants/contsansts'

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

const cellSource = {
    beginDrag(props) {
        return {};
    }
};

const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

const Cell = ({connectDragSource, isDragging, ...props}) => {
    return connectDragSource(
                <StyledNumber
                onClick={(rowId, index) => props.addCaret(props.rowId, props.index)}>
                    <Input
                        autoFocus={props.focus}
                        value={props.value}
                        rowId={props.rowId}
                        onKeyDown={e => e.stopPropagation()}
                        onChange={(event) => { props.handleInput(event, props.inputId, props.rowId) }}
                        readOnly={props.read} />
                </StyledNumber>
    );
}

export default DragSource(ItemTypes.NumberCell, cellSource, collect)(Cell);
