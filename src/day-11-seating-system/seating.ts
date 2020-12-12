import { cloneDeep, uniqBy } from "lodash";
import { combinations } from "../util";

export type Square = Floor | Seat;

interface Floor {
    type: "floor";
}

interface Seat {
    type: "seat";
    occupied: boolean;
}

export function isSeat(square: Square): square is Seat {
    return square.type === "seat";
}

function getAdjacentSquares(
    area: Square[][],
    row: number,
    column: number
): Square[] {
    const adjacent = [];
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            if (row + i < 0 || row + i >= area.length) continue;
            if (column + j < 0 || column + j >= area[0].length) continue;
            if (i === 0 && j === 0) continue;
            adjacent.push(area[row + i][column + j]);
        }
    }
    return adjacent;
}

function getVisibleSeats(
    area: Square[][],
    row: number,
    column: number
): Seat[] {
    const visibleSeats: Seat[] = [];
    const moves = uniqBy(combinations([1, -1, 0, 1, -1]), String);
    for (const [moveRow, moveColumn] of moves) {
        let [currRow, currColumn] = [row, column];
        while (true) {
            currRow += moveRow;
            currColumn += moveColumn;
            if (currRow < 0 || currRow >= area.length) break;
            if (currColumn < 0 || currColumn >= area[0].length) break;
            const currSquare = area[currRow][currColumn];
            if (isSeat(currSquare)) {
                visibleSeats.push(currSquare);
                break;
            }
        }
    }
    return visibleSeats;
}

function occupiedAdjecentSquares(
    area: Square[][],
    row: number,
    column: number
): number {
    return getAdjacentSquares(area, row, column).filter(
        (neighbor) => neighbor.type === "seat" && neighbor.occupied
    ).length;
}

function occupiedVisibleSeats(
    area: Square[][],
    row: number,
    column: number
): number {
    return getVisibleSeats(area, row, column).filter((seat) => seat.occupied)
        .length;
}

function isEqual(areaA: Square[][], areaB: Square[][]): boolean {
    const _areaA = areaA.flatMap((s) => s);
    const _areaB = areaB.flatMap((s) => s);
    for (let i = 0; i < _areaA.length; i++) {
        const squareA = _areaA[i];
        const squareB = _areaB[i];
        if (squareA.type !== squareB.type) return false;
        if (isSeat(squareA) && isSeat(squareB)) {
            if (squareA.occupied !== squareB.occupied) return false;
        }
    }
    return true;
}

export function runIteration(
    area: Square[][],
    criteria: "vicinity" | "visible"
): Square[][] {
    const newArea = cloneDeep(area);
    for (let row = 0; row < area.length; row++) {
        for (let column = 0; column < area[0].length; column++) {
            const currSquare = newArea[row][column];
            if (currSquare.type === "seat") {
                let occupiedSeats;
                switch (criteria) {
                    case "vicinity": {
                        occupiedSeats = occupiedAdjecentSquares(
                            area,
                            row,
                            column
                        );
                        if (currSquare.occupied && occupiedSeats >= 4) {
                            currSquare.occupied = false;
                        }
                        break;
                    }
                    case "visible": {
                        occupiedSeats = occupiedVisibleSeats(area, row, column);
                        if (currSquare.occupied && occupiedSeats >= 5) {
                            currSquare.occupied = false;
                        }
                    }
                }
                if (!currSquare.occupied && occupiedSeats === 0) {
                    currSquare.occupied = true;
                }
            }
        }
    }
    return newArea;
}

export function totalOccupied(
    area: Square[][],
    criteria: "vicinity" | "visible"
): number {
    while (true) {
        const newArea = runIteration(area, criteria);
        if (isEqual(area, newArea)) {
            return area
                .flatMap((s) => s)
                .filter((s) => s.type === "seat" && s.occupied).length;
        }
        area = newArea;
    }
}
