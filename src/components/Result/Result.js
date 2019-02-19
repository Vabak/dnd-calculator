import React from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
    width: auto;
    font-size: 1.3em;
    line-height: 40px;
    padding: 10px;
    border-radius: 20%;
    text-align: center;
    vertical-align: center;
    background-color: ${props => props.isValid ? 'lightgreen' : 'red'};
    display: inline-block;
    margin: 0 10px;
`;

const Result = (props) => {
    return ( 
        <StyledSpan isValid={props.isValid} >
            {props.result}
        </StyledSpan>
    )
}
 
export default Result;