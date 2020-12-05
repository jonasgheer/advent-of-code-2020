export class BoardingPass {
    readonly row: number;
    readonly column: number;
    readonly seatID: number;

    constructor(code: string) {
        this.row = this.computeRowColumn(code.slice(0, 7), 0, 127);
        this.column = this.computeRowColumn(code.slice(7), 0, 7);
        this.seatID = this.row * 8 + this.column;
    }

    private computeRowColumn(code: string, min: number, max: number): number {
        if (code.length === 0) {
            return min;
        }
        if (["F", "L"].includes(code[0])) {
            return this.computeRowColumn(
                code.slice(1),
                min,
                Math.floor((max - min) / 2) + min
            );
        } else {
            return this.computeRowColumn(
                code.slice(1),
                Math.ceil((max - min) / 2) + min,
                max
            );
        }
    }
}
