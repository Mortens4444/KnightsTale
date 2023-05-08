import $ from 'jquery';
import ko from 'knockout';
import toast from '@brenoroosevelt/toast';
import { ChessBoardBuilder } from './ChessBoardBuilder.js';
import { RequestCallbacksDto } from './Dtos/RequestCallbacksDto.js';
import { RequestSender } from './RequestSender.js';
var ChessGame = /** @class */ (function () {
    function ChessGame() {
        var _this = this;
        this.playerTypes = ko.observableArray([]);
        this.selectedBlackPlayerType = ko.observable('');
        this.selectedWhitePlayerType = ko.observable('');
        this.figureValueCalculationModes = ko.observableArray([]);
        this.selectedBlackFigureValueCalculationMode = ko.observable('');
        this.selectedWhiteFigureValueCalculationMode = ko.observable('');
        this.chessBoardBuilder = new ChessBoardBuilder(this);
        this.getPlayerTypes();
        this.getFigureValueCalculationModes();
        this.self = this;
        $(document).ready(function () {
            var _a;
            var chessGame = _this.self;
            var navigationEntries = performance.getEntriesByType('navigation');
            if (window.performance && navigationEntries.length > 0 && ((_a = navigationEntries[0]) === null || _a === void 0 ? void 0 : _a.type) === 'reload') {
                //if (window.performance && performance.navigation.type === performance.navigation.TYPE_RELOAD) {
                var callbacks = new RequestCallbacksDto(function (knightsTaleDto) { chessGame.chessBoardBuilder.loadState(knightsTaleDto); }, function (request) { RequestSender.showError(request); });
                RequestSender.execute('KnightsTale/api/game/refresh', 'POST', callbacks, 'Page refreshed.');
            }
        });
    }
    ChessGame.prototype.refreshBoard = function () {
        this.chessBoardBuilder.showChessBoard();
    };
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
        if (this.selectedBlackPlayerType()) {
            this.moveBlackAI(true); // Pass correct value instead of true
        }
    };
    ChessGame.prototype.moveBlackAI = function (blackTurn) {
        var _this = this;
        var level = this.selectedBlackPlayerType();
        if ((level !== 'Human') && blackTurn) {
            var figureValueCalculationMode = this.selectedBlackFigureValueCalculationMode();
            RequestSender.execute("KnightsTale/api/game/ai/getmove?levelStr=".concat(level, "&figureValueCalculationModeStr=").concat(figureValueCalculationMode), 'GET', new RequestCallbacksDto(function (moveResult) {
                if (!moveResult.isWhiteTurn) {
                    _this.chessBoardBuilder.move(moveResult.move);
                }
            }, function (request) { RequestSender.showError(request); }));
        }
    };
    ChessGame.prototype.whiteAIChanged = function () {
        if (this.selectedWhitePlayerType()) {
            this.moveWhiteAI(true); // Pass correct value instead of true
        }
    };
    ChessGame.prototype.moveWhiteAI = function (whiteTurn) {
        var _this = this;
        var level = this.selectedWhitePlayerType();
        if ((level !== 'Human') && whiteTurn) {
            var figureValueCalculationMode = this.selectedWhiteFigureValueCalculationMode();
            RequestSender.execute("KnightsTale/api/game/ai/getmove?levelStr=".concat(level, "&figureValueCalculationModeStr=").concat(figureValueCalculationMode), 'GET', new RequestCallbacksDto(function (moveResult) {
                if (moveResult.isWhiteTurn) {
                    _this.chessBoardBuilder.move(moveResult.move);
                }
            }, function (request) { RequestSender.showError(request); }));
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
            var figureValueCalculationModeNames = [];
            for (var i = 0; i < Object.keys(figureValueCalculationModes).length; i++) {
                figureValueCalculationModeNames.push(figureValueCalculationModes[i].toString());
            }
            _this.figureValueCalculationModes(figureValueCalculationModeNames);
        }, function (request) { RequestSender.showError(request); }));
    };
    return ChessGame;
}());
export { ChessGame };
ko.applyBindings(new ChessGame(), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUIsT0FBTyxLQUFLLE1BQU0sdUJBQXVCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5EO0lBY0M7UUFBQSxpQkFtQkM7UUE3Qk0sZ0JBQVcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLGdDQUEyQixHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDN0QsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkYsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFLekYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7O1lBQ2pCLElBQU0sU0FBUyxHQUFHLEtBQUks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LENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5pbXBvcnQga28gZnJvbSAna25vY2tvdXQnO1xyXG5pbXBvcnQgdG9hc3QgZnJvbSAnQGJyZW5vcm9vc2V2ZWx0L3RvYXN0JztcclxuXHJcbmltcG9ydCB7IENoZXNzQm9hcmRCdWlsZGVyIH0gZnJvbSAnLi9DaGVzc0JvYXJkQnVpbGRlci5qcyc7XHJcbmltcG9ydCB0eXBlIHsgS25pZ2h0c1RhbGVEdG8gfSBmcm9tICcuL0R0b3MvS25pZ2h0c1RhbGVEdG8uanMnO1xyXG5pbXBvcnQgdHlwZSB7IE1vdmVSZXN1bHQgfSBmcm9tICcuL0R0b3MvTW92ZVJlc3VsdC5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RDYWxsYmFja3NEdG8gfSBmcm9tICcuL0R0b3MvUmVxdWVzdENhbGxiYWNrc0R0by5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RTZW5kZXIgfSBmcm9tICcuL1JlcXVlc3RTZW5kZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZXNzR2FtZSB7XHJcblxyXG5cdHB1YmxpYyBjaGVzc0JvYXJkQnVpbGRlcjogQ2hlc3NCb2FyZEJ1aWxkZXI7XHJcblxyXG5cdHB1YmxpYyBwbGF5ZXJUeXBlcyA9IGtvLm9ic2VydmFibGVBcnJheTxzdHJpbmc+KFtdKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRCbGFja1BsYXllclR5cGU6IGtvLk9ic2VydmFibGU8c3RyaW5nPiA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHB1YmxpYyBzZWxlY3RlZFdoaXRlUGxheWVyVHlwZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblxyXG5cdHB1YmxpYyBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMgPSBrby5vYnNlcnZhYmxlQXJyYXk8c3RyaW5nPihbXSk7XHJcblx0cHVibGljIHNlbGVjdGVkQmxhY2tGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0cHVibGljIHNlbGVjdGVkV2hpdGVGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgc2VsZjogQ2hlc3NHYW1lO1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyID0gbmV3IENoZXNzQm9hcmRCdWlsZGVyKHRoaXMpO1xyXG5cdFx0dGhpcy5nZXRQbGF5ZXJUeXBlcygpO1xyXG5cdFx0dGhpcy5nZXRGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoKTtcclxuXHRcdHRoaXMuc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0JChkb2N1bWVudCkucmVhZHkoKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBjaGVzc0dhbWUgPSB0aGlzLnNlbGY7XHJcblx0XHRcdGNvbnN0IG5hdmlnYXRpb25FbnRyaWVzID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZSgnbmF2aWdhdGlvbicpIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZ1tdO1xyXG5cclxuXHRcdFx0aWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiBuYXZpZ2F0aW9uRW50cmllcy5sZW5ndGggPiAwICYmIG5hdmlnYXRpb25FbnRyaWVzWzBdPy50eXBlID09PSAncmVsb2FkJykge1xyXG5cdFx0XHQvL2lmICh3aW5kb3cucGVyZm9ybWFuY2UgJiYgcGVyZm9ybWFuY2UubmF2aWdhdGlvbi50eXBlID09PSBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLlRZUEVfUkVMT0FEKSB7XHJcblx0XHRcdFx0Y29uc3QgY2FsbGJhY2tzID0gbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oXHJcblx0XHRcdFx0XHQoa25pZ2h0c1RhbGVEdG86IEtuaWdodHNUYWxlRHRvKSA9PiB7IGNoZXNzR2FtZS5jaGVzc0JvYXJkQnVpbGRlci5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pOyB9LFxyXG5cdFx0XHRcdFx0KHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL3JlZnJlc2gnLCAnUE9TVCcsIGNhbGxiYWNrcywgJ1BhZ2UgcmVmcmVzaGVkLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJlZnJlc2hCb2FyZCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIuc2hvd0NoZXNzQm9hcmQoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzd2l0Y2hTaWRlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zd2l0Y2hTaWRlKCk7XHJcblx0XHR0b2FzdC5zdWNjZXNzKCdUYWJsZSB0dXJuZWQuJyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbmV3R2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbmV3JywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKCgpID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5yZXNldFN0YXRlcygpO1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnNob3dDaGVzc0JvYXJkKCk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCAnTmV3IGdhbWUgc3RhcnRlZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBsb2FkR2FtZShfOiBIVE1MSW5wdXRFbGVtZW50LCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuXHRcdGNvbnN0IGZpbGVzID0gPEZpbGVMaXN0PnRhcmdldC5maWxlcztcclxuXHRcdGNvbnN0IGZpbGUgPSA8RmlsZT5maWxlc1swXTtcclxuXHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuXHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL2xvYWQnLCAnUE9TVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChrbmlnaHRzVGFsZUR0bzogS25pZ2h0c1RhbGVEdG8pID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSwgYCR7ZmlsZS5uYW1lfSBoYXMgYmVlbiBsb2FkZWQuYCwgZm9ybURhdGEpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGJsYWNrQUlDaGFuZ2VkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRCbGFja1BsYXllclR5cGUoKSkge1xyXG5cdFx0XHR0aGlzLm1vdmVCbGFja0FJKHRydWUpOyAvLyBQYXNzIGNvcnJlY3QgdmFsdWUgaW5zdGVhZCBvZiB0cnVlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbW92ZUJsYWNrQUkoYmxhY2tUdXJuOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRjb25zdCBsZXZlbCA9IHRoaXMuc2VsZWN0ZWRCbGFja1BsYXllclR5cGUoKTtcclxuXHRcdGlmICgobGV2ZWwgIT09ICdIdW1hbicpICYmIGJsYWNrVHVybikge1xyXG5cdFx0XHRjb25zdCBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSA9IHRoaXMuc2VsZWN0ZWRCbGFja0ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlKCk7XHJcblx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvYWkvZ2V0bW92ZT9sZXZlbFN0cj0ke2xldmVsfSZmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZVN0cj0ke2ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlfWAsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygobW92ZVJlc3VsdDogTW92ZVJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdGlmICghbW92ZVJlc3VsdC5pc1doaXRlVHVybikge1xyXG5cdFx0XHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5tb3ZlKG1vdmVSZXN1bHQubW92ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0cHVibGljIHdoaXRlQUlDaGFuZ2VkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGUoKSkge1xyXG5cdFx0XHR0aGlzLm1vdmVXaGl0ZUFJKHRydWUpOyAvLyBQYXNzIGNvcnJlY3QgdmFsdWUgaW5zdGVhZCBvZiB0cnVlXHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0cHVibGljIG1vdmVXaGl0ZUFJKHdoaXRlVHVybjogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0Y29uc3QgbGV2ZWwgPSB0aGlzLnNlbGVjdGVkV2hpdGVQbGF5ZXJUeXBlKCk7XHJcblx0XHRpZiAoKGxldmVsICE9PSAnSHVtYW4nKSAmJiB3aGl0ZVR1cm4pIHtcclxuXHRcdFx0Y29uc3QgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGUgPSB0aGlzLnNlbGVjdGVkV2hpdGVGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSgpO1xyXG5cdFx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoYEtuaWdodHNUYWxlL2FwaS9nYW1lL2FpL2dldG1vdmU/bGV2ZWxTdHI9JHtsZXZlbH0mZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVTdHI9JHtmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZX1gLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKG1vdmVSZXN1bHQ6IE1vdmVSZXN1bHQpID0+IHtcclxuXHRcdFx0XHRpZiAobW92ZVJlc3VsdC5pc1doaXRlVHVybikge1xyXG5cdFx0XHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5tb3ZlKG1vdmVSZXN1bHQubW92ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzYXZlR2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvc2F2ZScsICdQT1NUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKGJhc2U2NFNhdmVHYW1lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0Y29uc3Qgc2F2ZUdhbWUgPSBVaW50OEFycmF5LmZyb20oYXRvYihiYXNlNjRTYXZlR2FtZSksIGMgPT4gYy5jaGFyQ29kZUF0KDApKTtcclxuXHRcdFx0Y29uc3QgZmlsZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc2F2ZUdhbWVdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nIH0pO1xyXG5cdFx0XHRjb25zdCBkb3dubG9hZFVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cdFx0XHRmaWxlTGluay5ocmVmID0gZG93bmxvYWRVUkw7XHJcblx0XHRcdGZpbGVMaW5rLmRvd25sb2FkID0gJ2dhbWUuY2dzJztcclxuXHRcdFx0ZmlsZUxpbmsuY2xpY2soKTtcclxuXHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChmaWxlTGluay5ocmVmKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSksICdTYXZlIHN1Y2NlZWRlZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRQbGF5ZXJUeXBlcygpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvcGxheWVydHlwZXMnLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKHBsYXllclR5cGVzOiBBcnJheTxvYmplY3Q+KSA9PiB7XHJcblx0XHRcdGNvbnN0IHBsYXllclRwZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMocGxheWVyVHlwZXMpLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0cGxheWVyVHBlTmFtZXMucHVzaCgoPG9iamVjdD5wbGF5ZXJUeXBlc1tpXSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdFx0dGhpcy5wbGF5ZXJUeXBlcyhwbGF5ZXJUcGVOYW1lcyk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoKTogdm9pZCB7XHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL2ZpZ3VyZXZhbHVlY2FsY3VsYXRpb25tb2RlcycsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygoZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzOiBBcnJheTxvYmplY3Q+KSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMpLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0ZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVOYW1lcy5wdXNoKCg8b2JqZWN0PmZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2Rlc1tpXSkudG9TdHJpbmcoKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5maWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVOYW1lcyk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHR9XHJcbn1cclxuXHJcbmtvLmFwcGx5QmluZGluZ3MobmV3IENoZXNzR2FtZSgpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyJdfQ==