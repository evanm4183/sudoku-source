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
    
const showCell = (value) => {
    if (value === "_" || value === 0) {
        return ""
    }
    
    return value 
}
    
export const PlayerBoard = ({playerBoard, puzzle}) => {

    return (
        <div className="full-grid-container">
            {
                playerBoard.map((cell, index) => {
                    if (!(puzzle?.display[index] === "_" || puzzle?.display[index] === "0")) {
                        return (
                            <div 
                                className={determineClass(index, "permanent")} 
                                key={index}
                            >{showCell(cell)}</div> 
                        )
                        // The permanent class, as the name suggests, is a number that can't be changed.
                        // It is displayed as black.
                    }

                    return (
                        <div 
                            className={determineClass(index, "bottom")} 
                            key={index}
                        >{showCell(cell)}</div>
                        )
                        // The bottom class is for numbers that can be changed. These are displayed as purple.
                        // Not 100% sure why it's name "bottom". I think it's because it's supposed to be on the bottom layer.
                })
            }
        </div>
    )
}