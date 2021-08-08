import { getRandomString, transpose, reverseColumnsOfAMatrix } from "../Util";

export class Shape {
    constructor(points, color, rotationMatrix) {
        this.shapeId = getRandomString();
        this.points = points;
        this.color = color;
        this.rotationMatrix = rotationMatrix;
    }

    isShapeOnFrontier(frontier) {
        return this.points.some(
            ([x, y]) => {
                return y > 8 || (frontier[x][y + 1] !== undefined)
            }
        )
    }

    isPointsInsideTheFrontier(points, frontier) {
        return points.some(
            ([x, y]) => {
                return y > 8 || (frontier[x][y] !== undefined)
            }
        )
    }

    moveDown(stepSize = 1) {
        this.points = this.points.map(
            ([x, y]) => {
                return [x, y + stepSize]
            }
        )
        return this;
    }

    moveAllWayDown(frontierArray) {
        let arrOfDistancesToFrontier = this.points.map(
            ([x, y]) => {
                let distanceToNotUndefined = frontierArray[x].findIndex(a => a !== undefined);
                let distanceToTravelDown = distanceToNotUndefined === -1 ? frontierArray[x].length - y : distanceToNotUndefined - y;
                return distanceToTravelDown;
            }
        )

        let minDistance = Math.min(...arrOfDistancesToFrontier);
        this.moveDown(minDistance - 1);
        return this;
    }

    moveRight(frontier) {
        if (this.points.some(([x, y]) => x === 9))
            return;
        if (this.points.some(([x, y]) => frontier[x + 1][y] !== undefined))
            return;
        return this.moveHorizontal(1);
    }

    moveLeft(frontier) {
        if (this.points.some(([x, y]) => x === 0))
            return;
        if (this.points.some(([x, y]) => frontier[x - 1][y] !== undefined))
            return;
        return this.moveHorizontal(-1);
    }

    moveHorizontal(distance) {
        this.points = this.points.map(
            ([x, y]) => {
                return [x + distance, y]
            }
        )
        return this;
    }

    rotate(frontier) {

        this.rotationMatrix = reverseColumnsOfAMatrix(transpose(this.rotationMatrix));
        let leftMostX = Math.min(...this.points.map(([pointX, pointY]) => pointX))
        let topMostY = Math.min(...this.points.map(([pointX, pointY]) => pointY))        
        let newPointsArray = [];

        this.rotationMatrix.map(
            (row, rowIndex) =>
                row.map(
                    (col, colIndex) => {
                        if (col === 1) {
                            newPointsArray.push([leftMostX + colIndex, topMostY + rowIndex])
                        }
                    }

                )
        );
        
        if (this.isPointsInsideTheFrontier(newPointsArray, frontier))
            return this;

        this.points = newPointsArray;
        return this;
    }

    findPivotPoint(pointsArr) {
        let sum = pointsArr.reduce(
            ([accX, accY], [curX, curY]) => {
                return [accX + curX, accY + curY]
            }
        );
        let averages = [sum[0] / pointsArr.length, sum[1] / pointsArr.length]
        return averages;
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
    rotate() {
        return this;
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
        let rotationMatrix = [
            [0, 1, 0],
            [1, 1, 1]
        ]
        super(points, 'yellow', rotationMatrix);

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

        let rotationMatrix = [

            [1, 1, 1, 1]
        ]
        super(points, 'purple', rotationMatrix);

    }
}

export class LShape extends Shape {
    constructor() {
        let points = [
            [4, 0],
            [4, 1],
            [5, 1],
            [6, 1]
        ];

        let rotationMatrix = [
            [1, 0, 0],
            [1, 1, 1]
        ]
        super(points, 'pink', rotationMatrix);
    }

}

export class SShape extends Shape {
    constructor() {
        let points = [
            [4, 0],
            [5, 0],
            [5, 1],
            [6, 1]
        ];

        let rotationMatrix = [
            [1, 1, 0],
            [0, 1, 1]
        ]
        super(points, 'orange', rotationMatrix);
    }

}

