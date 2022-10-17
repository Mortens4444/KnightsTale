import { ChessBoardBuilder } from './ChessBoardBuilder.js';
export class ChessGame {
    chessBoardBuilder;
    constructor() {
        this.chessBoardBuilder = new ChessBoardBuilder();
    }
    switchSide() {
        this.chessBoardBuilder.switchSide();
    }
    newGame() {
        this.chessBoardBuilder.resetStates();
        this.showChessBoard();
    }
    showChessBoard() {
        this.chessBoardBuilder.showChessBoard();
    }
}
export const chessGame = new ChessGame();
chessGame.showChessBoard();
//# sourceMappingURL=ChessGame.js.map