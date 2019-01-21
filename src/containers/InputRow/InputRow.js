import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Caret from '../../components/Caret/Caret';
import NumberCell from '../../components/NumberCell/NumberCell';
import Operator from '../../components/Operator/Operator';


const Row = styled.div`
    width: 100%;
    background-color: ${props => props.isDraggingOver ? 'darkgrey' : '#f1f1f1'};
    height: 120px;
    padding: 20px;
    display: flex;
`;



const InputRow = (props) => {

    let mathRow = props.elementsOrder.map((elemId, index) => {
        switch (props.elements[elemId].type) {
            case 'number':
                return <NumberCell
                    handleInput={props.handleInput}
                    inputId={elemId}
                    index={index}
                    key={elemId}
                    focus={true}
                    read={false}
                    rowId={props.rowId}
                    value={props.elements[elemId].value} />
            case 'operator':
                return <Operator
                    index={index}
                    operatorId={elemId}
                    key={elemId}
                    operator={props.elements[elemId].value} />
            default:
                return null;
        }

    });

    return (
        <Droppable droppableId={props.rowId} direction={"horizontal"}>
            {(provided, snapshot) => (
                <Row
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                    tabIndex="0"
                    isDraggingOver={snapshot.isDraggingOver}
                    onKeyDown={(event, id) => props.keyDown(event, props.rowId)}
                    // ref={props.inputRef}
                    rowId={props.rowId}>
                    {provided.placeholder}
                    {mathRow}
                    {/* <Operator operator={'='} />
                    <NumberCell value={props.eval} focus={false} read={true} handleInput={null} /> */}
                </Row>
            )}

        </Droppable>

    );
}

export default InputRow;