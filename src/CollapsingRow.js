import React, { useContext } from 'react';
import styled, { keyframes } from "styled-components";
import { store } from './Store.js';

const CollapsingRow = (props) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const Animation = keyframes`
    0%   { opacity: 0; }
    30%   { background-color: yellow; }
    50%   { background-color: orange; }
    70% { opacity: 0.7; }
    100% { opacity: 0; }
    `;

    const CollapsingDiv = styled.div`
    background-color: pink;
    width: calc(${props.rowHeight}*10);
    height: ${props.rowHeight};
    position: fixed;
    left: 1px;
    top: 451px;
    animation: ${Animation};
    animation-duration: 1s;
    opacity:0;
    margin-top:${props.marginTop};
    z-index: 2;
    `

    return (
        <>
            {state.indexOfRowsToCollapse.map(
                indexOfRow =>
                    <CollapsingDiv key={indexOfRow} style={{ top: `calc(${indexOfRow}*${props.rowHeight})` }} ></CollapsingDiv>
            )
            }

        </>
    )
}

export default React.memo(CollapsingRow);