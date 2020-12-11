import fs from "fs";
import path from "path";
import { joltageDifference, numValidArangements } from "./adapter";

const joltages: number[] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n")
    .map((n) => Number(n));

const deviceJoltage = Math.max(...joltages) + 3;
const outletJoltage = 0;

const joltageDiff = joltageDifference([
    outletJoltage,
    ...joltages,
    deviceJoltage,
]);

console.log(
    "1-jolt diff multiplied by 3-jolt diff: ",
    joltageDiff.oneDiff * joltageDiff.threeDiff
);

console.log(
    "distict valid arangements: ",
    numValidArangements([outletJoltage, ...joltages, deviceJoltage])
);
