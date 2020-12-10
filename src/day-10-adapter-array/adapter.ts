export function joltageDifference(
    joltages: number[]
): { threeDiff: number; oneDiff: number } {
    joltages = joltages.sort((a, b) => a - b);

    let oneDiff = 0;
    let threeDiff = 0;

    for (let i = 0; i < joltages.length; i++) {
        const diff = joltages[i + 1] - joltages[i];
        if (diff === 1) oneDiff++;
        else if (diff === 3) threeDiff++;
    }

    return {
        oneDiff,
        threeDiff,
    };
}
