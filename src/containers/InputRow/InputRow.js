import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';

import Caret from '../../components/Caret/Caret';
import NumberCell from '../../components/NumberCell/NumberCell';
import Operator from '../../components/Operator/Operator';


const Row = styled.div`
    width: 100%;
    background-color: ${props => props.isDraggingOver ? 'darkgrey' : '#f1f1f1'};
    height: 100px;
    padding: 20px;
    display: flex;
    flex-direction: row;
    margin-top: 10px;
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
                    addCaret={props.addCaret}
                    valueId={props.elements[elemId].valueId}
                    value={props.elementsValues[props.elements[elemId].valueId].value} />
            case 'operator':
                return <Operator
                    index={index}
                    operatorId={elemId}
                    key={elemId}
                    addCaret={props.addCaret}
                    operator={props.elements[elemId].value} />
            case 'caret':
                return <Caret
                    key={elemId}
                    id={elemId}
                    rowId={props.rowId}
                />
            default:
                return null;
        }

    });

    return (

                <Row
                    tabIndex="0"
                    onKeyDown={(event, id) => props.keyDown(event, props.rowId)}
                    rowId={props.rowId}>
                    {mathRow}
                </Row>
    );
}

export default InputRow;