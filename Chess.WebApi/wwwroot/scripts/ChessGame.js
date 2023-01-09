import { ChessBoardBuilder } from './ChessBoardBuilder.js';
import { RequestCallbacksDto } from './Dtos/RequestCallbacksDto.js';
import { RequestSender } from './RequestSender.js';
import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';
var ChessGame = /** @class */ (function () {
    function ChessGame() {
        this.playerTypes = ko.observableArray([]);
        this.selectedBlackPlayerType = ko.observable('');
        this.selectedWhitePlayerType = ko.observable('');
        this.figureValueCalculationModes = ko.observableArray([]);
        this.selectedBlackFigureValueCalculationMode = ko.observable('');
        this.selectedWhiteFigureValueCalculationMode = ko.observable('');
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
            var level = this.selectedBlackPlayerType();
            if (level !== 'Human') {
                var figureValueCalculationMode = this.selectedBlackFigureValueCalculationMode();
                RequestSender.execute("KnightsTale/api/game/ai/getmove?levelStr=".concat(level, "&figureValueCalculationModeStr=").concat(figureValueCalculationMode), 'GET', new RequestCallbacksDto(function (moveResult) {
                    if (!moveResult.isWhiteTurn) {
                        _this.chessBoardBuilder.move(moveResult.move);
                    }
                }, function (request) { RequestSender.showError(request); }));
            }
        }
    };
    ChessGame.prototype.whiteAIChanged = function () {
        var _this = this;
        if (this.selectedWhitePlayerType()) {
            var level = this.selectedWhitePlayerType();
            if (level !== 'Human') {
                var figureValueCalculationMode = this.selectedWhiteFigureValueCalculationMode();
                RequestSender.execute("KnightsTale/api/game/ai/getmove?levelStr=".concat(level, "&figureValueCalculationModeStr=").concat(figureValueCalculationMode), 'GET', new RequestCallbacksDto(function (moveResult) {
                    if (moveResult.isWhiteTurn) {
                        _this.chessBoardBuilder.move(moveResult.move);
                    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUNuRCxPQUFPLEtBQUssS0FBSyxNQUFNLCtDQUErQyxDQUFDO0FBRXZFO0lBWUM7UUFSTyxnQkFBVyxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDN0MsNEJBQXVCLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsNEJBQXVCLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbkUsZ0NBQTJCLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBUyxFQUFFLENBQUMsQ0FBQztRQUM3RCw0Q0FBdUMsR0FBMEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRiw0Q0FBdUMsR0FBMEIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUd6RixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxpQkFBaUIsRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsOEJBQThCLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDcEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRU0sMkJBQU8sR0FBZDtRQUFBLGlCQUtDO1FBSkEsYUFBYSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxLQUFLLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQztZQUNoRixLQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDckMsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLENBQUMsRUFBRSxVQUFDLE9BQTZCLElBQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLG1CQUFtQixDQUFDLENBQUM7SUFDcEcsQ0FBQztJQUVNLDRCQUFRLEdBQWYsVUFBZ0IsQ0FBbUIsRUFBRSxLQUFZO1FBQWpELGlCQVdDO1FBVkEsSUFBTSxNQUFNLEdBQXFCLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDOUMsSUFBTSxLQUFLLEdBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNyQyxJQUFNLElBQUksR0FBUyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFNUIsSUFBTSxRQUFRLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztRQUNoQyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXpDLGFBQWEsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxFQUFFLElBQUksbUJBQW1CLENBQUMsVUFBQyxjQUE4QjtZQUNqSCxLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsRUFBRSxVQUFDLE9BQTZCLElBQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFVBQUcsSUFBSSxDQUFDLElBQUksc0JBQW1CLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDMUgsQ0FBQztJQUVNLGtDQUFjLEdBQXJCO1FBQUEsaUJBWUM7UUFYQSxJQUFJLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxFQUFFO1lBQ25DLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQzdDLElBQUksS0FBSyxLQUFLLE9BQU8sRUFBRTtnQkFDdEIsSUFBTSwwQkFBMEIsR0FBRyxJQUFJLENBQUMsdUNBQXVDLEVBQUUsQ0FBQztnQkFDbEYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxtREFBNEMsS0FBSyw0Q0FBa0MsMEJBQTBCLENBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQyxVQUFDLFVBQXNCO29CQUM1TCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTt3QkFDNUIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzlCO2dCQUNqQixDQUFDLEVBQUUsVUFBQyxPQUE2QixJQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlFO1NBQ0Q7SUFDRixDQUFDO0lBRU0sa0NBQWMsR0FBckI7UUFBQSxpQkFZQztRQVhBLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDbkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7WUFDN0MsSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFO2dCQUN0QixJQUFNLDBCQUEwQixHQUFHLElBQUksQ0FBQyx1Q0FBdUMsRUFBRSxDQUFDO2dCQUNsRixhQUFhLENBQUMsT0FBTyxDQUFDLG1EQUE0QyxLQUFLLDRDQUFrQywwQkFBMEIsQ0FBRSxFQUFFLEtBQUssRUFBRSxJQUFJLG1CQUFtQixDQUFDLFVBQUMsVUFBc0I7b0JBQzVMLElBQUksVUFBVSxDQUFDLFdBQVcsRUFBRTt3QkFDM0IsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzdDO2dCQUNGLENBQUMsRUFBRSxVQUFDLE9BQTZCLElBQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDOUU7U0FDSztJQUNSLENBQUM7SUFFTSw0QkFBUSxHQUFmO1FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsRUFBRSxNQUFNLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQyxVQUFDLGNBQXNCO1lBQ3pHLElBQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztZQUM3RSxJQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLElBQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsMEJBQTBCLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELFFBQVEsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO1lBQzVCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQy9CLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNqQixHQUFHLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDLEVBQUUsVUFBQyxPQUE2QixJQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFTSxrQ0FBYyxHQUFyQjtRQUFBLGlCQVFDO1FBUEEsYUFBYSxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQyxVQUFDLFdBQTBCO1lBQ25ILElBQU0sY0FBYyxHQUFrQixFQUFFLENBQUM7WUFDekMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6RCxjQUFjLENBQUMsSUFBSSxDQUFVLFdBQVcsQ0FBQyxDQUFDLENBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ2hEO1lBQ1YsS0FBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUUsVUFBQyxPQUE2QixJQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTSxrREFBOEIsR0FBckM7UUFBQSxpQkFRQztRQVBBLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0RBQWtELEVBQUUsS0FBSyxFQUFFLElBQUksbUJBQW1CLENBQUMsVUFBQywyQkFBMEM7WUFDbkosSUFBTSwrQkFBK0IsR0FBa0IsRUFBRSxDQUFDO1lBQzFELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN6RSwrQkFBK0IsQ0FBQyxJQUFJLENBQVUsMkJBQTJCLENBQUMsQ0FBQyxDQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUMxRjtZQUNELEtBQUksQ0FBQywyQkFBMkIsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ25FLENBQUMsRUFBRSxVQUFDLE9BQTZCLElBQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQXZHRCxJQXVHQzs7QUFFRCxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksU0FBUyxFQUFFLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hlc3NCb2FyZEJ1aWxkZXIgfSBmcm9tICcuL0NoZXNzQm9hcmRCdWlsZGVyLmpzJztcclxuaW1wb3J0IHR5cGUgeyBLbmlnaHRzVGFsZUR0byB9IGZyb20gJy4vRHRvcy9LbmlnaHRzVGFsZUR0by5qcyc7XHJcbmltcG9ydCB0eXBlIHsgTW92ZVJlc3VsdCB9IGZyb20gJy4vRHRvcy9Nb3ZlUmVzdWx0LmpzJztcclxuaW1wb3J0IHsgUmVxdWVzdENhbGxiYWNrc0R0byB9IGZyb20gJy4vRHRvcy9SZXF1ZXN0Q2FsbGJhY2tzRHRvLmpzJztcclxuaW1wb3J0IHsgUmVxdWVzdFNlbmRlciB9IGZyb20gJy4vUmVxdWVzdFNlbmRlci5qcyc7XHJcbmltcG9ydCAqIGFzIHRvYXN0IGZyb20gJy4uL2xpYi9AYnJlbm9yb29zZXZlbHQvdG9hc3QvbGliL2VzbS90b2FzdC5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NHYW1lIHtcclxuXHJcblx0cHVibGljIGNoZXNzQm9hcmRCdWlsZGVyOiBDaGVzc0JvYXJkQnVpbGRlcjtcclxuXHJcblx0cHVibGljIHBsYXllclR5cGVzID0ga28ub2JzZXJ2YWJsZUFycmF5PHN0cmluZz4oW10pO1xyXG5cdHB1YmxpYyBzZWxlY3RlZEJsYWNrUGxheWVyVHlwZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0cHVibGljIHNlbGVjdGVkV2hpdGVQbGF5ZXJUeXBlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHJcblx0cHVibGljIGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcyA9IGtvLm9ic2VydmFibGVBcnJheTxzdHJpbmc+KFtdKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRCbGFja0ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRXaGl0ZUZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlciA9IG5ldyBDaGVzc0JvYXJkQnVpbGRlcigpO1xyXG5cdFx0dGhpcy5nZXRQbGF5ZXJUeXBlcygpO1xyXG5cdFx0dGhpcy5nZXRGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXMoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzd2l0Y2hTaWRlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zd2l0Y2hTaWRlKCk7XHJcblx0XHR0b2FzdC5zdWNjZXNzKCdUYWJsZSB0dXJuZWQuJyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbmV3R2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbmV3JywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKCgpID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5yZXNldFN0YXRlcygpO1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnNob3dDaGVzc0JvYXJkKCk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCAnTmV3IGdhbWUgc3RhcnRlZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBsb2FkR2FtZShfOiBIVE1MSW5wdXRFbGVtZW50LCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuXHRcdGNvbnN0IGZpbGVzID0gPEZpbGVMaXN0PnRhcmdldC5maWxlcztcclxuXHRcdGNvbnN0IGZpbGUgPSA8RmlsZT5maWxlc1swXTtcclxuXHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuXHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL2xvYWQnLCAnUE9TVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChrbmlnaHRzVGFsZUR0bzogS25pZ2h0c1RhbGVEdG8pID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSwgYCR7ZmlsZS5uYW1lfSBoYXMgYmVlbiBsb2FkZWQuYCwgZm9ybURhdGEpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGJsYWNrQUlDaGFuZ2VkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRCbGFja1BsYXllclR5cGUoKSkge1xyXG5cdFx0XHRjb25zdCBsZXZlbCA9IHRoaXMuc2VsZWN0ZWRCbGFja1BsYXllclR5cGUoKTtcclxuXHRcdFx0aWYgKGxldmVsICE9PSAnSHVtYW4nKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGUgPSB0aGlzLnNlbGVjdGVkQmxhY2tGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSgpO1xyXG5cdFx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvYWkvZ2V0bW92ZT9sZXZlbFN0cj0ke2xldmVsfSZmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZVN0cj0ke2ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlfWAsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygobW92ZVJlc3VsdDogTW92ZVJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKCFtb3ZlUmVzdWx0LmlzV2hpdGVUdXJuKSB7XHJcblx0XHRcdFx0XHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIubW92ZShtb3ZlUmVzdWx0Lm1vdmUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHRcdFx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHdoaXRlQUlDaGFuZ2VkKCk6IHZvaWQge1xyXG5cdFx0aWYgKHRoaXMuc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGUoKSkge1xyXG5cdFx0XHRjb25zdCBsZXZlbCA9IHRoaXMuc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGUoKTtcclxuXHRcdFx0aWYgKGxldmVsICE9PSAnSHVtYW4nKSB7XHJcblx0XHRcdFx0Y29uc3QgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGUgPSB0aGlzLnNlbGVjdGVkV2hpdGVGaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSgpO1xyXG5cdFx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvYWkvZ2V0bW92ZT9sZXZlbFN0cj0ke2xldmVsfSZmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZVN0cj0ke2ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlfWAsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygobW92ZVJlc3VsdDogTW92ZVJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKG1vdmVSZXN1bHQuaXNXaGl0ZVR1cm4pIHtcclxuXHRcdFx0XHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5tb3ZlKG1vdmVSZXN1bHQubW92ZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSk7XHJcblx0XHRcdH1cclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2F2ZUdhbWUoKTogdm9pZCB7XHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL3NhdmUnLCAnUE9TVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChiYXNlNjRTYXZlR2FtZTogc3RyaW5nKSA9PiB7XHJcblx0XHRcdGNvbnN0IHNhdmVHYW1lID0gVWludDhBcnJheS5mcm9tKGF0b2IoYmFzZTY0U2F2ZUdhbWUpLCBjID0+IGMuY2hhckNvZGVBdCgwKSk7XHJcblx0XHRcdGNvbnN0IGZpbGVMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdFx0XHRjb25zdCBibG9iID0gbmV3IEJsb2IoW3NhdmVHYW1lXSwgeyB0eXBlOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyB9KTtcclxuXHRcdFx0Y29uc3QgZG93bmxvYWRVUkwgPSB3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHRcdFx0ZmlsZUxpbmsuaHJlZiA9IGRvd25sb2FkVVJMO1xyXG5cdFx0XHRmaWxlTGluay5kb3dubG9hZCA9ICdnYW1lLmNncyc7XHJcblx0XHRcdGZpbGVMaW5rLmNsaWNrKCk7XHJcblx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoZmlsZUxpbmsuaHJlZik7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCAnU2F2ZSBzdWNjZWVkZWQuJyk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0UGxheWVyVHlwZXMoKTogdm9pZCB7XHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL3BsYXllcnR5cGVzJywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChwbGF5ZXJUeXBlczogQXJyYXk8b2JqZWN0PikgPT4ge1xyXG5cdFx0XHRjb25zdCBwbGF5ZXJUcGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKHBsYXllclR5cGVzKS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdHBsYXllclRwZU5hbWVzLnB1c2goKDxvYmplY3Q+cGxheWVyVHlwZXNbaV0pLnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICB9XHJcblx0XHRcdHRoaXMucGxheWVyVHlwZXMocGxheWVyVHBlTmFtZXMpO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgZ2V0RmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9maWd1cmV2YWx1ZWNhbGN1bGF0aW9ubW9kZXMnLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlczogQXJyYXk8b2JqZWN0PikgPT4ge1xyXG5cdFx0XHRjb25zdCBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZU5hbWVzOiBBcnJheTxzdHJpbmc+ID0gW107XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgT2JqZWN0LmtleXMoZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzKS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlTmFtZXMucHVzaCgoPG9iamVjdD5maWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXNbaV0pLnRvU3RyaW5nKCkpO1xyXG5cdFx0XHR9XHJcblx0XHRcdHRoaXMuZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzKGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlTmFtZXMpO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSk7XHJcblx0fVxyXG59XHJcblxyXG5rby5hcHBseUJpbmRpbmdzKG5ldyBDaGVzc0dhbWUoKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTsiXX0=