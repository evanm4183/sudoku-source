const determineClass = (index) => {
    if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
        return "corner-cell"
    } else if (index % 9 === 2 || index % 9 === 5) {
        return "side-border-cell"
    } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) {
        return "bottom-border-cell"
    }

    return "regular-cell"
}

const determineValue = (num) => {
    if (num === 0) {
        return ""
    }
        
    return num
}

const validInput = (char, isSolution) => {
    const asciiVal = char.charCodeAt(0)

    if (isSolution) {
        return (asciiVal >= 49 && asciiVal <= 57) 
    }

    return (asciiVal >= 49 && asciiVal <= 57) || asciiVal === 95
}

export const PuzzleGridForm = ({boardArr, updateArr, idName, isSolution, updateEditedIndex}) => {

    return (
        <article className="grid-container">
            {
                boardArr.map((cell, index) => { // cell represents the value in the cell (poorly named)
                    return (
                        <input 
                            type="text" 
                            className={determineClass(index)} 
                            value={determineValue(cell)} 
                            id={`${idName}--${index}`}
                            key={index}
                            maxLength="1"
                            autoComplete="off"
                            onClick={e => {e.target.select()}}
                            onChange={
                                (e) => {
                                    const copy = [...boardArr]

                                    if (isNaN(e.target.value.charCodeAt(0))) { //prevents NaN from being input in arr when backspace is used
                                        copy[index] = 0
                                        updateArr(copy)

                                        return
                                    } else if (!validInput(e.target.value, isSolution)) { //checks to make sure the input is not anything other than 1-9 and _
                                        window.alert("Invalid Input")
                                        return
                                    }

                                    isNaN(e.target.value) 
                                        ? copy[index] = e.target.value 
                                        : copy[index] = parseInt(e.target.value)
                                    updateArr(copy)

                                    if (isSolution) {
                                        updateEditedIndex(index)
                                    }
                                }
                            }
                        ></input>
                    )
                })
            }
        </article>
    )
}