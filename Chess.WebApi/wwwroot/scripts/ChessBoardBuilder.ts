import { DomManipulator } from './DomManipulator.js';
import { Square } from './Square.js';

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

const a = 'A';
const h = 'H';
const table = 'table';
const th = 'th';
const tr = 'tr';
const td = 'td';
const tc = 'tc';
const id = 'id';
const selected = 'selected';

export class ChessBoardBuilder {

	private domManipulator: DomManipulator;
	private moveFrom: HTMLElement;
	private whiteOnTopWhenShow: boolean;

	constructor() {
		this.domManipulator = new DomManipulator();
		this.moveFrom = null;
		this.whiteOnTopWhenShow = false;
	}

	createChessBoard(): void {
		const body: HTMLBodyElement = document.getElementsByTagName('body')[0];
		const board: HTMLElement = this.domManipulator.createElement(table, body);
		board.setAttribute('class', 'chess-board');
		const tableBody: HTMLElement = this.domManipulator.createElement('tbody', board);

		this.createTableColumns(tableBody);
		this.createSquares(tableBody);
	}

	createTableColumns(tableBody: HTMLElement): void {
		const header: HTMLElement = this.domManipulator.createElement(tr, tableBody);
		this.domManipulator.createElement(th, header);	
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			this.createTableHeaderCell(header, tc + columnIndex + 1, this.getColumnText(columnIndex));
		}
	}

	createTableHeaderCell(parent, idValue: string, text: string) : void {
		const header = this.domManipulator.createElement(th, parent);
		header.setAttribute(id, idValue);
		header.textContent = text;
	}

	createTableRank(tableBody: HTMLElement, rankNumber) {
		const rank = this.domManipulator.createElement(tr, tableBody);
		this.createTableHeaderCell(rank, tr + rankNumber, rankNumber);
		return rank;
	}
	
	createSquares(tableBody: HTMLElement) {
		for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
			const rankNumber: number = this.whiteOnTopWhenShow ? rankIndex + 1 : 8 - rankIndex;
			const rank = this.createTableRank(tableBody, rankNumber);
			
			for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
				const cell = this.domManipulator.createElement(td, rank);
				cell.setAttribute(id, this.getColumnText(columnIndex) + rankNumber);
				cell.onclick = this.cellOnClick.bind(this);
				cell.setAttribute('class', (rankIndex + columnIndex) % 2 == 1 ? 'dark' : 'light');
				cell.textContent = this.isWhiteOnTopInStateRepresentation() ?
					state[rankNumber - 1][this.whiteOnTopWhenShow ? columnIndex : 7 - columnIndex] :
					state[this.whiteOnTopWhenShow ? 7 - rankIndex : rankIndex][this.whiteOnTopWhenShow ? 7 - columnIndex : columnIndex];
			}
		}
	}

	cellOnClick(event: MouseEvent) {
		if (this.moveFrom == null) {
			this.moveFrom = event.srcElement as HTMLElement;
			this.moveFrom.classList.add(selected);
		} else {
			this.moveFrom.classList.remove(selected);

			const toSquare: Square = this.getSquare(event.srcElement as HTMLElement);
			const fromSquare: Square = this.getSquare(this.moveFrom);
			
			state[toSquare.rankIndex][toSquare.columnIndex] = state[fromSquare.rankIndex][fromSquare.columnIndex];
			state[fromSquare.rankIndex][fromSquare.columnIndex] = ' ';
			
			this.showChessBoard();
			this.moveFrom = null;
		}
	}

	getSquare(cell: HTMLElement): Square {
		const rank: number = parseInt(cell.id[1]);
		const column = cell.id.charCodeAt(0);
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

	isWhiteOnTopInStateRepresentation(): boolean {
		return initialState[0][0] == '♖';
	}
	
	resetStates(): void {
		for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
			state[rankIndex] = initialState[rankIndex].map((x: string) => x);
		}
	}

	showChessBoard(whiteOnTopWhenShow: boolean | undefined = undefined): void {
		if (whiteOnTopWhenShow !== undefined) {
			this.whiteOnTopWhenShow = whiteOnTopWhenShow;
        }

		const board: Element = document.getElementsByTagName(table)[0];
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