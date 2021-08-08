import { useEffect } from "react";

const ShapeRender = ({ x, y, color, marginTop, transitionDuration }) => {
    return (
        <div  style={{
            backgroundColor: color,
            width: 'min(10vw,50px)',
            height: 'min(10vw,50px)',
            position: 'fixed',
            transition: transitionDuration ? transitionDuration : null,
            zIndex: 1,
            transform: `translate(min(calc(${x}*10vw),${x * 50}px), min(calc(${y}*10vw + ${marginTop}), calc(${y * 50}px + ${marginTop})))`,
        }} ></div>
    )
}

export default ShapeRender;