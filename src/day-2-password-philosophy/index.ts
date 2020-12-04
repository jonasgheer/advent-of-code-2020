import csv from "csv-parser";
import { createReadStream } from "fs";
import path from "path";
import { numberOfValidPasswords, Password } from "./password";

parseInput<Password>(
    ["limits", "character", "password"],
    (data) => {
        const limits = data.limits.split("-");
        return {
            policy: {
                x: Number(limits[0]),
                y: Number(limits[1]),
                character: data.character[0],
            },
            password: data.password,
        } as Password;
    },
    " "
).then((passwords) => {
    console.log(
        "number of valid sled-rental passwords: ",
        numberOfValidPasswords(passwords, "sled-rental")
    );
    console.log(
        "number of valid toboggan-corporate passwords: ",
        numberOfValidPasswords(passwords, "toboggan-corporate")
    );
});
// const passwords: Password[] = [];
// createReadStream(path.join(__dirname, "input.txt"))
//     .pipe(csv({ headers: ["limits", "character", "password"], separator: " " }))
//     .on("data", (data) => {
//         const limits = data.limits.split("-");
//         passwords.push({
//             policy: {
//                 x: Number(limits[0]),
//                 y: Number(limits[1]),
//                 character: data.character[0],
//             },
//             password: data.password,
//         } as Password);
//     })
//     .on("end", () => {
//         console.log(
//             "number of valid sled-rental passwords: ",
//             numberOfValidPasswords(passwords, "sled-rental")
//         );
//         console.log(
//             "number of valid toboggan-corporate passwords: ",
//             numberOfValidPasswords(passwords, "toboggan-corporate")
//         );
//     });

function parseInput<T>(
    headers: string[],
    dataCallback: (data: { [key: string]: string }) => T,
    separator?: string
): Promise<T[]> {
    return new Promise((resolve, reject) => {
        const results: T[] = [];
        createReadStream(path.join(__dirname, "input.txt"))
            .pipe(
                csv({
                    headers: headers,
                    separator: separator,
                })
            )
            .on("data", (data) => {
                results.push(dataCallback(data));
            })
            .on("end", () => {
                resolve(results);
            })
            .on("error", reject);
    });
}
