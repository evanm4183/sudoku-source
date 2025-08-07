import { resetAvailableNumbers } from "./sudokuObjects";

const getBoundary = (index) => { //returns the boundary of the block for a given coordinate
    if (index >= 0 && index <= 2) {
        return [0, 2]
    } else if (index >= 3 && index <= 5) {
        return [3, 5]
    } else if (index >= 6 && index <= 8) {
        return [6, 8]
    } else {
        return "Index out of range"
    }
}

const filterNumbersByBlock = (board, availableNumbers, verticalBoundary, horizontalBoundary) => { //eliminates the number in the same block and returns an availableNumbers object
    let currentCoord = [verticalBoundary[0], horizontalBoundary[0]] //startCoord should be an array in the form [rowNum, rowIndex]
    // currentCoord starts in the top left hand corner of the block.

    // Not sure why I didn't make this a double for loop. Would've been much easier to understand.
    while (currentCoord[0] <= verticalBoundary[1] && currentCoord[1] <= horizontalBoundary[1]) {
        if (board[currentCoord[0]][currentCoord[1]] !== 0) { //checks if the coord has a non-zero number, if it does that number is marked as unavailable
            availableNumbers[board[currentCoord[0]][currentCoord[1]]] = false
        }

        //method for setting the next coord to be within the constraints
        currentCoord = [currentCoord[0], currentCoord[1] + 1]

        if (currentCoord[1] > horizontalBoundary[1]) {
            currentCoord = [currentCoord[0] + 1, horizontalBoundary[0]]
        }
    }

    return availableNumbers
}

const filterNumbersByRow = (board, availableNumbers, horizontalBoundary, rowNum) => { 
    /* 
        Since available numbers has already been filtered by block, this
        function checks the cells outside the coordinate's block and marks them as 
        unavailable if they are non-zero
    */
    if (horizontalBoundary[0] === 0) {
        for (let i = 3; i < 9; i++) {
            if (board[rowNum][i] !== 0) {
                availableNumbers[board[rowNum][i]] = false
            }
        }
    } else if (horizontalBoundary[1] === 8) { // Should've been consistent with using horizontalBoundary[0]
        for (let i = 0; i < 6; i++) {
            if (board[rowNum][i] !== 0) {
                availableNumbers[board[rowNum][i]] = false
            }
        }
    } else {
        for (let i = 0; i < 3; i++) {
            if (board[rowNum][i] !== 0) {
                availableNumbers[board[rowNum][i]] = false
            }
        }
        for (let i = 6; i < 9; i++) {
            if (board[rowNum][i] !== 0) {
                availableNumbers[board[rowNum][i]] = false
            }
        }
    }

    return availableNumbers
}

const filterNumbersbyColumn = (board, availableNumbers, verticalBoundary, rowIndex) => {
    /*
        Same logic as above but with columns instead of row
    */
    if (verticalBoundary[0] === 0) {
        for (let i = 3; i < 9; i++) {
            if (board[i][rowIndex] !== 0) {
                availableNumbers[board[i][rowIndex]] = false
            }
        }
    } else if (verticalBoundary[1] === 8) {
        for (let i = 0; i < 6; i++) {
            if (board[i][rowIndex] !== 0) {
                availableNumbers[board[i][rowIndex]] = false
            }
        }
    } else {
        for (let i = 0; i < 3; i++) {
            if (board[i][rowIndex] !== 0) {
                availableNumbers[board[i][rowIndex]] = false
            }
        }
        for (let i = 6; i < 9; i++) {
            if (board[i][rowIndex] !== 0) {
                availableNumbers[board[i][rowIndex]] = false
            }
        }
    }

    return availableNumbers
}

export const getAvailableNumbers = (board, coord) => {
    let availableNumbers = resetAvailableNumbers()

    // There's a tricky inversion of expectations here. The "x" coord is used to determine the vertical boundary,
    // and the "y" coord is used to determine the horizontal boundary. Ex coord [6, 0].
    let verticalBoundary = getBoundary(coord[0])
    let horizontalBoundary = getBoundary(coord[1])

    availableNumbers = filterNumbersByBlock(board, availableNumbers, verticalBoundary, horizontalBoundary)
    availableNumbers = filterNumbersByRow(board, availableNumbers, horizontalBoundary, coord[0])
    availableNumbers = filterNumbersbyColumn(board, availableNumbers, verticalBoundary, coord[1])

    return availableNumbers
}