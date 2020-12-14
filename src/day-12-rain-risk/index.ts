import fs from "fs";
import path from "path";
import {
    getPosition,
    getPositionUsingWaypoint,
    Instruction,
    manhattanDistance,
} from "./rain";

const instructions: Instruction[] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n")
    .map((line) => ({
        action: line[0] as Instruction["action"],
        value: Number(line.slice(1)),
    }));

console.log(
    "manhattan distance from start:",
    manhattanDistance(getPosition(instructions))
);

console.log(
    "manhattan distance using waypoint:",
    manhattanDistance(getPositionUsingWaypoint(instructions))
);
