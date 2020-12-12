import { isSeat, runIteration, totalOccupied } from "./seating";
import { waitingArea } from "./testInput";

it("after one iteration all seats are occupied", () => {
    const newArea = runIteration(waitingArea, "vicinity");
    expect(
        newArea
            .flatMap((square) => square)
            .filter(isSeat)
            .every((seat) => seat.occupied)
    ).toBe(true);
});

it("total occupied ends up at 37", () => {
    expect(totalOccupied(waitingArea, "vicinity")).toBe(37);
});

it("with new rules total occupied ends up at 26", () => {
    expect(totalOccupied(waitingArea, "visible")).toBe(26);
});
