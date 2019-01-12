import React from 'react';
import styled from 'styled-components';
import Caret from '../../components/Caret/Caret';
import NumberCell from '../../components/NumberCell/NumberCell';
import Operator from '../../components/Operator/Operator';


const Row = styled.div`
    width: 100%;
    background-color: #f1f1f1;
    height: 120px;
    padding: 20px;
    display: flex;
`;



const InputRow = (props) => {

    let mathRow = props.values.map(elem => {
        switch (elem.type) {
            case 'number':
                return <NumberCell 
                handleInput={props.handleInput}
                inputId={elem.id}
                key={elem.id}
                focus={true}
                read={false}
                value={elem.value} />
            case 'operator':
                return <Operator
                        operatorId={elem.id}
                        key={elem.id}
                        operator={elem.value} />
            default:
                return null;
        }
        
    });

    return (
        <Row tabIndex="0" 
            onKeyDown={(event, id) => props.keyDown(event, props.rowId)}
            ref={props.inputRef}
            rowId={props.rowId}>
                {mathRow}
                <Operator operator={'='} />
                <NumberCell value={props.eval} focus={false} read={true} handleInput={null} />
        </Row>
    );
}
 
export default InputRow;