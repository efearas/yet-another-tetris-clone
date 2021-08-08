import React,{useState} from 'react'
import { GameStates } from './Enums'
import Game from './Game'
import GameOverMessage from './GameOverMessage'

const GameController = () => {
    const [gameState, setGameState] = useState(GameStates.GAMING)
    return (
        <div>            
            {
                gameState === GameStates.GAMING &&
                    <Game
                        gameCompleted = {()=>setGameState(GameStates.GAME_OVER)}
                    />
            }
            {
                gameState === GameStates.GAME_OVER &&
                    <GameOverMessage
                    playAgain = {()=>setGameState(GameStates.GAMING)}
                    />
            }
        </div>
    )
}

export default GameController