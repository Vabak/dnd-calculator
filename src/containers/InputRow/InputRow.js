import React from 'react';
import styled from 'styled-components';
import Caret from '../../components/Caret/Caret';
import NumerCell from '../../components/NumberCell/NumberCell';


const Row = styled.div`
    width: 100%;
    background-color: #f1f1f1;
    height: 120px;
    padding: 20px;
`;

const InputRow = (props) => {
    return (
        <Row tabIndex="0" 
            onKeyDown={(event, id) => props.keyDown(event, props.id)}
            id={props.id}>{props.mathRow}
            <NumerCell />
            </Row>
    );
}
 
export default InputRow;