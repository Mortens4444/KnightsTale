import { ChessBoardBuilder } from './ChessBoardBuilder.js';

export class ChessGame {

	private chessBoardBuilder: ChessBoardBuilder;

	constructor() {
		this.chessBoardBuilder = new ChessBoardBuilder();
	}

	switchSide(): void {
		this.chessBoardBuilder.switchSide();
	}

	newGame(): void {
		this.chessBoardBuilder.resetStates();
		this.showChessBoard();
	}

	showChessBoard(): void {
		this.chessBoardBuilder.showChessBoard();
	}
}

export const chessGame: ChessGame = new ChessGame();
chessGame.showChessBoard();
chessGame.newGame();