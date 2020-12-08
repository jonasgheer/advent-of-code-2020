import fs from "fs";
import path from "path";
import { Operation, OperationType, runProgram } from "./halting";

const program: Operation[] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n")
    .map((operation) => {
        const [type, argument] = operation.split(" ");
        return {
            type: type as OperationType,
            argument: Number(argument),
        };
    });

console.log("value of accumulator: ", runProgram(program));
