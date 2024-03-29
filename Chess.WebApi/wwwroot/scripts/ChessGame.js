import $ from 'jquery';
import ko from 'knockout';
import { success } from '@brenoroosevelt/toast/lib/esm/toast.js';
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
        success('Table turned.');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUIsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBRWpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRDtJQWNDO1FBQUEsaUJBbUJDO1FBN0JNLGdCQUFXLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUM3Qyw0QkFBdUIsR0FBMEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRSw0QkFBdUIsR0FBMEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVuRSxnQ0FBMkIsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdELDRDQUF1QyxHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25GLDRDQUF1QyxHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBS3pGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixDQUFDLENBQUM7O1lBQ0QsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQztZ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UUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuaW1wb3J0IGtvIGZyb20gJ2tub2Nrb3V0JztcclxuaW1wb3J0IHsgc3VjY2VzcyB9IGZyb20gJ0BicmVub3Jvb3NldmVsdC90b2FzdC9saWIvZXNtL3RvYXN0LmpzJztcclxuXHJcbmltcG9ydCB7IENoZXNzQm9hcmRCdWlsZGVyIH0gZnJvbSAnLi9DaGVzc0JvYXJkQnVpbGRlci5qcyc7XHJcbmltcG9ydCB0eXBlIHsgS25pZ2h0c1RhbGVEdG8gfSBmcm9tICcuL0R0b3MvS25pZ2h0c1RhbGVEdG8uanMnO1xyXG5pbXBvcnQgdHlwZSB7IE1vdmVSZXN1bHQgfSBmcm9tICcuL0R0b3MvTW92ZVJlc3VsdC5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RDYWxsYmFja3NEdG8gfSBmcm9tICcuL0R0b3MvUmVxdWVzdENhbGxiYWNrc0R0by5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RTZW5kZXIgfSBmcm9tICcuL1JlcXVlc3RTZW5kZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZXNzR2FtZSB7XHJcblxyXG5cdHB1YmxpYyBjaGVzc0JvYXJkQnVpbGRlcjogQ2hlc3NCb2FyZEJ1aWxkZXI7XHJcblxyXG5cdHB1YmxpYyBwbGF5ZXJUeXBlcyA9IGtvLm9ic2VydmFibGVBcnJheTxzdHJpbmc+KFtdKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRCbGFja1BsYXllclR5cGU6IGtvLk9ic2VydmFibGU8c3RyaW5nPiA9IGtvLm9ic2VydmFibGUoJycpO1xyXG5cdHB1YmxpYyBzZWxlY3RlZFdoaXRlUGxheWVyVHlwZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblxyXG5cdHB1YmxpYyBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMgPSBrby5vYnNlcnZhYmxlQXJyYXk8c3RyaW5nPihbXSk7XHJcblx0cHVibGljIHNlbGVjdGVkQmxhY2tGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0cHVibGljIHNlbGVjdGVkV2hpdGVGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblxyXG5cdHByaXZhdGUgcmVhZG9ubHkgc2VsZjogQ2hlc3NHYW1lO1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyID0gbmV3IENoZXNzQm9hcmRCdWlsZGVyKHRoaXMpO1xyXG5cdFx0dGhpcy5nZXRQbGF5ZXJUeXBlcygpO1xyXG5cdFx0dGhpcy5nZXRGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoKTtcclxuXHRcdHRoaXMuc2VsZiA9IHRoaXM7XHJcblxyXG5cdFx0JCgoKSA9PiB7XHJcblx0XHRcdGNvbnN0IGNoZXNzR2FtZSA9IHRoaXMuc2VsZjtcclxuXHRcdFx0Y29uc3QgbmF2aWdhdGlvbkVudHJpZXMgPSBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKCduYXZpZ2F0aW9uJykgYXMgUGVyZm9ybWFuY2VOYXZpZ2F0aW9uVGltaW5nW107XHJcblxyXG5cdFx0XHRpZiAod2luZG93LnBlcmZvcm1hbmNlICYmIG5hdmlnYXRpb25FbnRyaWVzLmxlbmd0aCA+IDAgJiYgbmF2aWdhdGlvbkVudHJpZXNbMF0/LnR5cGUgPT09ICdyZWxvYWQnKSB7XHJcblx0XHRcdC8vaWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLnR5cGUgPT09IHBlcmZvcm1hbmNlLm5hdmlnYXRpb24uVFlQRV9SRUxPQUQpIHtcclxuXHRcdFx0XHRjb25zdCBjYWxsYmFja3MgPSBuZXcgUmVxdWVzdENhbGxiYWNrc0R0byhcclxuXHRcdFx0XHRcdChrbmlnaHRzVGFsZUR0bzogS25pZ2h0c1RhbGVEdG8pID0+IHsgY2hlc3NHYW1lLmNoZXNzQm9hcmRCdWlsZGVyLmxvYWRTdGF0ZShrbmlnaHRzVGFsZUR0byk7IH0sXHJcblx0XHRcdFx0XHQocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH1cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvcmVmcmVzaCcsICdQT1NUJywgY2FsbGJhY2tzLCAnUGFnZSByZWZyZXNoZWQuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmVmcmVzaEJvYXJkKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zaG93Q2hlc3NCb2FyZCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN3aXRjaFNpZGUoKTogdm9pZCB7XHJcblx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnN3aXRjaFNpZGUoKTtcclxuXHRcdHN1Y2Nlc3MoJ1RhYmxlIHR1cm5lZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBuZXdHYW1lKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9uZXcnLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnJlc2V0U3RhdGVzKCk7XHJcblx0XHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIuc2hvd0NoZXNzQm9hcmQoKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSksICdOZXcgZ2FtZSBzdGFydGVkLicpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGxvYWRHYW1lKF86IEhUTUxJbnB1dEVsZW1lbnQsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG5cdFx0Y29uc3QgZmlsZXMgPSA8RmlsZUxpc3Q+dGFyZ2V0LmZpbGVzO1xyXG5cdFx0Y29uc3QgZmlsZSA9IDxGaWxlPmZpbGVzWzBdO1xyXG5cclxuXHRcdGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblx0XHRmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xyXG5cclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbG9hZCcsICdQT1NUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKGtuaWdodHNUYWxlRHRvOiBLbmlnaHRzVGFsZUR0bykgPT4ge1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLmxvYWRTdGF0ZShrbmlnaHRzVGFsZUR0byk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCBgJHtmaWxlLm5hbWV9IGhhcyBiZWVuIGxvYWRlZC5gLCBmb3JtRGF0YSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYmxhY2tBSUNoYW5nZWQoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5zZWxlY3RlZEJsYWNrUGxheWVyVHlwZSgpKSB7XHJcblx0XHRcdHRoaXMubW92ZUJsYWNrQUkodHJ1ZSk7IC8vIFBhc3MgY29ycmVjdCB2YWx1ZSBpbnN0ZWFkIG9mIHRydWVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBtb3ZlQmxhY2tBSShibGFja1R1cm46IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdGNvbnN0IGxldmVsID0gdGhpcy5zZWxlY3RlZEJsYWNrUGxheWVyVHlwZSgpO1xyXG5cdFx0aWYgKChsZXZlbCAhPT0gJ0h1bWFuJykgJiYgYmxhY2tUdXJuKSB7XHJcblx0XHRcdGNvbnN0IGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlID0gdGhpcy5zZWxlY3RlZEJsYWNrRmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGUoKTtcclxuXHRcdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKGBLbmlnaHRzVGFsZS9hcGkvZ2FtZS9haS9nZXRtb3ZlP2xldmVsU3RyPSR7bGV2ZWx9JmZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlU3RyPSR7ZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGV9YCwgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChtb3ZlUmVzdWx0OiBNb3ZlUmVzdWx0KSA9PiB7XHJcblx0XHRcdFx0aWYgKCFtb3ZlUmVzdWx0LmlzV2hpdGVUdXJuKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLm1vdmUobW92ZVJlc3VsdC5tb3ZlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRwdWJsaWMgd2hpdGVBSUNoYW5nZWQoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5zZWxlY3RlZFdoaXRlUGxheWVyVHlwZSgpKSB7XHJcblx0XHRcdHRoaXMubW92ZVdoaXRlQUkodHJ1ZSk7IC8vIFBhc3MgY29ycmVjdCB2YWx1ZSBpbnN0ZWFkIG9mIHRydWVcclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbW92ZVdoaXRlQUkod2hpdGVUdXJuOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRjb25zdCBsZXZlbCA9IHRoaXMuc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGUoKTtcclxuXHRcdGlmICgobGV2ZWwgIT09ICdIdW1hbicpICYmIHdoaXRlVHVybikge1xyXG5cdFx0XHRjb25zdCBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSA9IHRoaXMuc2VsZWN0ZWRXaGl0ZUZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlKCk7XHJcblx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvYWkvZ2V0bW92ZT9sZXZlbFN0cj0ke2xldmVsfSZmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZVN0cj0ke2ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlfWAsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygobW92ZVJlc3VsdDogTW92ZVJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdGlmIChtb3ZlUmVzdWx0LmlzV2hpdGVUdXJuKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLm1vdmUobW92ZVJlc3VsdC5tb3ZlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNhdmVHYW1lKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9zYXZlJywgJ1BPU1QnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygoYmFzZTY0U2F2ZUdhbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRjb25zdCBzYXZlR2FtZSA9IFVpbnQ4QXJyYXkuZnJvbShhdG9iKGJhc2U2NFNhdmVHYW1lKSwgYyA9PiBjLmNoYXJDb2RlQXQoMCkpO1xyXG5cdFx0XHRjb25zdCBmaWxlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzYXZlR2FtZV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScgfSk7XHJcblx0XHRcdGNvbnN0IGRvd25sb2FkVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblx0XHRcdGZpbGVMaW5rLmhyZWYgPSBkb3dubG9hZFVSTDtcclxuXHRcdFx0ZmlsZUxpbmsuZG93bmxvYWQgPSAnZ2FtZS5jZ3MnO1xyXG5cdFx0XHRmaWxlTGluay5jbGljaygpO1xyXG5cdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKGZpbGVMaW5rLmhyZWYpO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSwgJ1NhdmUgc3VjY2VlZGVkLicpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFBsYXllclR5cGVzKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9wbGF5ZXJ0eXBlcycsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygocGxheWVyVHlwZXM6IEFycmF5PG9iamVjdD4pID0+IHtcclxuXHRcdFx0Y29uc3QgcGxheWVyVHBlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhwbGF5ZXJUeXBlcykubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRwbGF5ZXJUcGVOYW1lcy5wdXNoKCg8b2JqZWN0PnBsYXllclR5cGVzW2ldKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0XHR0aGlzLnBsYXllclR5cGVzKHBsYXllclRwZU5hbWVzKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcygpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvZmlndXJldmFsdWVjYWxjdWxhdGlvbm1vZGVzJywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXM6IEFycmF5PG9iamVjdD4pID0+IHtcclxuXHRcdFx0Y29uc3QgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcykubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZU5hbWVzLnB1c2goKDxvYmplY3Q+ZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzW2ldKS50b1N0cmluZygpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcyhmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZU5hbWVzKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdH1cclxufVxyXG5cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQ2hlc3NHYW1lKCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7Il19