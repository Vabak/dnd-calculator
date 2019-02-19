import React from 'react';
import styled, { keyframes } from 'styled-components';

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`

const StyledCaret = styled.div`
  background-color: blue;
  position: absolute;
  left: 0;
  opacity: 0.5;
  height: 100%;
  width: 3px;
  overflow: hidden;
  text-decoration: blink;
  animation: ${blinker} 1s linear infinite;
`;

const Caret = (props) => {
    return (
        <StyledCaret />
    );
}

export default Caret;