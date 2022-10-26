import { DomManipulator } from './DomManipulator.js';
import { Square } from './Square.js';

const a = 'A';
const h = 'H';
const table = 'table';
const th = 'th';
const tr = 'tr';
const td = 'td';
const tc = 'tc';
const id = 'id';
const selected = 'selected';

const InitialState: Array<Array<string>> = [
	['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
	['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
	['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

const State: Array<Array<string>> = [
	['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
	['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	[' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
	['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
	['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];

export class ChessBoardBuilder {

	private domManipulator: DomManipulator;
	private moveFrom: HTMLElement | null;
	private whiteOnTopWhenShow: boolean;

	public constructor() {
		this.domManipulator = new DomManipulator();
		this.moveFrom = null;
		this.whiteOnTopWhenShow = false;
		this.showChessBoard();
	}

	private createChessBoard(): void {
		const body: HTMLBodyElement | undefined = document.getElementsByTagName('body')[0];
		const board: HTMLTableElement | undefined = <HTMLTableElement | undefined>this.domManipulator.createElement(table, <HTMLElement>body);
		board?.setAttribute('class', 'chess-board');
		const tableBody: HTMLElement = this.domManipulator.createElement('tbody', <HTMLElement>board);

		this.createTableColumns(tableBody);
		this.createSquares(tableBody);
	}

	private createTableColumns(tableBody: HTMLElement): void {
		const header: HTMLElement = this.domManipulator.createElement(tr, tableBody);
		this.domManipulator.createElement(th, header);	
		for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
			this.createTableHeaderCell(header, tc + columnIndex + 1, this.getColumnText(columnIndex));
		}
	}

	private createTableHeaderCell(parent: HTMLElement, idValue: string, text: string): void {
		const header = this.domManipulator.createElement(th, parent);
		header.setAttribute(id, idValue);
		header.textContent = text;
	}

	private createTableRank(tableBody: HTMLElement, rankNumber: number) {
		const rank = this.domManipulator.createElement(tr, tableBody);
		this.createTableHeaderCell(rank, tr + rankNumber, rankNumber.toString());
		return rank;
	}
	
	private createSquares(tableBody: HTMLElement) {
		for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
			const rankNumber: number = this.whiteOnTopWhenShow ? rankIndex + 1 : 8 - rankIndex;
			const rank = this.createTableRank(tableBody, rankNumber);
			
			for (let columnIndex = 0; columnIndex < 8; columnIndex++) {
				const square = this.domManipulator.createElement(td, rank);
				square.setAttribute(id, this.getColumnText(columnIndex) + rankNumber);
				square.onclick = this.squareOnClick.bind(this);
				square.setAttribute('class', (rankIndex + columnIndex) % 2 == 1 ? 'dark' : 'light');
				square.textContent = this.isWhiteOnTopInStateRepresentation() ?
					this.getState(rankNumber - 1, this.whiteOnTopWhenShow ? columnIndex : 7 - columnIndex) :
					this.getState(this.whiteOnTopWhenShow ? 7 - rankIndex : rankIndex, this.whiteOnTopWhenShow ? 7 - columnIndex : columnIndex);
			}
		}
	}

	private squareOnClick(event: MouseEvent) {
		if (this.moveFrom == null) {
			this.moveFrom = <HTMLElement>event.srcElement;
			this.moveFrom.classList.add(selected);
		} else {
			this.moveFrom.classList.remove(selected);
			const toSquare: Square = this.getSquare(<HTMLElement>event.srcElement);
			const fromSquare: Square = this.getSquare(this.moveFrom);

			const request = new XMLHttpRequest();
			request.open('PUT', 'KnightsTale/api/game/move');
			request.setRequestHeader('content-type', 'application/json');
			request.send(JSON.stringify(this.getMove(fromSquare, toSquare)));
			request.onreadystatechange = () => {
				if (request.readyState == 4 && request.status == 200) {
					this.setState(toSquare.rankIndex, toSquare.columnIndex, this.getState(fromSquare.rankIndex, fromSquare.columnIndex));
					this.setState(fromSquare.rankIndex, fromSquare.columnIndex, ' ');
					this.showChessBoard();
				}
			};
			this.moveFrom = null;
		}
	}

	private getMove(fromSquare: Square, toSquare: Square): string {
		return fromSquare.toString(this.whiteOnTopWhenShow) + toSquare.toString(this.whiteOnTopWhenShow);
	}

	private getSquare(square: HTMLElement): Square {
		const rank = parseInt(<string>square.id[1]);
		const column = square .id.charCodeAt(0);
		return this.isWhiteOnTopInStateRepresentation() ?
			new Square(h.charCodeAt(0) - column, rank - 1) :
			new Square(column - a.charCodeAt(0), 8 - rank);
	}

	private charShift(ch: string, shift: number): string {
		return String.fromCharCode(ch.charCodeAt(0) + shift);
	}

	private getColumnText(columnIndex: number): string {
		return this.whiteOnTopWhenShow ? this.charShift(h, -columnIndex) : this.charShift(a, columnIndex);
	}

	private isWhiteOnTopInStateRepresentation(): boolean {
		return (<Array<string>>InitialState[0])[0] == '♖';
	}

	private getState(rankIndex: number, columnIndex: number): string {
		return <string>(<Array<string>>State[rankIndex])[columnIndex];
	}

	private setState(rankIndex: number, columnIndex: number, value: string): void {
		(<Array<string>>State[rankIndex])[columnIndex] = value;
	}

	public resetStates(): void {
		for (let rankIndex = 0; rankIndex < 8; rankIndex++) {
			State[rankIndex] = (<Array<string>>InitialState[rankIndex]).map((x: string) => x);
		}
	}

	public showChessBoard(whiteOnTopWhenShow: boolean | undefined = undefined): void {
		if (whiteOnTopWhenShow !== undefined) {
			this.whiteOnTopWhenShow = whiteOnTopWhenShow;
        }

		const board: HTMLTableElement | undefined = document.getElementsByTagName(table)[0];
		if (board) {
			board.remove();
			this.moveFrom = null;
		}
		this.createChessBoard();
	}
	
	public switchSide(): void {
		this.showChessBoard(!this.whiteOnTopWhenShow);
	}
}