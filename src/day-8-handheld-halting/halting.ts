export type OperationType = "acc" | "jmp" | "nop";

export interface Operation {
    type: OperationType;
    argument: number;
}

export function runProgram(
    program: Operation[]
): { accumulator: number; terminatedBy: "loop" | "end" } {
    const _program = program.map((operation) => ({
        ...operation,
        executed: false,
    }));
    let accumulator = 0;
    let currentOpIndex = 0;
    while (true) {
        if (currentOpIndex > program.length - 1) {
            return {
                accumulator,
                terminatedBy: "end",
            };
        }
        const currentOp = _program[currentOpIndex];
        if (currentOp.executed) {
            return {
                accumulator,
                terminatedBy: "loop",
            };
        }
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
}

export function* generateVariant(program: Operation[]) {
    for (let i = 0; i < program.length; i++) {
        const _program = [...program];
        const currentOp = _program[i];
        if (currentOp.type !== "acc") {
            const newOp = {
                ...currentOp,
                type: (currentOp.type === "jmp"
                    ? "nop"
                    : "jmp") as OperationType,
            };
            _program[i] = newOp;
            yield _program;
        }
    }
}
