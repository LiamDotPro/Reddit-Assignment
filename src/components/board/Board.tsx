import {FC, useEffect} from "react";
import './Board.styles.scss';
import {BoatVariant, Cell, BoardProps} from "./Board.interfaces.ts";

const Board: FC<BoardProps> = ({rows, cols, grid, setGrid, gameOver, setGameOver}) => {

    /**
     * When actions occur we wish to continuously check for the finished state in the game.
     */
    useEffect(() => {
        checkIfAllShipsAreFound();
    }, [grid]);

    /**
     * Cycle over each ship and find if every ship cell is hit.
     * Set the game over state based on the outcome, notice we use some to exit
     * ahead of time so not ever single ship is checked until they've all been completely hit.
     */
    const checkIfAllShipsAreFound = (): void => {
        const anyShipNotFullyHit = Object.values(BoatVariant).some(ship =>
            !getShipCells(ship).every(cell => cell.isHit)
        );
        setGameOver(!anyShipNotFullyHit);
    };

    /**
     * Retrieves all the cells associated with a specific ship from the game grid.
     *
     * @param shipName - The name/variant of the ship for which cells are to be fetched.
     * @returns An array of cells where the specified ship is present.
     */
    const getShipCells = (shipName: BoatVariant): Cell[] => {
        return grid.flat().filter(cell => cell.hasShip && cell.shipName === shipName);
    };

    /**
     * Renders the boat and ships.
     * Handles the misses and hits depending on the applied classes.
     */
    const renderCells = (): JSX.Element[] => {
        const cells = [];
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const cell = grid[row][col];
                const cellKey = `${row}-${col}`;
                let cellClassName = `cell${cell.isMissed ? " missed" : ""}${cell.isHit ? " hit" : ""}`;

                if (cell.hasShip) {
                    const shipName = cell.shipName;
                    const shipCells = getShipCells(shipName as BoatVariant);

                    if (shipCells.every((shipCell) => shipCell.isHit)) {
                        // All cells of the ship have been hit, add the ship-specific class
                        switch (shipName) {
                            case BoatVariant.AIRCRAFT_CARRIER:
                                cellClassName = " aircraftCarrier";
                                break;
                            case BoatVariant.BATTLESHIP:
                                cellClassName = " battleship";
                                break;
                            case BoatVariant.CRUISER:
                                cellClassName = " cruiser";
                                break;
                            case BoatVariant.SUBMARINE:
                                cellClassName = " submarine";
                                break;
                            case BoatVariant.DESTROYER:
                                cellClassName = " destroyer";
                                break;
                            default:
                                // Handle other ship names here
                                break;
                        }
                    }
                }

                cells.push(
                    <div
                        className={cellClassName}
                        key={cellKey}
                        onClick={() => handleCellClick(row, col)}
                    ></div>
                );
            }
        }
        return cells;
    };


    /**
     * Handles what should happen when clicking a cell based on if
     * the ships cell currently has a ship inside.
     * @param row
     * @param col
     */
    const handleCellClick = (row: number, col: number) => {
        if (gameOver) return;

        const updatedGrid = [...grid];
        const cell = updatedGrid[row][col];

        if (!cell.isHit && !cell.isMissed) {
            cell[cell.hasShip ? 'isHit' : 'isMissed'] = true;
            setGrid(updatedGrid);
        }
    };

    return (<>
            {gameOver && <div className="game-over-container">
                <div className="game-over-text-container">
                    <h1>You Won!</h1>
                </div>
            </div>}
            <div className={`board ${gameOver ? "game-over" : ""}`}>
                {renderCells()}
            </div>
        </>
    );
};

export default Board;
