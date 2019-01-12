import React from 'react';
import styled from 'styled-components';

const StyledNumber = styled.div`
    width: 40px;
    height: 40px;
    padding: 10px;
    background-color: blue;
    display: inline-block;
    margin: 0 10px;
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
            <Input 
                autoFocus={props.focus} 
                value={props.value} 
                onKeyDown={e => e.stopPropagation()}
                onChange={(event, id) => {props.handleInput(event, props.inputId)}}
                readOnly={props.read} />
        </StyledNumber>
    );
}

export default Cell;
// class Cell extends Component {
//     render() {
//         return (
//             <StyledNumber>
//                 <Input autoFocus={true} onChange={null} />
//             </StyledNumber>
//         );
//     }
// }

// export default Cell;
