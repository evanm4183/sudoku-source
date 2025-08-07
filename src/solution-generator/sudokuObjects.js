let board = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
]

export const getBoard = () => {
    return board.map(row => [...row])
}

export const resetAvailableNumbers = () => { 
    return {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true}
}

// This should probably be renamed.
// This is converting the available numbers dictionary to an array. It only containes the available numbers
// not all numbers like the dictionary.
export const convertToArray = (availableNumbers) => { 
    let availableNumsArray = [] 

    for (let i = 1; i < 10; i++) {
        if (availableNumbers[i]) {
            availableNumsArray.push(i)
        }
    }

    return availableNumsArray
}