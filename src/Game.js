import React, { useState, useEffect } from 'react';
import { SemiPlus, Shape, Square, Stick } from './Shapes/Shape';
import { getARandomInt, getMultidimensionalArray } from './Util';


//TODO: delete complete rows
//TODO: game over


const Game = () => {
    const [timer, setTimer] = useState(0); //TODO:change it to ref later

    const [shapes, setShapes] = useState({
        movingBlock: null,
        stoppedBlocks: [],
        frontier: (new Array(10)).fill(8),
        keydownCounter: 0,
    });

    useEffect(
        () => {            
            setTimer(1);//this is to trigger the timer
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown)
        }, []
    )

    useEffect(
        () => {
            if (timer > 0) {
                tick();
                setTimeout(() => {                    
                    setTimer(timer + 1);
                }, 1000);
            }
        }, [timer]
    )

    useEffect(
        () => {            
            if (shapes.movingBlock) {
                console.log(shapes.movingBlock.points.map(a => a[0]).flat());               
            }
        }, [shapes]
    )

    const tick = () => {


        if (!shapes.movingBlock) {
            let [newMovingBlock, newStoppedBlocks] = createANewMovingBlock();
            setShapes(
                {
                    ...shapes,
                    movingBlock: newMovingBlock,
                }
            )
        }
        else {
            if (shapes.movingBlock.isShapeOnFrontier(shapes.frontier)) {
                let newFrontier = getNewFrontier(shapes.frontier, shapes.movingBlock);
                if (isFrontierOnLimit(newFrontier))
                    return;

                let [newMovingBlock, newStoppedBlocks] = createANewMovingBlock();
                setShapes(
                    {
                        frontier: newFrontier,
                        movingBlock: newMovingBlock,
                        stoppedBlocks: newStoppedBlocks,
                    }
                )
            }
            else {
                moveMovingBlock1StepDown();
            }
        }


    }


    const isFrontierOnLimit = (currentFrontier) => {
        return currentFrontier.some(x => x <= 1);
    }

    const handleKeyDown = (e) => {

        setShapes(
            shapes => {

                let movingBlock = new Shape();
                Object.assign(movingBlock, shapes.movingBlock);

                switch (e.keyCode) {
                    case 39:
                        console.log('R');
                        movingBlock.moveRight(shapes.frontier);
                        break;
                    case 37:
                        console.log('L');
                        movingBlock.moveLeft(shapes.frontier);
                        break;
                    case 40:
                        console.log('Down');
                        movingBlock.moveAllWayDown(shapes.frontier);
                        break;
                }

                let currentShapes = { ...shapes }
                currentShapes.movingBlock = movingBlock;
                return currentShapes;
            }
        )
    }





    const createANewMovingBlock = () => {
        let newMovingObject = getANewMovingObject();
        //let newFrontier = shapes.frontier;

        let newStoppedBlocks = [...shapes.stoppedBlocks];
        if (shapes.movingBlock) {
            newStoppedBlocks.push(shapes.movingBlock);
        }

        return [newMovingObject, newStoppedBlocks];

    }




    const getNewFrontier = (currentFrontier, block) => {
        let newFrontier = [...currentFrontier];

        block.points.map(
            ([x, y]) => {
                if (y < newFrontier[x]) {
                    newFrontier[x] = y;
                }
            }
        )


        return newFrontier;
    }

    const getANewMovingObject = () => {
        //TODO: L Shape'ini ekle
        let newMovingObject = null;
        let randomNumber = getARandomInt(3);
        switch (randomNumber) {
            case 0:
                newMovingObject = new Square();
                break;
            case 1:
                newMovingObject = new SemiPlus();
                break;
            case 2:
                newMovingObject = new Stick();
                break;
        }
        return newMovingObject;
    }

    const moveMovingBlock1StepDown = () => {

        setShapes({
            ...shapes,
            movingBlock: shapes.movingBlock.moveDown(),
        })
    }


    return (
        <div>
            {shapes.keydownCounter}
            <div>
                {
                    shapes.movingBlock &&
                    shapes.movingBlock.points.map(
                        ([x, y], pointIndex) => {
                            return (
                                <div>
                                    {x},{y}
                                </div>

                            )
                        }
                    )

                }
            </div>
            {
                shapes.movingBlock &&
                shapes.movingBlock.points.map(
                    ([x, y], pointIndex) => {
                        return (
                            <div key={'key_' + pointIndex + '_' + shapes.movingBlock.shapeId} style={{
                                backgroundColor: shapes.movingBlock.color,
                                width: '50px',
                                height: '50px',
                                position: 'fixed',
                                transition: '0.2s',
                                transform: `translate(${x * 50}px, ${y * 50}px)`

                            }} />
                        )
                    }
                )
            }
            {
                shapes.stoppedBlocks &&
                shapes.stoppedBlocks.map(
                    stoppedBlock =>
                        stoppedBlock.points.map(
                            (point, pointIndex) => {
                                return (
                                    <div key={'key_' + pointIndex + '_' + stoppedBlock.shapeId} style={{
                                        backgroundColor: stoppedBlock.color,
                                        width: '50px',
                                        height: '50px',
                                        position: 'fixed',
                                        //transition: '0.2s',
                                        transform: `translate(${point[0] * 50}px, ${point[1] * 50}px)`

                                    }} />
                                )
                            }
                        )
                )
            }

            <div id="border" key={'border'} style={{
                backgroundColor: 'white',
                width: '500px',
                height: '500px',
                position: 'fixed',
                border: '1px solid black',
                zIndex: '-1',

            }} />
        </div>
    );


}


export default Game;