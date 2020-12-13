import fs from "fs";
import path from "path";
import { getPosition, Instruction, manhattanDistance } from "./rain";

const instructions: Instruction[] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n")
    .map((line) => ({
        action: line[0] as Instruction["action"],
        value: Number(line.slice(1)),
    }));

const newPosition = getPosition(instructions);
console.log("manhattan distance from start:", manhattanDistance(newPosition));
