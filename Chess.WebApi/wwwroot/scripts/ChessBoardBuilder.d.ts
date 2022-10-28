import type { KnightsTaleDto } from './Dtos/KnightsTaleDto.js';
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
    private squareOnClick;
    private getMove;
    private getSquare;
    private charShift;
    private getColumnText;
    private isWhiteOnTopInStateRepresentation;
    private getState;
    private setState;
    resetStates(): void;
    showChessBoard(whiteOnTopWhenShow?: boolean | undefined): void;
    switchSide(): void;
    loadState(knightsTaleDto: KnightsTaleDto): void;
}
//# sourceMappingURL=ChessBoardBuilder.d.ts.map