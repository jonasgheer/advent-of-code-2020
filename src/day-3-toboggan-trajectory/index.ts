import fs from "fs";
import path from "path";
import { numberOfTreesHit } from "./trajectory";

const area = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((line) => line.split(""));

const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];

console.log("number of trees hit: ", numberOfTreesHit(area, 3, 1));
console.log(
    "part 2: ",
    slopes
        .map((slope) => numberOfTreesHit(area, slope[0], slope[1]))
        .reduce((a, b) => a * b)
);
