import { getEarliestBus } from "./shuttle";

const arrivalEstimate = 939;

const busIDs = [7, 13, 19, 31, 59];

it("bus 59 is the earliest", () => {
    expect(getEarliestBus(arrivalEstimate, busIDs)).toBe(59);
});
