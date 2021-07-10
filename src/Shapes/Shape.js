import { getRandomString } from "../Util";


export class Shape {
    constructor(points, color) {
        this.shapeId = getRandomString();
        this.points = points;
        this.color = color;
    }

    //TODO: rotate ekle
    isShapeOnFrontier(frontier) {
        //console.log(frontier);
        //console.log(this.points);
        return this.points.some(([x, y]) => y >= (frontier[x] - 1));
    }

    moveDown(stepSize = 1) {
        this.points = this.points.map(
            point => {
                return [point[0], point[1] + stepSize]
            }
        )
        return this;
    }

    moveAllWayDown(frontierArray) {
        let minDistance = Math.min(
            ...this.points.map(
                ([x, y]) =>
                    frontierArray[x] - y
            )
        )
        this.moveDown(minDistance-1);        
        return this; 
    }

    moveRight(frontier) {        
        if (this.points.some(([x, y]) => x === 9))
            return;
        if (this.points.some(([x, y]) => frontier[x+1] === y ))
            return;
        return this.#moveHorizontal(1);
    }

    moveLeft(frontier) {
        if (this.points.some(([x, y]) => x === 0))
            return;
        if (this.points.some(([x, y]) => frontier[x-1] === y ))
            return;
        return this.#moveHorizontal(-1);
    }

    #moveHorizontal(distance) {

        //console.log(this.points);
        this.points = this.points.map(
            ([x, y]) => {
                return [x + distance, y]
            }
        )        
        //console.log(this.points);
        return this;
    }
}


export class Square extends Shape {
    constructor() {
        let points = [
            [4, 0],
            [5, 0],
            [4, 1],
            [5, 1]
        ];
        super(points, 'green');

    }


}

export class SemiPlus extends Shape {
    constructor() {
        let points = [
            [5, 0],
            [4, 1],
            [5, 1],
            [6, 1]
        ];
        super(points, 'yellow');

    }


}

export class Stick extends Shape {
    constructor() {
        let points = [
            [4, 0],
            [5, 0],
            [6, 0],
            [7, 0]
        ];
        super(points, 'purple');

    }


}