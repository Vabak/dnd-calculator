import React from 'react';
import styled from 'styled-components';
import Caret from '../../components/Caret/Caret';


const InputRow = styled.div`
    width: 100%;
    background-color: #f1f1f1;
    height: 120px;
    padding: 20px;
`;
 
export default () => (
    <InputRow>
        <Caret />
    </InputRow>
);
