const getARandomInt = (upperLimit) => {
    return Math.floor(Math.random() * upperLimit);
}

const getRandomString = (length = 6) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

const getMultidimensionalArray = (numberOfRows, numberOfColumns, fillValue) => {
    let arr = [];
    for (let i = 0; i < numberOfRows; i++) {     
        arr[i] = []
        for (let i2 = 0; i2 < numberOfColumns; i2++) {
            arr[i][i2] = fillValue
        }
    }
    return arr;
}

const transpose = (matrix) => {    
    return matrix[0].map((row, colIndex) => matrix.map(row2 => row2[colIndex]))        
}

const reverseColumnsOfAMatrix = (matrix) => {
    return matrix.map(row => row.map((col, colIndex) => row[row.length-colIndex-1]) )        
}

export { getARandomInt, getRandomString, getMultidimensionalArray, transpose, reverseColumnsOfAMatrix };