import React, { useState, useEffect, useContext } from 'react';
import { getMultidimensionalArray } from './Util';
import { ROW_COUNT, COL_COUNT } from './Constants';
import { store } from './Store.js';

const useCompletedLines = () => {
    const globalState = useContext(store);
    const {state,dispatch} = globalState;

    const removeCompletedLines = (frontierAndStoppedBlocks) => {
        let newFrontierAndStoppedBlocks = frontierAndStoppedBlocks.map(subArray => subArray.slice());
        let completedLinesArr = getCompletedLines(newFrontierAndStoppedBlocks);
        newFrontierAndStoppedBlocks = moveRemainingLinesDown(frontierAndStoppedBlocks, completedLinesArr);        
        dispatch({type:'COLLAPSE_ANIMATION',payload:{indexOfRowsToCollapse:completedLinesArr}});
        if(completedLinesArr.length>0)
            dispatch({type:'INCREASE_SCORE',payload:{increment:completedLinesArr.length}});
        return newFrontierAndStoppedBlocks;
    }
    
    const moveRemainingLinesDown = (frontierAndStoppedBlocks, completedLinesArr) => {
        let newFrontierAndStoppedBlocks = getMultidimensionalArray(COL_COUNT, ROW_COUNT, undefined);
    
    
        for (let ctr = 0; ctr < frontierAndStoppedBlocks[0].length; ctr++) {
            if (completedLinesArr.find(a => a === ctr) === undefined) {
                let stepCount = completedLinesArr.filter(a=> ctr<a).length;
                for (let i = 0; i < frontierAndStoppedBlocks.length; i++) {
                    newFrontierAndStoppedBlocks[i][ctr+stepCount] = frontierAndStoppedBlocks[i][ctr];
                }
            }
        }
    
        return newFrontierAndStoppedBlocks;
    }
    
    
    const getCompletedLines = (frontierAndStoppedBlocks) => {
        let completedLinesArr = [];
        for (let i = 0; i < frontierAndStoppedBlocks[0].length; i++) {
            let completedLine = true;
            for (let m = 0; m < frontierAndStoppedBlocks.length; m++) {
                if (frontierAndStoppedBlocks[m][i] === undefined) {
                    completedLine = false;
                    break;
                }
            }
            if (completedLine)
                completedLinesArr.push(i);
        }
        return completedLinesArr;
    }
        
    return {removeCompletedLines}
}



export default useCompletedLines;