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
        $(function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUIsT0FBTyxLQUFLLE1BQU0sdUJBQXVCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5EO0lBY0M7UUFBQSxpQkFtQkM7UUE3Qk0sZ0JBQVcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLGdDQUEyQixHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDN0QsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkYsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFLekYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLENBQUMsQ0FBQzs7WUFDRCxJQUFNLFNBQVMsR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVCLElBQU0s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UUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcclxuaW1wb3J0IHRvYXN0IGZyb20gJ0BicmVub3Jvb3NldmVsdC90b2FzdCc7XHJcblxyXG5pbXBvcnQgeyBDaGVzc0JvYXJkQnVpbGRlciB9IGZyb20gJy4vQ2hlc3NCb2FyZEJ1aWxkZXIuanMnO1xyXG5pbXBvcnQgdHlwZSB7IEtuaWdodHNUYWxlRHRvIH0gZnJvbSAnLi9EdG9zL0tuaWdodHNUYWxlRHRvLmpzJztcclxuaW1wb3J0IHR5cGUgeyBNb3ZlUmVzdWx0IH0gZnJvbSAnLi9EdG9zL01vdmVSZXN1bHQuanMnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0Q2FsbGJhY2tzRHRvIH0gZnJvbSAnLi9EdG9zL1JlcXVlc3RDYWxsYmFja3NEdG8uanMnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0U2VuZGVyIH0gZnJvbSAnLi9SZXF1ZXN0U2VuZGVyLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVzc0dhbWUge1xyXG5cclxuXHRwdWJsaWMgY2hlc3NCb2FyZEJ1aWxkZXI6IENoZXNzQm9hcmRCdWlsZGVyO1xyXG5cclxuXHRwdWJsaWMgcGxheWVyVHlwZXMgPSBrby5vYnNlcnZhYmxlQXJyYXk8c3RyaW5nPihbXSk7XHJcblx0cHVibGljIHNlbGVjdGVkQmxhY2tQbGF5ZXJUeXBlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGU6IGtvLk9ic2VydmFibGU8c3RyaW5nPiA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cclxuXHRwdWJsaWMgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzID0ga28ub2JzZXJ2YWJsZUFycmF5PHN0cmluZz4oW10pO1xyXG5cdHB1YmxpYyBzZWxlY3RlZEJsYWNrRmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGU6IGtvLk9ic2VydmFibGU8c3RyaW5nPiA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHB1YmxpYyBzZWxlY3RlZFdoaXRlRmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGU6IGtvLk9ic2VydmFibGU8c3RyaW5nPiA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cclxuXHRwcml2YXRlIHJlYWRvbmx5IHNlbGY6IENoZXNzR2FtZTtcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlciA9IG5ldyBDaGVzc0JvYXJkQnVpbGRlcih0aGlzKTtcclxuXHRcdHRoaXMuZ2V0UGxheWVyVHlwZXMoKTtcclxuXHRcdHRoaXMuZ2V0RmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzKCk7XHJcblx0XHR0aGlzLnNlbGYgPSB0aGlzO1xyXG5cclxuXHRcdCQoKCkgPT4ge1xyXG5cdFx0XHRjb25zdCBjaGVzc0dhbWUgPSB0aGlzLnNlbGY7XHJcblx0XHRcdGNvbnN0IG5hdmlnYXRpb25FbnRyaWVzID0gcGVyZm9ybWFuY2UuZ2V0RW50cmllc0J5VHlwZSgnbmF2aWdhdGlvbicpIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZ1tdO1xyXG5cclxuXHRcdFx0aWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiBuYXZpZ2F0aW9uRW50cmllcy5sZW5ndGggPiAwICYmIG5hdmlnYXRpb25FbnRyaWVzWzBdPy50eXBlID09PSAncmVsb2FkJykge1xyXG5cdFx0XHQvL2lmICh3aW5kb3cucGVyZm9ybWFuY2UgJiYgcGVyZm9ybWFuY2UubmF2aWdhdGlvbi50eXBlID09PSBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLlRZUEVfUkVMT0FEKSB7XHJcblx0XHRcdFx0Y29uc3QgY2FsbGJhY2tzID0gbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oXHJcblx0XHRcdFx0XHQoa25pZ2h0c1RhbGVEdG86IEtuaWdodHNUYWxlRHRvKSA9PiB7IGNoZXNzR2FtZS5jaGVzc0JvYXJkQnVpbGRlci5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pOyB9LFxyXG5cdFx0XHRcdFx0KHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9XHJcblx0XHRcdFx0KTtcclxuXHRcdFx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL3JlZnJlc2gnLCAnUE9TVCcsIGNhbGxiYWNrcywgJ1BhZ2UgcmVmcmVzaGVkLicpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJlZnJlc2hCb2FyZCgpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIuc2hvd0NoZXNzQm9hcmQoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzd2l0Y2hTaWRlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zd2l0Y2hTaWRlKCk7XHJcblx0XHR0b2FzdC5zdWNjZXNzKCdUYWJsZSB0dXJuZWQuJyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbmV3R2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbmV3JywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKCgpID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5yZXNldFN0YXRlcygpO1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnNob3dDaGVzc0JvYXJkKCk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCAnTmV3IGdhbWUgc3RhcnRlZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBsb2FkR2FtZShfOiBIVE1MSW5wdXRFbGVtZW50LCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuXHRcdGNvbnN0IGZpbGVzID0gPEZpbGVMaXN0PnRhcmdldC5maWxlcztcclxuXHRcdGNvbnN0IGZpbGUgPSA8RmlsZT5maWxlc1swXTtcclxuXHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuXHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL2xvYWQnLCAnUE9TVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChrbmlnaHRzVGFsZUR0bzogS25pZ2h0c1RhbGVEdG8pID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSwgYCR7ZmlsZS5uYW1lfSBoYXMgYmVlbiBsb2FkZWQuYCwgZm9ybURhdGEpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGJsYWNrQUlDaGFuZ2VkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRCbGFja1BsYXllclR5cGUoKSkge1xyXG5cdFx0XHR0aGlzLm1vdmVCbGFja0FJKHRydWUpOyAvLyBQYXNzIGNvcnJlY3QgdmFsdWUgaW5zdGVhZCBvZiB0cnVlXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbW92ZUJsYWNrQUkoYmxhY2tUdXJuOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRjb25zdCBsZXZlbCA9IHRoaXMuc2VsZWN0ZWRCbGFja1BsYXllclR5cGUoKTtcclxuXHRcdGlmICgobGV2ZWwgIT09ICdIdW1hbicpICYmIGJsYWNrVHVybikge1xyXG5cdFx0XHRjb25zdCBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSA9IHRoaXMuc2VsZWN0ZWRCbGFja0ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlKCk7XHJcblx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvYWkvZ2V0bW92ZT9sZXZlbFN0cj0ke2xldmVsfSZmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZVN0cj0ke2ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlfWAsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygobW92ZVJlc3VsdDogTW92ZVJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdGlmICghbW92ZVJlc3VsdC5pc1doaXRlVHVybikge1xyXG5cdFx0XHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5tb3ZlKG1vdmVSZXN1bHQubW92ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHRcdH1cclxuICAgIH1cclxuXHJcblx0cHVibGljIHdoaXRlQUlDaGFuZ2VkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGUoKSkge1xyXG5cdFx0XHR0aGlzLm1vdmVXaGl0ZUFJKHRydWUpOyAvLyBQYXNzIGNvcnJlY3QgdmFsdWUgaW5zdGVhZCBvZiB0cnVlXHJcbiAgICAgICAgfVxyXG5cdH1cclxuXHJcblx0cHVibGljIG1vdmVXaGl0ZUFJKHdoaXRlVHVybjogYm9vbGVhbik6IHZvaWQge1xyXG5cdFx0Y29uc3QgbGV2ZWwgPSB0aGlzLnNlbGVjdGVkV2hpdGVQbGF5ZXJUeXBlKCk7XHJcblx0XHRpZiAoKGxldmVsICE9PSAnSHVtYW4nKSAmJiB3aGl0ZVR1cm4pIHtcclxuXHRcdFx0Y29uc3QgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGUgPSB0aGlzLnNlbGVjdGVkV2hpdGVGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSgpO1xyXG5cdFx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoYEtuaWdodHNUYWxlL2FwaS9nYW1lL2FpL2dldG1vdmU/bGV2ZWxTdHI9JHtsZXZlbH0mZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVTdHI9JHtmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZX1gLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKG1vdmVSZXN1bHQ6IE1vdmVSZXN1bHQpID0+IHtcclxuXHRcdFx0XHRpZiAobW92ZVJlc3VsdC5pc1doaXRlVHVybikge1xyXG5cdFx0XHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5tb3ZlKG1vdmVSZXN1bHQubW92ZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzYXZlR2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvc2F2ZScsICdQT1NUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKGJhc2U2NFNhdmVHYW1lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0Y29uc3Qgc2F2ZUdhbWUgPSBVaW50OEFycmF5LmZyb20oYXRvYihiYXNlNjRTYXZlR2FtZSksIGMgPT4gYy5jaGFyQ29kZUF0KDApKTtcclxuXHRcdFx0Y29uc3QgZmlsZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc2F2ZUdhbWVdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nIH0pO1xyXG5cdFx0XHRjb25zdCBkb3dubG9hZFVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cdFx0XHRmaWxlTGluay5ocmVmID0gZG93bmxvYWRVUkw7XHJcblx0XHRcdGZpbGVMaW5rLmRvd25sb2FkID0gJ2dhbWUuY2dzJztcclxuXHRcdFx0ZmlsZUxpbmsuY2xpY2soKTtcclxuXHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChmaWxlTGluay5ocmVmKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSksICdTYXZlIHN1Y2NlZWRlZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRQbGF5ZXJUeXBlcygpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvcGxheWVydHlwZXMnLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKHBsYXllclR5cGVzOiBBcnJheTxvYmplY3Q+KSA9PiB7XHJcblx0XHRcdGNvbnN0IHBsYXllclRwZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMocGxheWVyVHlwZXMpLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0cGxheWVyVHBlTmFtZXMucHVzaCgoPG9iamVjdD5wbGF5ZXJUeXBlc1tpXSkudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHRcdFx0dGhpcy5wbGF5ZXJUeXBlcyhwbGF5ZXJUcGVOYW1lcyk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBnZXRGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoKTogdm9pZCB7XHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL2ZpZ3VyZXZhbHVlY2FsY3VsYXRpb25tb2RlcycsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygoZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzOiBBcnJheTxvYmplY3Q+KSA9PiB7XHJcblx0XHRcdGNvbnN0IGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMpLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0ZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVOYW1lcy5wdXNoKCg8b2JqZWN0PmZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2Rlc1tpXSkudG9TdHJpbmcoKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0dGhpcy5maWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVOYW1lcyk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHR9XHJcbn1cclxuXHJcbmtvLmFwcGx5QmluZGluZ3MobmV3IENoZXNzR2FtZSgpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyJdfQ==