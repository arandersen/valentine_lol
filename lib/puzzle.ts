export type TileState = (number | null)[];

// Adjacent positions for each index in a 3x3 grid
const ADJACENT_MAP: Record<number, number[]> = {
    0: [1, 3],
    1: [0, 2, 4],
    2: [1, 5],
    3: [0, 4, 6],
    4: [1, 3, 5, 7],
    5: [2, 4, 8],
    6: [3, 7],
    7: [4, 6, 8],
    8: [5, 7],
};

export function getAdjacentIndices(index: number): number[] {
    return ADJACENT_MAP[index] || [];
}

export function getEmptyIndex(tiles: TileState): number {
    return tiles.indexOf(null);
}

export function canMove(tiles: TileState, tileIndex: number): boolean {
    const emptyIndex = getEmptyIndex(tiles);
    return ADJACENT_MAP[emptyIndex]?.includes(tileIndex) ?? false;
}

export function swapTiles(
    tiles: TileState,
    index1: number,
    index2: number
): TileState {
    const newTiles = [...tiles];
    [newTiles[index1], newTiles[index2]] = [newTiles[index2], newTiles[index1]];
    return newTiles;
}

export function moveTile(tiles: TileState, tileIndex: number): TileState | null {
    if (!canMove(tiles, tileIndex)) return null;
    const emptyIndex = getEmptyIndex(tiles);
    return swapTiles(tiles, tileIndex, emptyIndex);
}

// Shuffle puzzle by making random valid moves from solved state
// This guarantees the puzzle is always solvable
export function shufflePuzzle(moveCount: number = 150): TileState {
    let tiles: TileState = [0, 1, 2, 3, 4, 5, 6, 7, null];

    for (let i = 0; i < moveCount; i++) {
        const emptyIndex = getEmptyIndex(tiles);
        const adjacentIndices = getAdjacentIndices(emptyIndex);
        const randomAdjacent =
            adjacentIndices[Math.floor(Math.random() * adjacentIndices.length)];
        tiles = swapTiles(tiles, emptyIndex, randomAdjacent);
    }

    return tiles;
}

export function isSolved(tiles: TileState): boolean {
    const solvedState: TileState = [0, 1, 2, 3, 4, 5, 6, 7, null];
    return tiles.every((tile, index) => tile === solvedState[index]);
}

// Get background position for tile (CSS background-position)
export function getTileBackgroundPosition(tileValue: number | null): string {
    if (tileValue === null) return "";

    const positions: Record<number, string> = {
        0: "0% 0%",
        1: "50% 0%",
        2: "100% 0%",
        3: "0% 50%",
        4: "50% 50%",
        5: "100% 50%",
        6: "0% 100%",
        7: "50% 100%",
    };

    return positions[tileValue] || "";
}
