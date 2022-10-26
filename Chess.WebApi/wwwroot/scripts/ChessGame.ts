import { ChessBoardBuilder } from './ChessBoardBuilder.js';

export class ChessGame {

	public chessBoardBuilder: ChessBoardBuilder;

	public constructor() {
		this.chessBoardBuilder = new ChessBoardBuilder();
	}

	public switchSide(): void {
		this.chessBoardBuilder.switchSide();
	}

	public newGame(): void {
		const request = new XMLHttpRequest();
		request.open('GET', 'KnightsTale/api/game/new');
		request.send();
		request.onreadystatechange = () => {
			if (request.readyState == 4 && request.status == 200) {
				this.chessBoardBuilder.resetStates();
				this.chessBoardBuilder.showChessBoard();
			}
		};
	}

	public loadGame(_: HTMLInputElement, event: Event): void {
		const target = <HTMLInputElement>event.target;
		const files = <FileList>target.files;
		const file = <File>files[0];

		const formData = new FormData();
		formData.append('file', file);

		const request = new XMLHttpRequest();
		request.open('POST', 'KnightsTale/api/game/load');
		request.setRequestHeader('content-type', 'multipart/form-data; boundary=25DD0FA4');
		request.send(formData);
	}

	public saveGame(): void {
		const request = new XMLHttpRequest();
		request.open('PUT', 'KnightsTale/api/game/save');
		request.send();
	}
}

ko.applyBindings(new ChessGame(), document.getElementById('app'));