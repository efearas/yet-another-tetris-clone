import React, { useState, useEffect, useContext, useRef } from 'react';
import CollapsingRow from './CollapsingRow';
import { getMultidimensionalArray } from './Util';
import useCompletedLines from './useCompletedLines'
import { ROW_COUNT, COL_COUNT, GAME_INTERVAL_MS, MARGIN_TOP } from './Constants';
import { store } from './Store.js';
import useSwipeEvents from './useSwipeEvents';
import { useKeyDown } from './useKeyDown';
import ShapeRender from './ShapeRender';
import { getANewShape } from './ShapeFactory';

const Game = (props) => {

    const globalState = useContext(store);
    const { state } = globalState;
    const [newShapesQueue, setNewShapesQueue] = useState(null);
    const { removeCompletedLines } = useCompletedLines();
    const [timer, setTimer] = useState(0);
    const timeOutId = useRef(null);
    const [shapes, setShapes] = useState({
        movingBlock: null,
        stoppedBlocks: [],
        keydownCounter: 0,
        frontierAndStoppedBlocks: getMultidimensionalArray(COL_COUNT, ROW_COUNT, undefined),
    });
    useKeyDown(shapes, setShapes);
    useSwipeEvents();
    
    useEffect(
        () => {
            setTimer(1)
            return () => {
                if (timeOutId.current)
                    window.clearTimeout(timeOutId.current)
            }
        }, []
    )
    useEffect(
        () => {
            if (timer > 0) {
                tick();
                timeOutId.current = setTimeout(() => {
                    setTimer(timer + 1);
                }, GAME_INTERVAL_MS);             
            }
        }, [timer]
    )

    const getShapeFromQueue = () => {
        let queue = []
        if (!newShapesQueue) {
            queue.push(getANewShape())
            queue.push(getANewShape())
        }
        else {
            queue = [...newShapesQueue]
            queue.push(getANewShape())
        }

        let newShape = queue.shift()
        setNewShapesQueue(queue)
        return newShape
    }

    const tick = () => {
        if (!shapes.movingBlock) {
            setShapes(
                {
                    ...shapes,
                    movingBlock: getShapeFromQueue(),
                }
            )
        }
        else {
            if (shapes.movingBlock.isShapeOnFrontier(shapes.frontierAndStoppedBlocks)) {
                let newFrontierAndStoppedBlocks = getNewFrontierAndStoppedBlocks(shapes.frontierAndStoppedBlocks, shapes.movingBlock);
                if (isFrontierOnLimit(newFrontierAndStoppedBlocks)) {
                    props.gameCompleted();
                    return;
                }

                setShapes(
                    {
                        movingBlock: getShapeFromQueue(),
                        frontierAndStoppedBlocks: newFrontierAndStoppedBlocks,
                    }
                )
            }
            else {
                moveMovingBlock1StepDown();
            }
        }
    }

    const isFrontierOnLimit = (currentFrontier) => {
        return currentFrontier.map(a => a.findIndex(e => e !== undefined)).some(x => x <= 1 && x !== -1);
    }



    const getNewFrontierAndStoppedBlocks = (currentFrontierAndStoppedBlocks, movingBlock) => {
        let newFrontierAndStoppedBlocks = currentFrontierAndStoppedBlocks.map(subArray => subArray.slice());
        movingBlock.points.map(
            ([x, y]) =>
                newFrontierAndStoppedBlocks[x][y] = movingBlock.color
        )
        let cleanFrontier = removeCompletedLines(newFrontierAndStoppedBlocks);
        return cleanFrontier;
    }

    const moveMovingBlock1StepDown = () => {
        setShapes({
            ...shapes,
            movingBlock: shapes.movingBlock.moveDown(),
        })
    }

    return (
        <div>

            {
                shapes.movingBlock &&
                shapes.movingBlock.points.map(
                    ([x, y], pointIndex) =>
                        <ShapeRender
                            x={x}
                            y={y}
                            key={'key_' + pointIndex + '_' + shapes.movingBlock.shapeId}
                            marginTop={MARGIN_TOP}
                            color={shapes.movingBlock.color}
                            transitionDuration={'0.2s'}
                        />
                )

            }
            {
                shapes.frontierAndStoppedBlocks.map(
                    (col, colIndex) =>
                        col.map(
                            (row, rowIndex) =>
                                row !== undefined &&
                                <ShapeRender
                                    x={colIndex}
                                    y={rowIndex}
                                    key={'key_' + colIndex + '_' + rowIndex}
                                    marginTop={MARGIN_TOP}
                                    color={row}
                                />
                        )
                )
            }

            {
                state.indexOfRowsToCollapse.length > 0 &&
                <CollapsingRow rowHeight={'min(10vw,50px)'} marginTop={MARGIN_TOP} />
            }


            <div id="border" key={'border'} style={{
                backgroundColor: 'white',
                width: 'min(calc(100vw - 2px),500px)',
                height: 'min(100vw,500px)',
                position: 'fixed',
                border: '1px solid black',
                zIndex: '-1',
                marginTop: MARGIN_TOP,
            }}
            />

            {
                newShapesQueue &&
                newShapesQueue[0] &&
                newShapesQueue[0].points.map(
                    ([x, y], pointIndex) =>
                        <div
                            key={'key_' + newShapesQueue[0].shapeId + '_' + pointIndex}
                            style={{
                                backgroundColor: newShapesQueue[0].color,
                                width: 'min(5vw,20px)',
                                height: 'min(5vw,20px)',
                                position: 'fixed',
                                zIndex: 1,
                                transform: `translate(min(calc(${x}*5vw),${x * 20}px), min(calc(${y}*5vw + ${'0px'}), calc(${y * 20}px + ${'0px'})))`,
                            }} ></div>
                )

            }
            <div style={{ paddingTop: '10px', }}>
                Score: {state.score}
            </div>

        </div>
    );


}


export default Game;