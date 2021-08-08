import { LShape, SemiPlus, Square, SShape, Stick } from './Shapes/Shape';
import { getARandomInt } from './Util';

export const getANewShape = () => {

    let newMovingObject = null;
    let randomNumber = getARandomInt(4);
    //let randomNumber = 2;
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
        case 3:
            newMovingObject = new LShape();
            break;
        case 4:
            newMovingObject = new SShape();
            break;
    }
    return newMovingObject;
}