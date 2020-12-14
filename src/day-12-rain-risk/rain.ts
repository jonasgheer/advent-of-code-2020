type Direction = "N" | "S" | "E" | "W";
type Turn = "L" | "R";

type Position = { north: number; east: number };

export interface Instruction {
    action: Direction | Turn | "F";
    value: number;
}

function isDirection(action: Instruction["action"]): action is Direction {
    return action === "N" || action === "S" || action === "E" || action === "W";
}

function isTurn(action: Instruction["action"]): action is Turn {
    return action === "L" || action === "R";
}

export function getPosition(instructions: Instruction[]): Position {
    const position = {
        north: 0,
        east: 0,
    };
    let direction: Direction = "E";
    for (const instruction of instructions) {
        if (isDirection(instruction.action)) {
            changePosition(instruction.action, instruction.value, position);
        } else if (isTurn(instruction.action)) {
            direction = changeDirection(
                instruction.action,
                instruction.value,
                direction
            );
        } else {
            changePosition(direction, instruction.value, position);
        }
    }
    return position;
}

export function getPositionUsingWaypoint(
    instructions: Instruction[]
): Position {
    const shipPosition = {
        north: 0,
        east: 0,
    };
    const waypointPosition = {
        north: 1,
        east: 10,
    };
    for (const instruction of instructions) {
        if (isDirection(instruction.action)) {
            changePosition(
                instruction.action,
                instruction.value,
                waypointPosition
            );
        } else if (isTurn(instruction.action)) {
            rotatePosition(
                instruction.action,
                instruction.value,
                waypointPosition
            );
        } else {
            changePosition(waypointPosition, instruction.value, shipPosition);
        }
    }
    return shipPosition;
}

export function manhattanDistance(
    pos1: Position,
    pos2 = { north: 0, east: 0 }
): number {
    return Math.abs(pos1.north - pos2.north) + Math.abs(pos1.east - pos2.east);
}

function changePosition(
    direction: Direction | Position,
    value: number,
    position: Position
): void {
    if (typeof direction === "object") {
        position.north += direction.north * value;
        position.east += direction.east * value;
    } else {
        switch (direction) {
            case "N":
                position.north += value;
                break;
            case "S":
                position.north -= value;
                break;
            case "E":
                position.east += value;
                break;
            case "W":
                position.east -= value;
                break;
        }
    }
}

function rotatePosition(turn: Turn, value: number, waypoint: Position): void {
    const radians = turn === "R" ? toRadians(value) : -toRadians(value);
    const tmpNorth = waypoint.north;
    waypoint.north = Math.round(
        waypoint.north * Math.cos(radians) - waypoint.east * Math.sin(radians)
    );
    waypoint.east = Math.round(
        waypoint.east * Math.cos(radians) + tmpNorth * Math.sin(radians)
    );
}

function toRadians(degrees: number) {
    return degrees * (Math.PI / 180);
}

function changeDirection(
    turn: Turn,
    value: number,
    direction: Direction
): Direction {
    const directions = ["N", "E", "S", "W"] as const;
    const turnAmount = value / 90;
    let i =
        directions.indexOf(direction) +
        (turn === "R" ? turnAmount : -turnAmount);
    if (i < 0) {
        i += directions.length;
    }
    return directions[i % directions.length] as Direction;
}
