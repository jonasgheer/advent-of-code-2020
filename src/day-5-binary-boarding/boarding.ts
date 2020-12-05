export class BoardingPass {
    readonly row: number;
    readonly column: number;
    readonly seatID: number;

    constructor(code: string) {
        code = code
            .replaceAll("F", "0")
            .replaceAll("L", "0")
            .replaceAll("B", "1")
            .replaceAll("R", "1");
        this.row = parseInt(code.slice(0, 7), 2);
        this.column = parseInt(code.slice(7), 2);
        this.seatID = this.row * 8 + this.column;
    }
}
