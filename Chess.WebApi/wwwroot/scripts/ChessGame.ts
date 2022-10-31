import { ChessBoardBuilder } from './ChessBoardBuilder.js';
import type { KnightsTaleDto } from './Dtos/KnightsTaleDto.js';
import { RequestCallbacksDto } from './Dtos/RequestCallbacksDto.js';
import { RequestSender } from './RequestSender.js';
import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';
//import * as ko from '../lib/knockout/build/types/knockout';

export class ChessGame {

	public chessBoardBuilder: ChessBoardBuilder;

	public playerTypes = ko.observableArray<string>([]);
	public selectedBlackPlayerType: ko.Observable<string> = ko.observable('');
	public selectedWhitePlayerType: ko.Observable<string> = ko.observable('');

	public figureValueCalculationModes = ko.observableArray<string>([]);
	public selectedBlackFigureValueCalculationMode: ko.Observable<string> = ko.observable('');
	public selectedWhiteFigureValueCalculationMode: ko.Observable<string> = ko.observable('');

	private playerTypesDictionary: Array<object> = [];
	private figureValueCalculationModesDictionary: Array<object> = [];

	public constructor() {
		this.chessBoardBuilder = new ChessBoardBuilder();
		this.getPlayerTypes();
		this.getFigureValueCalculationModes();
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
			const level = this.getLevel(this.selectedBlackPlayerType());
			if (level !== 0) {
				const figureValueCalculationMode = this.getFigureValueCalculationMode(this.selectedBlackFigureValueCalculationMode());
				RequestSender.execute(`KnightsTale/api/game/ai/getmove?level=${level}&figureValueCalculationMode=${figureValueCalculationMode}`, 'GET', new RequestCallbacksDto((move: string) => {
					this.chessBoardBuilder.move(move);
				}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
			}
		}
	}

	public whiteAIChanged(): void {
		if (this.selectedWhitePlayerType()) {
			const level = this.getLevel(this.selectedWhitePlayerType());
			if (level !== 0) {
				const figureValueCalculationMode = this.getFigureValueCalculationMode(this.selectedWhiteFigureValueCalculationMode());
				RequestSender.execute(`KnightsTale/api/game/ai/getmove?level=${level}&figureValueCalculationMode=${figureValueCalculationMode}`, 'GET', new RequestCallbacksDto((move: string) => {
					this.chessBoardBuilder.move(move);
				}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
			}
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
			this.playerTypesDictionary = playerTypes;
			const playerTpeNames: Array<string> = [];
			for (let i = 0; i < Object.keys(playerTypes).length; i++) {
				playerTpeNames.push((<object>playerTypes[i]).toString());
            }
			this.playerTypes(playerTpeNames);
		}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
	}

	public getFigureValueCalculationModes(): void {
		RequestSender.execute('KnightsTale/api/game/figurevaluecalculationmodes', 'GET', new RequestCallbacksDto((figureValueCalculationModes: Array<object>) => {
			this.figureValueCalculationModesDictionary = figureValueCalculationModes;
			const figureValueCalculationModeNames: Array<string> = [];
			for (let i = 0; i < Object.keys(figureValueCalculationModes).length; i++) {
				figureValueCalculationModeNames.push((<object>figureValueCalculationModes[i]).toString());
			}
			this.figureValueCalculationModes(figureValueCalculationModeNames);
		}, (request: JQuery.jqXHR<object>) => { RequestSender.showError(request); }));
	}

	private getLevel(level: string) {
		for (let i = 0; i < Object.keys(this.playerTypesDictionary).length; i++) {
			if ((<object>this.playerTypesDictionary[i]).toString() === level) {
				return i;
			}
		}
		throw new Error('Level not found.');
	}

	private getFigureValueCalculationMode(figureValueCalculationMode: string) {
		for (let i = 0; i < Object.keys(this.figureValueCalculationModesDictionary).length; i++) {
			if ((<object>this.figureValueCalculationModesDictionary[i]).toString() === figureValueCalculationMode) {
				return i;
			}
		}
		throw new Error('FigureValueCalculationMode not found.');
	}
}

ko.applyBindings(new ChessGame(), document.getElementById('app'));