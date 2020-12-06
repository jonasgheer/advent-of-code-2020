import fs from "fs";
import path from "path";
import { union, intersection } from "./set";

interface Group {
    answers: Set<string>[];
}

const groups: Group[] = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf-8")
    .trim()
    .split("\n\n")
    .map((group) => ({
        answers: group.split(/\s/).map((member) => new Set(member.split(""))),
    }));

console.log(
    "sum part one: ",
    groups
        .map((group) =>
            group.answers.reduce((total, answer) => union(total, answer))
        )
        .reduce((a, b) => a + b.size, 0)
);

console.log(
    "sum part 2: ",
    groups
        .map((group) =>
            group.answers.reduce((total, answer) =>
                intersection<string>(total, answer)
            )
        )
        .reduce((a, b) => a + b.size, 0)
);
