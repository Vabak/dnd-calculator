import React from 'react';
import styled from 'styled-components';

const StyledCaret = styled.div`
    width: 20px;
    height: 100%;
    background-color: #4695d2;
    display: inline-block;
`;

const Caret = (props) => {
    return (
        <StyledCaret />
    );
}
 
export default Caret;