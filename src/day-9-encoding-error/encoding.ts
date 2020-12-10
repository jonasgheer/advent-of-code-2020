import { combinations } from "../util";

export function findOutliers(data: number[], preambleLength: number): number[] {
    const outliers = [];
    for (let i = preambleLength; i < data.length; i++) {
        if (
            !combinations(data.slice(i - preambleLength, i))
                .map((pair) => pair[0] + pair[1] === data[i])
                .includes(true)
        ) {
            outliers.push(data[i]);
        }
    }
    return outliers;
}

export function findContiguosSet(
    data: number[],
    invalidNumber: number
): number[] | undefined {
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            const currentSum = data.slice(i, j).reduce((a, b) => a + b);
            if (currentSum > invalidNumber) break;
            else if (currentSum === invalidNumber) return data.slice(i, j);
        }
    }
}
