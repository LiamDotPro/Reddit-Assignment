import {BoatVariant, Cell} from "../components/board/Board.interfaces.ts";
import {ShipInfo} from "../App.interfaces.ts";

// Generate a random int, used for the placement
const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a board for the grid using the dummy data or alternatively random state.
 * @param rows
 * @param cols
 * @param ships
 * @param useDummyData (optional) If true, will use dummyData to place the ships
 */
export const generateBoard = (rows: number, cols: number, ships: Record<BoatVariant, ShipInfo>, useDummyData: boolean = false): Cell[][] | null => {

    const dummyData = [
        {"ship": BoatVariant.AIRCRAFT_CARRIER, "positions": [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]]},
        {"ship": BoatVariant.BATTLESHIP, "positions": [[5, 2], [5, 3], [5, 4], [5, 5]]},
        {"ship": BoatVariant.CRUISER, "positions": [[8, 1], [8, 2], [8, 3]]},
        {"ship": BoatVariant.SUBMARINE, "positions": [[3, 0], [3, 1], [3, 2]]},
        {"ship": BoatVariant.DESTROYER, "positions": [[0, 0], [1, 0]]}
    ];

    let grid: Cell[][] = Array.from({length: rows}, (_, row) =>
        Array.from({length: cols}, (_, col) => ({
            row: row,
            col: col,
            hasShip: false,
            isHit: false,
            isMissed: false,
            shipName: undefined
        }))
    );

    if (useDummyData) {
        dummyData.forEach(data => {
            const shipName: BoatVariant = data.ship;
            const shipPositions = data.positions;

            grid = placeShipOnGridUsingData(grid, shipName, shipPositions);
        });
    } else {
        // Attempt to place each ship randomly
        for (const shipName in ships) {
            const shipInfo = ships[shipName as BoatVariant];
            const shipLength = shipInfo.length;
            let attempts = 0;
            let updatedGrid = null;

            // Try placing the ship until it fits or too many attempts have been made
            while (!updatedGrid && attempts < 1000) {
                updatedGrid = placeShipOnGrid(grid, shipName as BoatVariant, shipLength);
                attempts++;
            }

            if (!updatedGrid) {
                // If too many failed attempts, return null (unable to generate a valid board)
                return null;
            }

            grid = updatedGrid;
        }
    }

    return grid;
}

/**
 * Random position based on an initial seed and direction while ensuring the boat
 * doesn't collide with another boat.
 * @param grid
 * @param shipName
 * @param shipLength
 */
const placeShipOnGrid = (grid: Cell[][], shipName: BoatVariant, shipLength: number) => {
    const newGrid = [...grid];
    const isHorizontal = Math.random() < 0.5; // Randomly choose ship orientation

    let row, col;
    if (isHorizontal) {
        row = getRandomInt(0, grid.length - 1);
        col = getRandomInt(0, grid[0].length - shipLength);
    } else {
        row = getRandomInt(0, grid.length - shipLength);
        col = getRandomInt(0, grid[0].length - 1);
    }

    let isValidPlacement = true;
    for (let i = 0; i < shipLength; i++) {
        if (isHorizontal) {
            if (newGrid[row][col + i].hasShip) {
                isValidPlacement = false;
                break;
            }
        } else {
            if (newGrid[row + i][col].hasShip) {
                isValidPlacement = false;
                break;
            }
        }
    }

    if (isValidPlacement) {
        for (let i = 0; i < shipLength; i++) {
            if (isHorizontal) {
                newGrid[row][col + i] = {
                    ...newGrid[row][col + i],
                    col: col + i, // Update col value
                    row: row,     // Update row value
                    hasShip: true,
                    shipName: shipName, // Associate ship name with the cell
                };
            } else {
                newGrid[row + i][col] = {
                    ...newGrid[row + i][col],
                    col: col,     // Update col value
                    row: row + i, // Update row value
                    hasShip: true,
                    shipName: shipName, // Associate ship name with the cell
                };
            }
        }
    }

    // We return null here, in a real scenario we wouldn't want to do this
    // But instead either try to place again or show some UI state.
    return isValidPlacement ? newGrid : null;
}

/**
 * Allows ships to be placed on our grid without it being random.
 * @param grid
 * @param shipName
 * @param shipPositions
 */
const placeShipOnGridUsingData = (grid: Cell[][], shipName: BoatVariant, shipPositions: number[][]): Cell[][] => {
    const newGrid = [...grid];

    for (const position of shipPositions) {
        const row = position[0];
        const col = position[1];

        // Ensure position doesn't already have a ship
        if (newGrid[row][col].hasShip) {
            throw new Error(`Position [${row}, ${col}] already occupied by another ship.`);
        }

        newGrid[row][col] = {
            ...newGrid[row][col],
            hasShip: true,
            shipName: shipName,
        };
    }

    return newGrid;
}