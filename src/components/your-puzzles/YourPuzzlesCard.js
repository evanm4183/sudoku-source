import { MiniBoard } from "../home-feed/MiniBoard"
import { Link, useNavigate } from "react-router-dom"

const countLikes = (likes, puzzleId) => {
    let count = 0

    for (const like of likes) {
        if (like.completePuzzleId === puzzleId) {
            count++
        }
    }

    return count
}

const countDislikes = (dislikes, puzzleId) => {
    let count = 0

    for (const dislike of dislikes) {
        if (dislike.completePuzzleId === puzzleId) {
            count++
        }
    }

    return count
}

export const YourPuzzlesCard = ({puzzle, getYourPuzzles, likes, dislikes, showComplete}) => {
    const resource = showComplete ? "completePuzzles" : "incompletePuzzles"
    const navigate = useNavigate()

    return (
        <article>
            <div className="card-container">
                <MiniBoard puzzle={puzzle} />
                <div className="description-container">
                    <div className="puzzle-title-container">
                        <h4 className="puzzle-header">Title:</h4>
                        {
                            showComplete
                                ? <div><Link to={`/puzzles/${puzzle.id}`}>{puzzle.title}</Link></div>
                                : <div>{puzzle.title}</div>
                        }
                    </div>
                    <div className="author-container">
                        <h4 className="puzzle-header">Author:</h4>
                        <div><em>{puzzle.user.username}</em></div>
                    </div>
                    <div className="difficulty">
                        <h4 className="puzzle-header">Difficulty:</h4>
                        <div><em>{puzzle?.difficulty?.name}</em></div>
                    </div>
                </div>
                <div className="likes-container"> 
                    {
                        showComplete
                            ? <>
                                <div><strong>Likes: </strong>{countLikes(likes, puzzle.id)}</div>
                                <div><strong>Dislikes: </strong>{countDislikes(dislikes, puzzle.id)}</div>
                            </>
                            : ""
                    }
                    <button 
                        className="delete-button"
                        onClick={(e) => {
                            navigate(`edit/${resource}/${puzzle.id}`)
                        }}
                    >Edit</button>
                    <button 
                        className="delete-button" 
                        id={`delete--${puzzle.id}`}
                        onClick={(e) => {
                            const [,puzzleId] = e.target.id.split("--")

                            fetch(`http://localhost:8088/${resource}/${puzzleId}`, {
                                method: "DELETE"
                            })
                            .then(() => {getYourPuzzles()})
                        }}
                    >Delete</button>
                </div>
            </div>
        </article>
    )
}