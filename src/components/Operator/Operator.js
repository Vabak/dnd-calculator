import React from 'react';
import styled from 'styled-components';

const StyledOperator = styled.span`
    height: 40px;
    padding: 10px;
    margin: 0 10px;
    text-align: center; 
    font-size: 1.5em;
`;

const Operator = (props) => {
    return (
        <StyledOperator>{props.operator}</StyledOperator>
    );
}
 
export default Operator;
