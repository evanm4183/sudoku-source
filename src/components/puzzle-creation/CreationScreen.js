import { useState, useEffect } from "react"
import { PuzzleGridForm } from "./PuzzleGridForm"
import "./PuzzleCreation.css"
import { PuzzleAttributesForm } from "./PuzzleAttributesForm"
import { generateSolution } from "../../solution-generator/solutionGenerator"

export const CreationScreen = () => {
    const [solution, updateSolution] = useState(Array(81).fill(0)) // using flat array
    const [display, updateDisplay] = useState(Array(81).fill(0))
    const [editedIndex, updateEditedIndex] = useState()

    useEffect(() => {
        const copy = [...display]
        copy[editedIndex] = solution[editedIndex]
        updateDisplay(copy)
    }, [solution])

    // There's two boards, the solution and display board. The solution board holds the solution, and the display board is what the user will see.
    // The display board is updated any time the solution board changes, but not vice versa. This component mediates between the two puzzle creation
    // boards. Whenever the solution board changes, it needs a way to coordinate a corresponding change in the display board, and it does that via
    // this component. The updateSolution function is passed as a prop to the child component, so that way any time the board is updated in the child
    // component the parent component will also know. It uses editedIndex to track which index changed. Whenever, the solution board is changed, the
    // useEffect is used to update the display board accordingly.
    return (
        <>
            <article className="puzzle-screen-container">
                <div className="puzzle-grids-container">
                    <section className="puzzle-form-container">
                        <h3 className="grid-title">Solution</h3>
                        <PuzzleGridForm boardArr={solution} updateArr={updateSolution} idName={"solution"} isSolution={true} updateEditedIndex={updateEditedIndex}/>
                        <button 
                            className="template-button" 
                            onClick={() => {
                                const template = generateSolution()
                                updateSolution(template)
                                updateDisplay(template)
                            }}
                        >Generate Template</button>
                    </section>
                    <section className="puzzle-form-container">
                        <h3 className="grid-title">Solver's View</h3>
                        <PuzzleGridForm boardArr={display} updateArr={updateDisplay} idName={"display"} />
                        <footer className="board-footer"><em>Input underscores to represent hidden squares</em></footer>
                    </section>
                </div>
                <PuzzleAttributesForm solution={solution} display={display}/>
            </article>
        </>
    )
}