import { findContiguosSet, findOutliers } from "./encoding";

const data = [
    35,
    20,
    15,
    25,
    47,
    40,
    62,
    55,
    65,
    95,
    102,
    117,
    150,
    182,
    127,
    219,
    299,
    277,
    309,
    576,
];

const preambleLength = 5;

it("the only outlier is 127", () => {
    expect(findOutliers(data, preambleLength)[0]).toBe(127);
});

it("set for 127 is [15, 25, 47, 40]", () => {
    expect(findContiguosSet(data, 127)).toMatchObject([15, 25, 47, 40]);
});
