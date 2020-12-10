import { generateVariant, Operation, runProgram } from "./halting";

const program = [
    { type: "nop", argument: 0 },
    { type: "acc", argument: 1 },
    { type: "jmp", argument: 4 },
    { type: "acc", argument: 3 },
    { type: "jmp", argument: -3 },
    { type: "acc", argument: -99 },
    { type: "acc", argument: 1 },
    { type: "jmp", argument: -4 },
    { type: "acc", argument: 6 },
] as Operation[];

it("program terminates with accumulator equal 5", () => {
    const result = runProgram(program);
    expect(result.accumulator).toBe(5);
});

it("program has 4 possible variants", () => {
    const variantGenerator = generateVariant(program);
    let variants = 0;
    while (!variantGenerator.next().done) {
        variants++;
    }
    expect(variants).toBe(4);
});

it("program terminates normally with accumulator equal 8", () => {
    let accumulator = 0;
    for (const variant of generateVariant(program)) {
        const result = runProgram(variant);
        if (result.terminatedBy === "end") {
            accumulator = result.accumulator;
            break;
        }
    }
    expect(accumulator).toBe(8);
});
