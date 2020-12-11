import { joltageDifference, numValidArangements } from "./adapter";

const joltages = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];

const deviceJoltage = Math.max(...joltages) + 3;
const outletJoltage = 0;

describe("there are ", () => {
    const difference = joltageDifference([
        outletJoltage,
        ...joltages,
        deviceJoltage,
    ]);

    it("7 oneDiff's", () => {
        expect(difference.oneDiff).toBe(7);
    });

    it("5 threeDiff's", () => {
        expect(difference.threeDiff).toBe(5);
    });
});

it("number of valid arangements are 8", () => {
    expect(
        numValidArangements([outletJoltage, ...joltages, deviceJoltage])
    ).toBe(8);
});
