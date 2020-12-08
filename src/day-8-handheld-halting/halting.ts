export type OperationType = "acc" | "jmp" | "nop";

export interface Operation {
    type: OperationType;
    argument: number;
}

export function runProgram(program: Operation[]): number {
    const _program = program.map((operation) => ({
        ...operation,
        executed: false,
    }));
    let accumulator = 0;
    let currentOpIndex = 0;
    while (true) {
        const currentOp = _program[currentOpIndex];
        if (currentOp.executed) break;
        switch (currentOp.type) {
            case "acc": {
                accumulator += currentOp.argument;
                currentOpIndex++;
                break;
            }
            case "jmp": {
                currentOpIndex += currentOp.argument;
                break;
            }
            case "nop": {
                currentOpIndex++;
                break;
            }
        }
        currentOp.executed = true;
    }
    return accumulator;
}
