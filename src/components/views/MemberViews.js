import { Routes, Route } from "react-router-dom"
import { CreationScreen } from "../puzzle-creation/CreationScreen"
import { HomeFeed } from "../home-feed/HomeFeed"
import { YourPuzzlesFeed } from "../your-puzzles/YourPuzzlesFeed"
import { FullSizePuzzleScreen } from "../full-size-puzzle/FullSizePuzzleScreen"
import { PuzzlePlayer } from "../puzzle-player/PuzzlePlayer"
import { EditScreen } from "../puzzle-edit/EditScreen"

export const MemberViews = () => {

    return (
        <Routes>
            <Route path="/" element={<HomeFeed />} />
            <Route path="/createPuzzle" element={<CreationScreen />} />
            <Route path="/yourPuzzles" element={<YourPuzzlesFeed />} />
            <Route path="puzzles/:puzzleId" element={<FullSizePuzzleScreen />} />
            <Route path="/play/:puzzleId" element={<PuzzlePlayer />} />
            <Route path="/yourPuzzles/edit/:resource/:puzzleId" element={<EditScreen />} />
        </Routes>
    )
}