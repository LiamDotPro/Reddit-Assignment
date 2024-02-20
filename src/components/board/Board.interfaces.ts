// A cell on our board
export interface Cell {
    row: number;
    col: number;
    hasShip: boolean;
    isHit: boolean;
    isMissed: boolean;
    shipName: string | undefined;
}

// Different possible boat variants.
export enum BoatVariant {
    AIRCRAFT_CARRIER = "Aircraft Carrier",
    BATTLESHIP = "Battleship",
    CRUISER = "Cruiser",
    SUBMARINE = "Submarine",
    DESTROYER = "Destroyer",
}

export interface BoardProps {
    rows: number;
    cols: number;
    grid: Cell[][];
    setGrid: (updatedGrid: Cell[][]) => void;
    gameOver: boolean;
    setGameOver: (state: boolean) => void
}
