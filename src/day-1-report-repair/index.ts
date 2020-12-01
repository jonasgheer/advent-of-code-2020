import { findExpenseReportError2n, findExpenseReportError3n } from "./expense";
import { createReadStream } from "fs";
import csv from "csv-parser";
import path from "path";

const expenses: number[] = [];
createReadStream(path.join(__dirname, "input.txt"))
    .pipe(csv({ headers: false }))
    .on("data", (data) => {
        expenses.push(Number(data[0]));
    })
    .on("end", () => {
        console.log("2n: ", findExpenseReportError2n(expenses));
        console.log("3n: ", findExpenseReportError3n(expenses));
    });
