const determineClass = (index, suffix) => {
    if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
        return `corner-cell-${suffix}`
    } else if (index % 9 === 2 || index % 9 === 5) {
        return `side-border-cell-${suffix}`
    } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) {
        return `bottom-border-cell-${suffix}`
    }
    
    return `regular-cell-${suffix}`
}

const validInput = (char) => {
    const asciiVal = char.charCodeAt(0)

    return ((asciiVal >= 49 && asciiVal <= 57) || char.toLowerCase() === "e") 
}

// All I'm doing is checking the current state of the board against the solution.
const puzzleSolved = (solution, playerBoard) => {
    for (let i = 0; i < 81; i++) {
        if (solution[i] !== playerBoard[i]) {
            return false
        }
    }

    return true
}
  
export const InputBoard = ({puzzle, notes, notesToggled, setNotes, playerBoard, setPlayerBoard, setPuzzleSolved}) => {

    const handleChange = (e, notesToggled, index) => {
        const playerCopy = [...playerBoard]
        const notesCopy = [...notes]

        // "e" is the key I'm using to erase numbers.
        if (e.target.value.toLowerCase() === "e") {
            playerCopy[index] = "_"
            setPlayerBoard(playerCopy)

            notesCopy[index] = ["_", "_", "_", "_", "_", "_", "_", "_", "_"]
            setNotes(notesCopy)

            return
        }

        const input = parseInt(e.target.value)

        if (notesToggled) {

            if (notes[index][input - 1] !== "_") { // If you input a number that is already present, remove that number.
                notesCopy[index][input - 1] = "_"
                setNotes(notesCopy)
            } else {
                notesCopy[index][input - 1] = input
                setNotes(notesCopy)
            }
            
            // If there is a "big" number in the cell, erase it before adding the note.
            playerCopy[index] = "_"
            setPlayerBoard(playerCopy)
        } 
        else {

            if (playerBoard[index] === input) {
                playerCopy[index] = "_"
                setPlayerBoard(playerCopy)
            } else {
                playerCopy[index] = parseInt(e.target.value)
                setPlayerBoard(playerCopy)
            }
            
            notesCopy[index] = Array(9).fill("_")
            setNotes(notesCopy)

            if (puzzleSolved(puzzle.solution, playerCopy)) {
                setPuzzleSolved(true)
            }
        }
    }

    return (
        <div className="input-grid-container">
            {
                // I'm only returning an editable box for those cells that are empty.
                puzzle?.display?.map((cell, index) => {
                    if (cell === 0 || cell === "_") {
                        return (
                            <input 
                                type="text"
                                className={determineClass(index, "input")} 
                                key={index}
                                maxLength="1"
                                autoComplete="off"
                                onClick={e => {e.target.select()}}
                                onInput={e => {
                                    if (!validInput(e.target.value)) {
                                        window.alert("Invalid Input")
                                        return
                                    }

                                    handleChange(e, notesToggled, index)
                                    e.target.select()
                                }}
                            ></input>
                        )
                    }
                    
                    return ( 
                        <div 
                            className={determineClass(index, "uneditable")} 
                            key={index}
                        ></div>
                    )
                })
            }
        </div>
    )
}