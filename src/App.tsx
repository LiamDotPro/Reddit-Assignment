import Controls from "./components/controls/Controls.tsx";
import Board from "./components/board/Board.tsx";
import {useEffect, useState} from "react";
import {BoatVariant, Cell} from "./components/board/Board.interfaces.ts";
import './App.scss'
import {ShipInfo} from "./App.interfaces.ts";
import {generateBoard} from "./lib/board.helpers.ts";
import Legend from "./components/legend/Legend.tsx";

function App() {

    const [useDummyData, setUseDummyData] = useState(true)

    // Holds the mappings for enum of ships and there lengths.
    const ships: Record<BoatVariant, ShipInfo> = { // Use BoatVariant enum as the key type
        [BoatVariant.AIRCRAFT_CARRIER]: {name: "Aircraft Carrier", length: 5},
        [BoatVariant.BATTLESHIP]: {name: "Battleship", length: 4},
        [BoatVariant.CRUISER]: {name: "Cruiser", length: 3},
        [BoatVariant.SUBMARINE]: {name: "Submarine", length: 3},
        [BoatVariant.DESTROYER]: {name: "Destroyer", length: 2},
    };

    // Constant board state, could be updated for different rows/cols
    const rows = 10
    const cols = 10

    // Initialize the grid state
    const initialGrid: Cell[][] = Array.from({length: rows}, () =>
        Array.from({length: cols}, () => ({
            row: 0,
            col: 0,
            hasShip: false,
            isHit: false,
            isMissed: false,
            shipName: undefined
        }))
    );


    // Holds the grid and board state
    const [grid, setGrid]: [Cell[][], ((value: (((prevState: Cell[][]) => Cell[][]) | Cell[][])) => void)] = useState(initialGrid);

    // Handles if we should show the game over screen
    const [gameOver, setGameOver] = useState(false);

    /**
     * Resets the game so it can be played again.
     */
    const resetGame = () => {
        // Generate a new random board
        const randomBoard = generateBoard(rows, cols, ships, useDummyData);

        if (randomBoard) {
            setGrid(randomBoard);
            setGameOver(false); // Reset the game-over state
        } else {
            console.error("Failed to generate a valid board.");
        }
    }


    /**
     * Starting state attempts to generate a random board once to begin.
     */
    useEffect(() => {
        const randomBoard = generateBoard(rows, cols, ships, useDummyData);
        if (randomBoard) {
            setGrid(randomBoard);
        } else {
            console.error("Failed to generate a valid board.");
        }
    }, []);

    /**
     * Changes the strategy we want to use for the board.
     */
    const updateBoardStrategy = () => {
        // set it to the opposite of the current strategy
        setUseDummyData(!useDummyData)
    }

    /**
     * If our strategy is changed reset the board subsequently.
     */
    useEffect(() => {
        // reset the game.
        resetGame()
    }, [useDummyData])

    return (
        <div className="game-container">
            <div>
                <h1>Battleships</h1>
            </div>
            <Controls boardStrategy={useDummyData} resetGame={resetGame} setBoardStrategy={updateBoardStrategy}/>
            <div className="board-container">
                <Board cols={cols}
                       rows={rows}
                       grid={grid}
                       setGrid={setGrid}
                       setGameOver={setGameOver}
                       gameOver={gameOver}
                />
            </div>
            <Legend/>
        </div>
    )
}

export default App
