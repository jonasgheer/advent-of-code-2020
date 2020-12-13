import { getPosition, Instruction, manhattanDistance } from "./rain";

const instructions: Instruction[] = [
    { action: "F", value: 10 },
    { action: "N", value: 3 },
    { action: "F", value: 7 },
    { action: "R", value: 90 },
    { action: "F", value: 11 },
];

it("manhattan distance from starting position", () => {
    const newPosition = getPosition(instructions);
    expect(manhattanDistance(newPosition)).toBe(25);
});
