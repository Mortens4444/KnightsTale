import { DomManipulator } from "./DomManipulator.js";
import { Square } from "./Square.js";

const state: Array<Array<string>> = [
	['♜', '♞', ' ', '♛', '♚', '♝', '♞', '♜'],
	['♟', '♟', ' ', '♝', ' ', '♟', '♟', '♟'],
	[' ', ' ', ' ', ' ', '♟', ' ', ' ', ' '],
	[' ', '♗', '♟', '♟', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', '♙', '♙', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', '♙', ' ', ' '],
	['♙', '♙', '♙', ' ', ' ', ' ', '♙', '♙'],
	['♖', '♘', '♗', '♕', '♔', ' ', '♘', '♖']
];

const initialState: Array<Array<string>> = [
	['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
	['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
	['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

const a: string = "A";
const h: string = "H";
const table: string = "table";
const th: string = "th";
const tr: string = "tr";
const td: string = "td";
const tc: string = "tc";
const id: string = "id";
const selected: string = "selected";

export class ChessBoardBuilder {

	private domManipulator: DomManipulator;
	private moveFrom: HTMLElement;
	private whiteOnTopWhenShow: Boolean;

	constructor() {
		this.domManipulator = new DomManipulator();
		this.moveFrom = null;
		this.whiteOnTopWhenShow = false;
	}

	createChessBoard(): void {
		let body: HTMLBodyElement = document.getElementsByTagName("body")[0];
		let board: HTMLElement = this.domManipulator.createElement(table, body);
		board.setAttribute("class", "chess-board");
		let tableBody: HTMLElement = this.domManipulator.createElement("tbody", board);

		this.createTableColumns(tableBody);
		this.createSquares(tableBody);
	}

	createTableColumns(tableBody: HTMLElement): void {
		let header: HTMLElement = this.domManipulator.createElement(tr, tableBody);
		this.domManipulator.createElement(th, header);	
		for (let columnIndex: number = 0; columnIndex < 8; columnIndex++) {
			this.createTableHeaderCell(header, tc + columnIndex + 1, this.getColumnText(columnIndex));
		}
	}

	createTableHeaderCell(parent, idValue: string, text: string) : void {
		let header = this.domManipulator.createElement(th, parent);
		header.setAttribute(id, idValue);
		header.textContent = text;
	}

	createTableRank(tableBody: HTMLElement, rankNumber) {
		let rank = this.domManipulator.createElement(tr, tableBody);
		this.createTableHeaderCell(rank, tr + rankNumber, rankNumber);
		return rank;
	}
	
	createSquares(tableBody: HTMLElement) {
		for (let rankIndex: number = 0; rankIndex < 8; rankIndex++) {
			let rankNumber: number = this.whiteOnTopWhenShow ? rankIndex + 1 : 8 - rankIndex;
			let rank = this.createTableRank(tableBody, rankNumber);
			
			for (let columnIndex: number = 0; columnIndex < 8; columnIndex++) {
				let cell = this.domManipulator.createElement(td, rank);
				cell.setAttribute(id, this.getColumnText(columnIndex) + rankNumber);
				cell.onclick = this.cellOnClick.bind(this);
				cell.setAttribute("class", (rankIndex + columnIndex) % 2 == 1 ? "dark" : "light");
				cell.textContent = this.isWhiteOnTopInStateRepresentation() ?
					state[rankNumber - 1][this.whiteOnTopWhenShow ? columnIndex : 7 - columnIndex] :
					state[this.whiteOnTopWhenShow ? 7 - rankIndex : rankIndex][this.whiteOnTopWhenShow ? 7 - columnIndex : columnIndex];
			}
		}
	}

	cellOnClick(event) {
		if (this.moveFrom == null) {
			this.moveFrom = event.srcElement;
			this.moveFrom.classList.add(selected);
		} else {
			this.moveFrom.classList.remove(selected);

			let toSquare: Square = this.getSquare(event.srcElement);
			let fromSquare: Square = this.getSquare(this.moveFrom);
			
			state[toSquare.rankIndex][toSquare.columnIndex] = state[fromSquare.rankIndex][fromSquare.columnIndex];
			state[fromSquare.rankIndex][fromSquare.columnIndex] = ' ';
			
			this.showChessBoard();
			this.moveFrom = null;
		}
	}

	getSquare(cell: HTMLElement): Square {
		let rank: number = parseInt(cell.id[1]);
		let column = cell.id.charCodeAt(0);
		return this.isWhiteOnTopInStateRepresentation() ?
			new Square(h.charCodeAt(0) - column, rank - 1) :
			new Square(column - a.charCodeAt(0), 8 - rank);
	}

	charShift(ch: string, shift: number): string {
		return String.fromCharCode(ch.charCodeAt(0) + shift);
	}

	getColumnText(columnIndex: number): string {
		return this.whiteOnTopWhenShow ? this.charShift(h, -columnIndex) : this.charShift(a, columnIndex);
	}

	isWhiteOnTopInStateRepresentation(): Boolean {
		return initialState[0][0] == '♖';
	}
	
	resetStates(): void {
		for (let rankIndex: number = 0; rankIndex < 8; rankIndex++) {
			state[rankIndex] = initialState[rankIndex].map((x: string) => x);
		}
	}

	showChessBoard(whiteOnTopWhenShow: Boolean | undefined = undefined): void {
		if (whiteOnTopWhenShow != undefined) {
			this.whiteOnTopWhenShow = whiteOnTopWhenShow;
        }

		let board: Element = document.getElementsByTagName(table)[0];
		if (board) {
			board.remove();
			this.moveFrom = null;
		}
		this.createChessBoard();
	}
	
	switchSide(): void {
		this.showChessBoard(!this.whiteOnTopWhenShow);
	}
}