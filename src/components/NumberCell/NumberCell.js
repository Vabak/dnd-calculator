import React from 'react';
import styled from 'styled-components';

const StyledNumber = styled.input`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: blue;
    border: none;    
`;

const Cell = (props) => {
    return (
        <StyledNumber></StyledNumber>
    );
}
 
export default Cell;