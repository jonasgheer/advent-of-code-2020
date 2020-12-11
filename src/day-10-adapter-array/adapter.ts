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

export function numValidArangements(joltages: number[]) {
    const memory: Record<number, number> = {};
    joltages = joltages.sort((a, b) => a - b);

    for (let i = joltages.length - 2; i >= 0; i--) {
        memory[joltages[i]] = _numValidArangements(joltages.slice(i), memory);
    }

    return memory[0];
}

function _numValidArangements(
    joltages: number[],
    memory: Record<number, number>
): number {
    joltages = joltages.sort((a, b) => a - b);

    let validArangements = 0;
    const stack = [joltages[0]];
    while (stack.length > 0) {
        const curr = stack.pop() as number;
        if (curr === joltages[joltages.length - 1]) validArangements++;
        joltages
            .filter((joltage) =>
                [curr + 1, curr + 2, curr + 3].includes(joltage)
            )
            .forEach((joltage) => {
                if (memory[joltage]) {
                    validArangements += memory[joltage];
                } else {
                    stack.push(joltage);
                }
            });
    }
    return validArangements;
}
