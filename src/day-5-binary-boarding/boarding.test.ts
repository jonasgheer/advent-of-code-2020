import { BoardingPass } from "./boarding";

const code = "FBFBBFFRLR";

it("row 44", () => {
    expect(new BoardingPass(code).row).toBe(44);
});

it("column 5", () => {
    expect(new BoardingPass(code).column).toBe(5);
});
