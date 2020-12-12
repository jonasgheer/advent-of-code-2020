import fs from "fs";
import path from "path";
import { Square, totalOccupied } from "./seating";

const waitingArea: Square[][] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n")
    .map((line) =>
        line.split("").map((c) => {
            const type = c === "." ? "floor" : "seat";
            if (type === "seat") {
                return {
                    type,
                    occupied: false,
                };
            } else {
                return { type };
            }
        })
    );

console.log("total occupied: ", totalOccupied(waitingArea));
