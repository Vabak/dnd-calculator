import React from 'react';
import styled from 'styled-components';

const StyledOperator = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: blue;
    text-align: center; 
    display: inline-block;
`;

const Operator = (props) => {
    return (
        <StyledOperator>{props.operator}</StyledOperator>
    );
}
 
export default Operator;