import { Operation, runProgram } from "./halting";

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
    expect(runProgram(program)).toBe(5);
});
