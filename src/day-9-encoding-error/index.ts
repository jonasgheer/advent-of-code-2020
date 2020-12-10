import fs from "fs";
import path from "path";
import { findContiguosSet, findOutliers } from "./encoding";

const data: number[] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n")
    .map((n) => Number(n));

const firstOutlier = findOutliers(data, 25)[0];
console.log("first outlier: ", findOutliers(data, 25)[0]);
const contigousSet = findContiguosSet(data, firstOutlier);
console.log(
    "contigous set: ",
    contigousSet && Math.max(...contigousSet) + Math.min(...contigousSet)
);
