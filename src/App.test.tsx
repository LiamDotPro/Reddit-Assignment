import { BoatVariant, Cell } from './components/board/Board.interfaces.ts';
import { generateBoard } from "./lib/board.helpers.ts";
import {ShipInfo} from "./App.interfaces.ts";

describe('Ship placement validation', () => {
    it('should ensure the ships were placed at the correct points', () => {

        const ships: Record<BoatVariant, ShipInfo> = { // Use BoatVariant enum as the key type
            [BoatVariant.AIRCRAFT_CARRIER]: {name: "Aircraft Carrier", length: 5},
            [BoatVariant.BATTLESHIP]: {name: "Battleship", length: 4},
            [BoatVariant.CRUISER]: {name: "Cruiser", length: 3},
            [BoatVariant.SUBMARINE]: {name: "Submarine", length: 3},
            [BoatVariant.DESTROYER]: {name: "Destroyer", length: 2},
        };

        const rows = 10
        const cols = 10

        // Call the generateRandomBoard function
        const gameBoard = generateBoard(rows, cols, ships, true);

        if (!gameBoard) {
            fail('Failed to generate a valid game board');
            return;
        }

        const dummyData = [
            {"ship": BoatVariant.AIRCRAFT_CARRIER, "positions": [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]]},
            {"ship": BoatVariant.BATTLESHIP, "positions": [[5, 2], [5, 3], [5, 4], [5, 5]]},
            {"ship": BoatVariant.CRUISER, "positions": [[8, 1], [8, 2], [8, 3]]},
            {"ship": BoatVariant.SUBMARINE, "positions": [[3, 0], [3, 1], [3, 2]]},
            {"ship": BoatVariant.DESTROYER, "positions": [[0, 0], [1, 0]]}
        ];

        for (const shipData of dummyData) {
            const shipType = shipData.ship;
            const shipPositions = shipData.positions;

            for (const [rowIndex, colIndex] of shipPositions) {
                const cell = gameBoard[rowIndex][colIndex];

                expect(cell.hasShip).toBe(true);
                expect(cell.shipName).toBe(shipType);
            }
        }
    });
});

describe('generateRandomBoard function', () => {
    const rows = 10;
    const cols = 10;
    const ships = {
        [BoatVariant.AIRCRAFT_CARRIER]: { name: 'Aircraft Carrier', length: 5 },
        [BoatVariant.BATTLESHIP]: { name: 'Battleship', length: 4 },
        [BoatVariant.CRUISER]: { name: 'Cruiser', length: 3 },
        [BoatVariant.SUBMARINE]: { name: 'Submarine', length: 3 },
        [BoatVariant.DESTROYER]: { name: 'Destroyer', length: 2 },
    };

    for (let i = 0; i < 100; i++) {
        it(`should generate a valid game board without ship collisions - Attempt ${i + 1}`, () => {
            // Call the generateRandomBoard function
            const gameBoard = generateBoard(rows, cols, ships);

            if (!gameBoard) {
                fail(`Failed to generate a valid game board on attempt ${i + 1}`);
                return;
            }

            // Check if the game board is an array of rows
            expect(Array.isArray(gameBoard)).toBe(true);
            expect(gameBoard.length).toBe(rows);

            // Check if each row is an array of cells
            for (const row of gameBoard) {
                expect(Array.isArray(row)).toBe(true);
                expect(row.length).toBe(cols);
            }

            // Check if ship cells don't collide
            const shipCells = new Set<Cell>();
            for (const row of gameBoard) {
                for (const cell of row) {
                    if (cell.hasShip) {
                        expect(shipCells.has(cell)).toBe(false);
                        shipCells.add(cell);
                    }
                }
            }
        });
    }
});