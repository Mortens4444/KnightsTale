import { ChessBoardBuilder } from './ChessBoardBuilder.js';
//import * as ko from 'knockout';

export class ChessGame {

	private chessBoardBuilder: ChessBoardBuilder;

	public constructor() {
		this.chessBoardBuilder = new ChessBoardBuilder();
	}

	public switchSide(): void {
		this.chessBoardBuilder.switchSide();
	}

	public newGame(): void {
		this.chessBoardBuilder.resetStates();
		this.chessBoardBuilder.showChessBoard();
	}
}

export const chessGame: ChessGame = new ChessGame();
//ko.applyBindings(chessGame, document.getElementById('app'));