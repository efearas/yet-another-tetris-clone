import React,{useEffect,useRef,useState} from 'react';
import { Shape,Stick } from './Shapes/Shape';

const KeyPress = () => {
    const [counter, setCounter] = useState(0);
    const [x, setX] = useState(0);
    const [buttonColor, setButtonColor] = useState('green');
    let buttonCtr = useRef(0);
    
    useEffect(
        ()=>{
            window.addEventListener('keydown',keyDown)
            let shape = new Shape();
            console.log(shape.point1);
            let stick = new Stick();
            console.log(stick.point5);
        },[]
    )

    useEffect(
        ()=>{
            setTimeout(() => {
                incrementCounter();        
            }, 1000);
        },[counter]
    )
    
    const keyDown = (e) => {
        //console.log(e);

        if(e.keyCode === 39) {
            setX((x) => x+20);            
            console.log('right 1');
        }
        else if (e.keyCode === 37)
        {
            setX((x) => x-20);            
            console.log('left 1');
        }
    }
    
    const incrementCounter = () => {
        setCounter(counter + 20);
    }

    const clickButton = () => {
        if(buttonColor === 'green'){
            setButtonColor('pink')
        }
        else {
            setButtonColor('green')
        }
        buttonCtr.current = buttonCtr.current + 10;
        console.log(buttonCtr.current);
    }



    return (
        <div>
            <div style={{
                width:'100%',
                display:'flex',
                justifyContent:'flex-end',
            }}>
                {x},{buttonCtr.current}
            </div>
            <button onClick={clickButton} style={{
                backgroundColor:buttonColor,
                transition: '3.5s',
            }}
            >this is button</button>
            
            {
                <div id="id1" key="key1"  style={{
                    backgroundColor: 'green',                    
                    width: '50px',
                    height: '50px',
                    position: 'fixed',                    
                    transition: '0.5s',
                    transform: `translate(${x}px, ${counter%200}px)`

                    //left: x + 'px',
                }} />
                    
            }
        </div>
    );
}

export default KeyPress;