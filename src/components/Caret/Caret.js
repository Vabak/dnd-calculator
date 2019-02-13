import React from 'react';
import styled, { keyframes } from 'styled-components';

const blinker = keyframes`
  50% {
    opacity: 0;
  }
`

const StyledCaret = styled.div`
 font-size: 12px;
  background-color: blue;
  color: blue;
  position: relative;
  right: 0;
  opacity: 0.5;
  height: 1.5em;
  width: 3px;
  max-width: 3px;
  overflow: hidden;
  text-indent: -5px;
  display: inline-block;
  text-decoration: blink;
  animation: ${blinker} 1s linear infinite;
`;

const Caret = (props) => {
    return (
        <StyledCaret />
    );
}

export default Caret;