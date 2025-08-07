import { getBoard, convertToArray } from "./sudokuObjects";
import { getAvailableNumbers } from "./availableNumbers";

const getRandomInt = (upperBound) => { //returns a random int in the range of [0, upperBound - 1]
    return Math.floor(Math.random() * upperBound)
}

const attemptSolution = (board) => { //attempts to generate a solved Sudoku
    let rowNum = 0
    let rowIndex = 0 // This is the column. Not sure why I didn't name it col or something like that.
    let availableNumbers

    while (true) {
        availableNumbers = convertToArray(getAvailableNumbers(board, [rowNum, rowIndex]))
        board[rowNum][rowIndex] = availableNumbers[getRandomInt(availableNumbers.length)]
        // getRandomInt is intended to return an random index in the availableNumbers arrary.
        
        // Generating the solution in a "reverse L" pattern.
        // I believe it worked better when doing it this way as opposed to a row by row pattern.
        if (rowNum === 8 && rowIndex === 8) {
            break
        }
        
        // I'm starting a rowIndex + 1 and rowNum because I don't want to "double count" the corner index.
        for (let i = rowIndex + 1; i < 9; i++) {
            availableNumbers = convertToArray(getAvailableNumbers(board, [rowNum, i]))
            board[rowNum][i] = availableNumbers[getRandomInt(availableNumbers.length)]
        }
        for (let i = rowNum + 1; i < 9; i++) {
            availableNumbers = convertToArray(getAvailableNumbers(board, [i, rowIndex]))
            board[i][rowIndex] = availableNumbers[getRandomInt(availableNumbers.length)]
        }

        rowNum++
        rowIndex++
    }

    return board
}

const hasUndefined = (board) => {
    for (const row of board) {
        for (const cell of row) {
            if (cell === undefined) {
                return true
            }
        }
    }

    return false
}

export const generateSolution = () => { //attempts to generate a solution until successful
    let blankBoard = getBoard()
    let solvedBoard = attemptSolution(blankBoard)

    while (hasUndefined(solvedBoard)) {
        blankBoard = getBoard()
        solvedBoard = attemptSolution(blankBoard)
    }

    return solvedBoard.flat()
}