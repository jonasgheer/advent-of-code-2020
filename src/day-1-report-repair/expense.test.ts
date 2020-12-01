import { findExpenseReportError2n, findExpenseReportError3n } from "./expense";

const nums = [1721, 979, 366, 299, 675, 1456];

it("two expenses", () => {
    expect(findExpenseReportError2n(nums)).toBe(514579);
});

it("three expenses", () => {
    expect(findExpenseReportError3n(nums)).toBe(241861950);
});
