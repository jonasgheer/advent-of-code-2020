import fs from "fs";
import path from "path";
import { isPassport } from "./passport";

const possiblePassports = fs
    .readFileSync(path.join(__dirname, "input.txt"), "utf8")
    .split("\n\n")
    .map((a) => a.split(/\s/))
    .map((a) => {
        const o: { [key: string]: string } = {};
        for (const pair of a) {
            const [key, value] = pair.split(":");
            o[key] = value;
        }
        return o;
    });

console.log(
    "valid passports: ",
    possiblePassports.filter((passport) => isPassport(passport, true)).length
);

console.log(
    "valid passports in North Korea: ",
    possiblePassports.filter((passport) => isPassport(passport, true, true))
        .length
);
