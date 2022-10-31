import { ChessBoardBuilder } from './ChessBoardBuilder.js';
import { RequestCallbacksDto } from './Dtos/RequestCallbacksDto.js';
import { RequestSender } from './RequestSender.js';
import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';
//import * as ko from '../lib/knockout/build/types/knockout';
var ChessGame = /** @class */ (function () {
    function ChessGame() {
        this.playerTypes = ko.observableArray([]);
        this.selectedBlackPlayerType = ko.observable('');
        this.selectedWhitePlayerType = ko.observable('');
        this.figureValueCalculationModes = ko.observableArray([]);
        this.selectedBlackFigureValueCalculationMode = ko.observable('');
        this.selectedWhiteFigureValueCalculationMode = ko.observable('');
        this.playerTypesDictionary = [];
        this.figureValueCalculationModesDictionary = [];
        this.chessBoardBuilder = new ChessBoardBuilder();
        this.getPlayerTypes();
        this.getFigureValueCalculationModes();
    }
    ChessGame.prototype.switchSide = function () {
        this.chessBoardBuilder.switchSide();
        toast.success('Table turned.');
    };
    ChessGame.prototype.newGame = function () {
        var _this = this;
        RequestSender.execute('KnightsTale/api/game/new', 'GET', new RequestCallbacksDto(function () {
            _this.chessBoardBuilder.resetStates();
            _this.chessBoardBuilder.showChessBoard();
        }, function (request) { RequestSender.showError(request); }), 'New game started.');
    };
    ChessGame.prototype.loadGame = function (_, event) {
        var _this = this;
        var target = event.target;
        var files = target.files;
        var file = files[0];
        var formData = new FormData();
        formData.append('file', file, file.name);
        RequestSender.execute('KnightsTale/api/game/load', 'POST', new RequestCallbacksDto(function (knightsTaleDto) {
            _this.chessBoardBuilder.loadState(knightsTaleDto);
        }, function (request) { RequestSender.showError(request); }), "".concat(file.name, " has been loaded."), formData);
    };
    ChessGame.prototype.blackAIChanged = function () {
        var _this = this;
        if (this.selectedBlackPlayerType()) {
            var level = this.getLevel(this.selectedBlackPlayerType());
            if (level !== 0) {
                var figureValueCalculationMode = this.getFigureValueCalculationMode(this.selectedBlackFigureValueCalculationMode());
                RequestSender.execute("KnightsTale/api/game/ai/getmove?level=".concat(level, "&figureValueCalculationMode=").concat(figureValueCalculationMode), 'GET', new RequestCallbacksDto(function (move) {
                    _this.chessBoardBuilder.move(move);
                }, function (request) { RequestSender.showError(request); }));
            }
        }
    };
    ChessGame.prototype.whiteAIChanged = function () {
        var _this = this;
        if (this.selectedWhitePlayerType()) {
            var level = this.getLevel(this.selectedWhitePlayerType());
            if (level !== 0) {
                var figureValueCalculationMode = this.getFigureValueCalculationMode(this.selectedWhiteFigureValueCalculationMode());
                RequestSender.execute("KnightsTale/api/game/ai/getmove?level=".concat(level, "&figureValueCalculationMode=").concat(figureValueCalculationMode), 'GET', new RequestCallbacksDto(function (move) {
                    _this.chessBoardBuilder.move(move);
                }, function (request) { RequestSender.showError(request); }));
            }
        }
    };
    ChessGame.prototype.saveGame = function () {
        RequestSender.execute('KnightsTale/api/game/save', 'POST', new RequestCallbacksDto(function (base64SaveGame) {
            var saveGame = Uint8Array.from(atob(base64SaveGame), function (c) { return c.charCodeAt(0); });
            var fileLink = document.createElement('a');
            var blob = new Blob([saveGame], { type: 'application/octet-stream' });
            var downloadURL = window.URL.createObjectURL(blob);
            fileLink.href = downloadURL;
            fileLink.download = 'game.cgs';
            fileLink.click();
            URL.revokeObjectURL(fileLink.href);
        }, function (request) { RequestSender.showError(request); }), 'Save succeeded.');
    };
    ChessGame.prototype.getPlayerTypes = function () {
        var _this = this;
        RequestSender.execute('KnightsTale/api/game/playertypes', 'GET', new RequestCallbacksDto(function (playerTypes) {
            _this.playerTypesDictionary = playerTypes;
            var playerTpeNames = [];
            for (var i = 0; i < Object.keys(playerTypes).length; i++) {
                playerTpeNames.push(playerTypes[i].toString());
            }
            _this.playerTypes(playerTpeNames);
        }, function (request) { RequestSender.showError(request); }));
    };
    ChessGame.prototype.getFigureValueCalculationModes = function () {
        var _this = this;
        RequestSender.execute('KnightsTale/api/game/figurevaluecalculationmodes', 'GET', new RequestCallbacksDto(function (figureValueCalculationModes) {
            _this.figureValueCalculationModesDictionary = figureValueCalculationModes;
            var figureValueCalculationModeNames = [];
            for (var i = 0; i < Object.keys(figureValueCalculationModes).length; i++) {
                figureValueCalculationModeNames.push(figureValueCalculationModes[i].toString());
            }
            _this.figureValueCalculationModes(figureValueCalculationModeNames);
        }, function (request) { RequestSender.showError(request); }));
    };
    ChessGame.prototype.getLevel = function (level) {
        for (var i = 0; i < Object.keys(this.playerTypesDictionary).length; i++) {
            if (this.playerTypesDictionary[i].toString() === level) {
                return i;
            }
        }
        throw new Error('Level not found.');
    };
    ChessGame.prototype.getFigureValueCalculationMode = function (figureValueCalculationMode) {
        for (var i = 0; i < Object.keys(this.figureValueCalculationModesDictionary).length; i++) {
            if (this.figureValueCalculationModesDictionary[i].toString() === figureValueCalculationMode) {
                return i;
            }
        }
        throw new Error('FigureValueCalculationMode not found.');
    };
    return ChessGame;
}());
export { ChessGame };
ko.applyBindings(new ChessGame(), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEtBQUssS0FBSyxNQUFNLCtDQUErQyxDQUFDO0FBQ3ZFLDZEQUE2RDtBQUU3RDtJQWVDO1FBWE8sZ0JBQVcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLGdDQUEyQixHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDN0QsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkYsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbEYsMEJBQXFCLEdBQWtCLEVBQUUsQ0FBQztRQUMxQywwQ0FBcUMsR0FBa0IsRUFBRSxDQUFDO1FBR2pFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO0lBQ3ZDLENBQUM7SUFFTSw4QkFBVSxHQUFqQjtRQUNDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwQyxLQUFLLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lB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LENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU8sNEJBQVEsR0FBaEIsVUFBaUIsS0FBYTtRQUM3QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEUsSUFBYSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFFLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSyxFQUFFO2dCQUNqRSxPQUFPLENBQUMsQ0FBQzthQUNUO1NBQ0Q7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVPLGlEQUE2QixHQUFyQyxVQUFzQywwQkFBa0M7UUFDdkUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hGLElBQWEsSUFBSSxDQUFDLHFDQUFxQyxDQUFDLENBQUMsQ0FBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLDBCQUEwQixFQUFFO2dCQUN0RyxPQUFPLENBQUMsQ0FBQzthQUNUO1NBQ0Q7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQTFIRCxJQTBIQzs7QUFFRCxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hlc3NCb2FyZEJ1aWxkZXIgfSBmcm9tICcuL0NoZXNzQm9hcmRCdWlsZGVyLmpzJztcclxuaW1wb3J0IHR5cGUgeyBLbmlnaHRzVGFsZUR0byB9IGZyb20gJy4vRHRvcy9LbmlnaHRzVGFsZUR0by5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RDYWxsYmFja3NEdG8gfSBmcm9tICcuL0R0b3MvUmVxdWVzdENhbGxiYWNrc0R0by5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RTZW5kZXIgfSBmcm9tICcuL1JlcXVlc3RTZW5kZXIuanMnO1xyXG5pbXBvcnQgKiBhcyB0b2FzdCBmcm9tICcuLi9saWIvQGJyZW5vcm9vc2V2ZWx0L3RvYXN0L2xpYi9lc20vdG9hc3QuanMnO1xyXG4vL2ltcG9ydCAqIGFzIGtvIGZyb20gJy4uL2xpYi9rbm9ja291dC9idWlsZC90eXBlcy9rbm9ja291dCc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NHYW1lIHtcclxuXHJcblx0cHVibGljIGNoZXNzQm9hcmRCdWlsZGVyOiBDaGVzc0JvYXJkQnVpbGRlcjtcclxuXHJcblx0cHVibGljIHBsYXllclR5cGVzID0ga28ub2JzZXJ2YWJsZUFycmF5PHN0cmluZz4oW10pO1xyXG5cdHB1YmxpYyBzZWxlY3RlZEJsYWNrUGxheWVyVHlwZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0cHVibGljIHNlbGVjdGVkV2hpdGVQbGF5ZXJUeXBlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHJcblx0cHVibGljIGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcyA9IGtvLm9ic2VydmFibGVBcnJheTxzdHJpbmc+KFtdKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRCbGFja0ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRXaGl0ZUZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHJcblx0cHJpdmF0ZSBwbGF5ZXJUeXBlc0RpY3Rpb25hcnk6IEFycmF5PG9iamVjdD4gPSBbXTtcclxuXHRwcml2YXRlIGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2Rlc0RpY3Rpb25hcnk6IEFycmF5PG9iamVjdD4gPSBbXTtcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlciA9IG5ldyBDaGVzc0JvYXJkQnVpbGRlcigpO1xyXG5cdFx0dGhpcy5nZXRQbGF5ZXJUeXBlcygpO1xyXG5cdFx0dGhpcy5nZXRGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzd2l0Y2hTaWRlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zd2l0Y2hTaWRlKCk7XHJcblx0XHR0b2FzdC5zdWNjZXNzKCdUYWJsZSB0dXJuZWQuJyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbmV3R2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbmV3JywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKCgpID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5yZXNldFN0YXRlcygpO1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnNob3dDaGVzc0JvYXJkKCk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCAnTmV3IGdhbWUgc3RhcnRlZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBsb2FkR2FtZShfOiBIVE1MSW5wdXRFbGVtZW50LCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuXHRcdGNvbnN0IGZpbGVzID0gPEZpbGVMaXN0PnRhcmdldC5maWxlcztcclxuXHRcdGNvbnN0IGZpbGUgPSA8RmlsZT5maWxlc1swXTtcclxuXHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuXHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL2xvYWQnLCAnUE9TVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChrbmlnaHRzVGFsZUR0bzogS25pZ2h0c1RhbGVEdG8pID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSwgYCR7ZmlsZS5uYW1lfSBoYXMgYmVlbiBsb2FkZWQuYCwgZm9ybURhdGEpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGJsYWNrQUlDaGFuZ2VkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRCbGFja1BsYXllclR5cGUoKSkge1xyXG5cdFx0XHRjb25zdCBsZXZlbCA9IHRoaXMuZ2V0TGV2ZWwodGhpcy5zZWxlY3RlZEJsYWNrUGxheWVyVHlwZSgpKTtcclxuXHRcdFx0aWYgKGxldmVsICE9PSAwKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGUgPSB0aGlzLmdldEZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlKHRoaXMuc2VsZWN0ZWRCbGFja0ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlKCkpO1xyXG5cdFx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvYWkvZ2V0bW92ZT9sZXZlbD0ke2xldmVsfSZmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZT0ke2ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlfWAsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygobW92ZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLm1vdmUobW92ZSk7XHJcblx0XHRcdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyB3aGl0ZUFJQ2hhbmdlZCgpOiB2b2lkIHtcclxuXHRcdGlmICh0aGlzLnNlbGVjdGVkV2hpdGVQbGF5ZXJUeXBlKCkpIHtcclxuXHRcdFx0Y29uc3QgbGV2ZWwgPSB0aGlzLmdldExldmVsKHRoaXMuc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGUoKSk7XHJcblx0XHRcdGlmIChsZXZlbCAhPT0gMCkge1xyXG5cdFx0XHRcdGNvbnN0IGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlID0gdGhpcy5nZXRGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSh0aGlzLnNlbGVjdGVkV2hpdGVGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSgpKTtcclxuXHRcdFx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoYEtuaWdodHNUYWxlL2FwaS9nYW1lL2FpL2dldG1vdmU/bGV2ZWw9JHtsZXZlbH0mZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGU9JHtmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZX1gLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKG1vdmU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5tb3ZlKG1vdmUpO1xyXG5cdFx0XHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdFx0XHR9XHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNhdmVHYW1lKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9zYXZlJywgJ1BPU1QnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygoYmFzZTY0U2F2ZUdhbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRjb25zdCBzYXZlR2FtZSA9IFVpbnQ4QXJyYXkuZnJvbShhdG9iKGJhc2U2NFNhdmVHYW1lKSwgYyA9PiBjLmNoYXJDb2RlQXQoMCkpO1xyXG5cdFx0XHRjb25zdCBmaWxlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzYXZlR2FtZV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScgfSk7XHJcblx0XHRcdGNvbnN0IGRvd25sb2FkVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblx0XHRcdGZpbGVMaW5rLmhyZWYgPSBkb3dubG9hZFVSTDtcclxuXHRcdFx0ZmlsZUxpbmsuZG93bmxvYWQgPSAnZ2FtZS5jZ3MnO1xyXG5cdFx0XHRmaWxlTGluay5jbGljaygpO1xyXG5cdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKGZpbGVMaW5rLmhyZWYpO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSwgJ1NhdmUgc3VjY2VlZGVkLicpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFBsYXllclR5cGVzKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9wbGF5ZXJ0eXBlcycsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygocGxheWVyVHlwZXM6IEFycmF5PG9iamVjdD4pID0+IHtcclxuXHRcdFx0dGhpcy5wbGF5ZXJUeXBlc0RpY3Rpb25hcnkgPSBwbGF5ZXJUeXBlcztcclxuXHRcdFx0Y29uc3QgcGxheWVyVHBlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhwbGF5ZXJUeXBlcykubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRwbGF5ZXJUcGVOYW1lcy5wdXNoKCg8b2JqZWN0PnBsYXllclR5cGVzW2ldKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0XHR0aGlzLnBsYXllclR5cGVzKHBsYXllclRwZU5hbWVzKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcygpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvZmlndXJldmFsdWVjYWxjdWxhdGlvbm1vZGVzJywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXM6IEFycmF5PG9iamVjdD4pID0+IHtcclxuXHRcdFx0dGhpcy5maWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXNEaWN0aW9uYXJ5ID0gZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzO1xyXG5cdFx0XHRjb25zdCBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMoZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzKS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlTmFtZXMucHVzaCgoPG9iamVjdD5maWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXNbaV0pLnRvU3RyaW5nKCkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzKGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlTmFtZXMpO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldExldmVsKGxldmVsOiBzdHJpbmcpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5wbGF5ZXJUeXBlc0RpY3Rpb25hcnkpLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGlmICgoPG9iamVjdD50aGlzLnBsYXllclR5cGVzRGljdGlvbmFyeVtpXSkudG9TdHJpbmcoKSA9PT0gbGV2ZWwpIHtcclxuXHRcdFx0XHRyZXR1cm4gaTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0dGhyb3cgbmV3IEVycm9yKCdMZXZlbCBub3QgZm91bmQuJyk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldEZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlKGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlOiBzdHJpbmcpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXModGhpcy5maWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXNEaWN0aW9uYXJ5KS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRpZiAoKDxvYmplY3Q+dGhpcy5maWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXNEaWN0aW9uYXJ5W2ldKS50b1N0cmluZygpID09PSBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSkge1xyXG5cdFx0XHRcdHJldHVybiBpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aHJvdyBuZXcgRXJyb3IoJ0ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlIG5vdCBmb3VuZC4nKTtcclxuXHR9XHJcbn1cclxuXHJcbmtvLmFwcGx5QmluZGluZ3MobmV3IENoZXNzR2FtZSgpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyJdfQ==