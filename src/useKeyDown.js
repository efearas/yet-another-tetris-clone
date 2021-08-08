import React, { useState, useEffect, useContext } from 'react';

export const useKeyDown = (shapes, setShapes) => {    
    useEffect(
        () => {
            window.addEventListener('keydown', handleKeyDown);
            return () => window.removeEventListener('keydown', handleKeyDown)
        }, []
    )

    const handleKeyDown = (e) => {
        setShapes(
            shapes => {                
                let movingBlock = Object.assign(Object.create(Object.getPrototypeOf(shapes.movingBlock)), shapes.movingBlock)
                
                switch (e.keyCode) {
                    case 39://right
                        movingBlock.moveRight(shapes.frontierAndStoppedBlocks);
                        break;
                    case 37://left
                        movingBlock.moveLeft(shapes.frontierAndStoppedBlocks);
                        break;
                    case 40://down
                        movingBlock.moveAllWayDown(shapes.frontierAndStoppedBlocks);
                        break;
                    case 38://up
                        movingBlock.rotate(shapes.frontierAndStoppedBlocks);
                        break;
                }

                let currentShapes = { ...shapes }
                currentShapes.movingBlock = movingBlock;
                return currentShapes;
            }
        )
    }

}

