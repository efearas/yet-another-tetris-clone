import { useEffect, useRef } from "react";

const useSwipeEvents = () => {
    const startPoint = useRef();

    useEffect(() => {
        window.addEventListener('touchstart', touchStartHandler);
        window.addEventListener('touchmove', touchMoveHandler);
        //window.addEventListener('touchend', touchStartHandler);

        return () => {
            window.removeEventListener('touchstart', touchStartHandler);
            window.removeEventListener('touchmove', touchMoveHandler);
        }
    }, [])

    const touchStartHandler = ({targetTouches:[touchPoint]}) => {
        resetStartPoints(touchPoint);
    }

    const touchMoveHandler = ({targetTouches:[touchPoint]}) => {
        if (touchPoint.clientX - startPoint.current.x > 50) {
            resetStartPoints(touchPoint);
            window.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': '39' }));
        }
        if (touchPoint.clientX - startPoint.current.x < -50) {
            resetStartPoints(touchPoint);
            window.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': '37' }));
        }
        if (touchPoint.clientY - startPoint.current.y > 50) {
            resetStartPoints(touchPoint);
            window.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': '40' }));
        }
        if (touchPoint.clientY - startPoint.current.y < -50) {
            resetStartPoints(touchPoint);
            window.dispatchEvent(new KeyboardEvent('keydown', { 'keyCode': '38' }));
        }

    }

    const resetStartPoints = (touchPoint) => {
        startPoint.current = {
            x: touchPoint.clientX,
            y: touchPoint.clientY,
        }
    }


}


export default useSwipeEvents;