export declare class ChessBoardBuilder {
    private domManipulator;
    private moveFrom;
    private whiteOnTopWhenShow;
    constructor();
    private createChessBoard;
    private createTableColumns;
    private createTableHeaderCell;
    private createTableRank;
    private createSquares;
    private cellOnClick;
    private getSquare;
    private charShift;
    private getColumnText;
    private isWhiteOnTopInStateRepresentation;
    private getState;
    private setState;
    resetStates(): void;
    showChessBoard(whiteOnTopWhenShow?: boolean | undefined): void;
    switchSide(): void;
}
//# sourceMappingURL=ChessBoardBuilder.d.ts.map