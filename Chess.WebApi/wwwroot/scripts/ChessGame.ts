import $ from 'jquery';
import ko from 'knockout';
import toast from '@brenoroosevelt/toast';

import { ChessBoardBuilder } from './ChessBoardBuilder.js';
import type { KnightsTaleDto } from './Dtos/KnightsTaleDto.js';
import type { MoveResult } from './Dtos/MoveResult.js';
import { RequestCallbacksDto } from './Dtos/RequestCallbacksDto.js';
import { RequestSender } from './RequestSender.js';

export class ChessGame {

	public chessBoardBuilder: ChessBoardBuilder;

	public playerTypes = ko.observableArray<string>([]);
	public selectedBlackPlayerType: ko.Observable<string> = ko.observable('');
	public selectedWhitePlayerType: ko.Observable<string> = ko.observable('');

	public figureValueCalculationModes = ko.observableArray<string>([]);
	public selectedBlackFigureValueCalculationMode: ko.Observable<string> = ko.observable('');
	public selectedWhiteFigureValueCalculationMode: ko.Observable<string> = ko.observable('');

	private readonly self: ChessGame;

	public constructor() {
		this.chessBoardBuilder = new ChessBoardBuilder(this);
		this.getPlayerTypes();
		this.getFigureValueCalculationModes();
		this.self = this;

		$(document).ready(() => {
			const chessGame = this.self;
			if (window.performance && performance.navigation.type === performance.navigation.TYPE_RELOAD) {
				const callbacks = new RequestCallbacksDto(
					(knightsTaleDto: KnightsTaleDto) => { chessGame.chessBoardBuilder.loadState(knightsTaleDto); },
					(request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }
				);
				RequestSender.execute('KnightsTale/api/game/refresh', 'POST', callbacks, 'Page refreshed.');
			}
		});
	}

	refreshBoard(): void {
		this.chessBoardBuilder.showChessBoard();
	}

	public switchSide(): void {
		this.chessBoardBuilder.switchSide();
		toast.success('Table turned.');
	}

	public newGame(): void {
		RequestSender.execute('KnightsTale/api/game/new', 'GET', new RequestCallbacksDto(() => {
			this.chessBoardBuilder.resetStates();
			this.chessBoardBuilder.showChessBoard();
		}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }), 'New game started.');
	}

	public loadGame(_: HTMLInputElement, event: Event): void {
		const target = <HTMLInputElement>event.target;
		const files = <FileList>target.files;
		const file = <File>files[0];

		const formData = new FormData();
		formData.append('file', file, file.name);

		RequestSender.execute('KnightsTale/api/game/load', 'POST', new RequestCallbacksDto((knightsTaleDto: KnightsTaleDto) => {
			this.chessBoardBuilder.loadState(knightsTaleDto);
		}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }), `${file.name} has been loaded.`, formData);
	}

	public blackAIChanged(): void {
		if (this.selectedBlackPlayerType()) {
			this.moveBlackAI(true); // Pass correct value instead of true
		}
	}

	public moveBlackAI(blackTurn: boolean): void {
		const level = this.selectedBlackPlayerType();
		if ((level !== 'Human') && blackTurn) {
			const figureValueCalculationMode = this.selectedBlackFigureValueCalculationMode();
			RequestSender.execute(`KnightsTale/api/game/ai/getmove?levelStr=${level}&figureValueCalculationModeStr=${figureValueCalculationMode}`, 'GET', new RequestCallbacksDto((moveResult: MoveResult) => {
				if (!moveResult.isWhiteTurn) {
					this.chessBoardBuilder.move(moveResult.move);
				}
			}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
		}
    }

	public whiteAIChanged(): void {
		if (this.selectedWhitePlayerType()) {
			this.moveWhiteAI(true); // Pass correct value instead of true
        }
	}

	public moveWhiteAI(whiteTurn: boolean): void {
		const level = this.selectedWhitePlayerType();
		if ((level !== 'Human') && whiteTurn) {
			const figureValueCalculationMode = this.selectedWhiteFigureValueCalculationMode();
			RequestSender.execute(`KnightsTale/api/game/ai/getmove?levelStr=${level}&figureValueCalculationModeStr=${figureValueCalculationMode}`, 'GET', new RequestCallbacksDto((moveResult: MoveResult) => {
				if (moveResult.isWhiteTurn) {
					this.chessBoardBuilder.move(moveResult.move);
				}
			}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
		}
	}

	public saveGame(): void {
		RequestSender.execute('KnightsTale/api/game/save', 'POST', new RequestCallbacksDto((base64SaveGame: string) => {
			const saveGame = Uint8Array.from(atob(base64SaveGame), c => c.charCodeAt(0));
			const fileLink = document.createElement('a');
			const blob = new Blob([saveGame], { type: 'application/octet-stream' });
			const downloadURL = window.URL.createObjectURL(blob);
			fileLink.href = downloadURL;
			fileLink.download = 'game.cgs';
			fileLink.click();
			URL.revokeObjectURL(fileLink.href);
		}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }), 'Save succeeded.');
	}

	public getPlayerTypes(): void {
		RequestSender.execute('KnightsTale/api/game/playertypes', 'GET', new RequestCallbacksDto((playerTypes: Array<object>) => {
			const playerTpeNames: Array<string> = [];
			for (let i = 0; i < Object.keys(playerTypes).length; i++) {
				playerTpeNames.push((<object>playerTypes[i]).toString());
            }
			this.playerTypes(playerTpeNames);
		}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
	}

	public getFigureValueCalculationModes(): void {
		RequestSender.execute('KnightsTale/api/game/figurevaluecalculationmodes', 'GET', new RequestCallbacksDto((figureValueCalculationModes: Array<object>) => {
			const figureValueCalculationModeNames: Array<string> = [];
			for (let i = 0; i < Object.keys(figureValueCalculationModes).length; i++) {
				figureValueCalculationModeNames.push((<object>figureValueCalculationModes[i]).toString());
			}
			this.figureValueCalculationModes(figureValueCalculationModeNames);
		}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
	}
}

ko.applyBindings(new ChessGame(), document.getElementById('app'));