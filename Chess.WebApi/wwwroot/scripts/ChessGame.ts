import { ChessBoardBuilder } from './ChessBoardBuilder.js';
import type { KnightsTaleDto } from './Dtos/KnightsTaleDto.js';
import { RequestSender } from './RequestSender.js';

export class ChessGame {

	public chessBoardBuilder: ChessBoardBuilder;

	public constructor() {
		this.chessBoardBuilder = new ChessBoardBuilder();
	}

	public switchSide(): void {
		this.chessBoardBuilder.switchSide();
	}

	public newGame(): void {
		RequestSender.execute('KnightsTale/api/game/new', 'GET', () => {
			this.chessBoardBuilder.resetStates();
			this.chessBoardBuilder.showChessBoard();
		});
	}

	public loadGame(_: HTMLInputElement, event: Event): void {
		const target = <HTMLInputElement>event.target;
		const files = <FileList>target.files;
		const file = <File>files[0];

		const formData = new FormData();
		formData.append('file', file, file.name);

		RequestSender.sendFormData('KnightsTale/api/game/load', 'POST', (knightsTaleDto: KnightsTaleDto) => {
			this.chessBoardBuilder.loadState(knightsTaleDto);
		}, formData);
	}


	public saveGame(): void {
		RequestSender.execute('KnightsTale/api/game/save', 'PUT', (data: string) => { console.log(data); });
	}
}

ko.applyBindings(new ChessGame(), document.getElementById('app'));