export class Square { 
    public columnIndex: number;
    public rankIndex: number;

    public constructor(columnIndex: number, rankIndex: number) {
        this.columnIndex = columnIndex;
        this.rankIndex = rankIndex;
    }

    public toString(): string {
        return String.fromCharCode(this.columnIndex + 'A'.charCodeAt(0)) + (8 - this.rankIndex);
    }
}