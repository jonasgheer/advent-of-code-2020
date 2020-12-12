import { isSeat, runIteration, totalOccupied } from "./seating";
import { waitingArea } from "./testInput";

it("after one iteration all seats are occupied", () => {
    const newArea = runIteration(waitingArea);
    expect(
        newArea
            .flatMap((square) => square)
            .filter(isSeat)
            .every((seat) => seat.occupied)
    ).toBe(true);
});

it("total occupied ends up at 37", () => {
    expect(totalOccupied(waitingArea)).toBe(37);
});
