import React, { useEffect, useState } from 'react';



const ArrayOfDivs = () => {

    const [divColor, setDivColor] = useState('green');
    const [divsAndColors, setDivsAndColors] = useState([]);

    const [gameMatrix, setGameMatrix] = useState(null);
    const counterIncrement = 100;
    const [counter, setCounter] = useState(0);


    useEffect(
        () => {
            initGameMatrix();


            /*
            setTimeout(() => {
                
                setGameMatrix(gameMatrix => {
                    let colIndex = Math.floor(Math.random() * 10);
                    let rowIndex = Math.floor(Math.random() * 10);                
                    let tempArr = [...gameMatrix];
                    console.log('***');
                    console.log(tempArr);
                    tempArr[rowIndex][colIndex] = true;
                    console.log(tempArr);
                    console.log('***');
                    return tempArr;
                });
            }, 2000);*/

        }, []
    )


    const updateMatrix = () => {

        if (Array.isArray(gameMatrix)) {
            let colIndex = Math.floor(Math.random() * 10);
            let rowIndex = Math.floor(Math.random() * 10);
            let tempArr = [...gameMatrix];
            tempArr[rowIndex][colIndex] = getRandomColor();
            setGameMatrix([...tempArr]);
        }

    }


    const incrementCounter = () => {
        setCounter(counter + counterIncrement);
        if (counter % 10 === 0) {
            updateMatrix();
        }
    }

    useEffect(
        () => {
            //console.log(gameMatrix)

            setTimeout(
                incrementCounter
                , counterIncrement);

        }, [counter]
    )

    const initGameMatrix = () => {
        let newArr = new Array(10);
        for (let i = 0; i < newArr.length; i++) {
            let subArray = new Array(5);
            subArray.fill(undefined);
            newArr[i] = subArray;
        }
        //console.log(newArr);
        setGameMatrix(newArr);

    }

    const getRandomColor = () => {
        const colors = ['green', 'red', 'blue', 'pink', 'yellow'];
        let randomNum = Math.random() * colors.length;
        //console.log(randomNum);
        let randomIndex = Math.floor(randomNum);
        //console.log(randomIndex);
        //setDivColor(colors[randomIndex]);
        return colors[randomIndex];
    }


    return (

        <div>
            {counter}
            {
                gameMatrix && gameMatrix.map(
                    (row, rowIndex) =>
                        row.map(
                            (col, colIndex) => {
                                if (col !== undefined) {
                                    return (<div key={rowIndex + '_' + colIndex} style={{
                                        backgroundColor: col,
                                        //backgroundColor: getRandomColor(),
                                        width: '50px',
                                        height: '50px',
                                        position: 'fixed',
                                        top: (rowIndex * 50 + 100) + 'px',
                                        left: colIndex * 50 + 'px',
                                    }} >
                                        mo
                                    </div>)
                                }

                            }

                        )

                )
            }


        </div>
    )
}

export default ArrayOfDivs;