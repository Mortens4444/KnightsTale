export class Square { 
    public columnIndex: number;
    public rankIndex: number;

    public constructor(columnIndex: number, rankIndex: number) {
        this.columnIndex = columnIndex;
        this.rankIndex = rankIndex;
    }

    public toString(whiteOnTop: boolean): string {
        if (whiteOnTop) {
            return String.fromCharCode('H'.charCodeAt(0) - this.columnIndex) + (this.rankIndex - 1);
        }
        return String.fromCharCode(this.columnIndex + 'A'.charCodeAt(0)) + (8 - this.rankIndex);
    }
}