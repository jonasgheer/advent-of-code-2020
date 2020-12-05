import fs from "fs";
import path from "path";
import { BoardingPass } from "./boarding";

const seatIDs = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((code) => new BoardingPass(code).seatID)
    .sort((a, b) => a - b);

console.log("highest seatID: ", Math.max(...seatIDs));

for (let i = 0; i < seatIDs.length; i++) {
    if (seatIDs[i + 1] !== seatIDs[i] + 1) {
        console.log("my seat: ", seatIDs[i] + 1);
        break;
    }
}
