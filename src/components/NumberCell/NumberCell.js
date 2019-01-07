import React from 'react';
import styled from 'styled-components';

const StyledNumber = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: blue;
 
    text-align: center; 
`;

const Input = styled.input`
    width: 80%;
    height: 80%;
    background-color: lightgray;
    border: none;  
`;

const Cell = (props) => {
    return (
        <StyledNumber>
            <Input />
        </StyledNumber>
    );
}
 
export default Cell;