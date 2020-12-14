import fs from "fs";
import path from "path";
import { getEarliestBus } from "./shuttle";

const input = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n");

const arrivalEstimate = Number(input[0]);
const busIDs = input[1]
    .split(",")
    .filter((c) => c !== "x")
    .map(Number);

const earliestBus = getEarliestBus(arrivalEstimate, busIDs);
const waitingMinutes = earliestBus.arrives - arrivalEstimate;
console.log(
    "earliest busID * waitingMinutes:",
    earliestBus.busID * waitingMinutes
);
