const determineClass = (index) => {
    // index is in the 3rd or 6th column and in the 3rd or 6th row
    if ((index % 9 === 2 || index % 9 === 5) && ((index >= 18 && index <= 26) || (index >= 45 && index <= 53))) {
        return "corner-cell-mini"
    } else if (index % 9 === 2 || index % 9 === 5) { // in the 3rd or 6th column
        return "side-border-cell-mini"
    } else if ((index >= 18 && index <= 26) || (index >= 45 && index <= 53)) { // in the 3rd or 6th row
        return "bottom-border-cell-mini"
    }

    return "regular-cell-mini"
}

const showCell = (value) => {
    if (value === "_" || value === 0) {
        return ""
    }

    return value 
}

export const MiniBoard = ({puzzle}) => {
    
    return (
        <article className="mini-grid-container">
            {
                puzzle.display.map((cell, index) => {
                    return (
                        <div className={determineClass(index)} key={index}>{showCell(cell)}</div>
                    )
                })
            }
        </article>
    )
}