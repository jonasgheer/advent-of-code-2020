import csv from "csv-parser";
import { createReadStream } from "fs";
import path from "path";
import { numberOfValidPasswords, Password } from "./password";

const passwords: Password[] = [];
createReadStream(path.join(__dirname, "input.txt"))
    .pipe(csv({ headers: ["limits", "character", "password"], separator: " " }))
    .on("data", (data) => {
        const limits = data.limits.split("-");
        passwords.push({
            policy: {
                x: Number(limits[0]),
                y: Number(limits[1]),
                character: data.character[0],
            },
            password: data.password,
        } as Password);
    })
    .on("end", () => {
        console.log(
            "number of valid sled-rental passwords: ",
            numberOfValidPasswords(passwords, "sled-rental")
        );
        console.log(
            "number of valid toboggan-corporate passwords: ",
            numberOfValidPasswords(passwords, "toboggan-corporate")
        );
    });
