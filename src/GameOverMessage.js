import React, { useState, useContext } from 'react'
import styled from "styled-components";
import { store } from './Store.js';

const GameOverMessage = (props) => {
    const globalState = useContext(store);
    const { state, dispatch } = globalState;

    const MessageDiv = styled.div`
    background-color: #fbfbfb;
    width: min(75vw,500px);
    height: 200px;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    top: 100px;
    box-shadow: 3px 3px 3px 0px rgb(0 0 0 / 25%);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;

    & > button {
        margin-top: 20px;
    }
    `


    return (
        <MessageDiv>
            <div>
                Your score ise: {state.score}
            </div>
            <button onClick={props.playAgain}>Play again!</button>
        </MessageDiv>
    )
}

export default GameOverMessage