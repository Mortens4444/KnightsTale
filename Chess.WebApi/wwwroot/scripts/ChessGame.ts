import { ChessBoardBuilder } from './ChessBoardBuilder.js';

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

ko.applyBindings(new ChessGame(), document.getElementById('app'));