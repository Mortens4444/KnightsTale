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
            var chessGame = _this.self;
            if (window.performance && performance.navigation.type === performance.navigation.TYPE_RELOAD) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sQ0FBQyxNQUFNLFFBQVEsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxVQUFVLENBQUM7QUFDMUIsT0FBTyxLQUFLLE1BQU0sdUJBQXVCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFHM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRW5EO0lBY0M7UUFBQSxpQkFnQkM7UUExQk0sZ0JBQVcsR0FBRyxFQUFFLENBQUMsZUFBZSxDQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ25FLDRCQUF1QixHQUEwQixFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRW5FLGdDQUEyQixHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQVMsRUFBRSxDQUFDLENBQUM7UUFDN0QsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkYsNENBQXVDLEdBQTBCLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFLekYsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyw4QkFBOEIsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakIsSUFBTSxTQUFTLEdBQUcsS0FBSSxDQUFDLElBQUksQ0FBQztZQUM1QixJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLFVBQVUsQ0FBQyxXQUFXLEVBQUU7Z0JBQzdGLElBQU0sU0FBUyxHQUFHLElBQUksbUJBQW1CLENBQ3hDLFVBQUMsY0FBOEIsSUFBTyxTQUFTLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM5RixVQUFDLE9BQTZCLElBQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDeEUsQ0FBQztnQkFDRixhQUFhLENBQUMsT0FBTyxDQUFDLDhCQUE4QixFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzthQUM1RjtRQUNGLENBQUMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELGdDQUFZLEdBQVo7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDekMsQ0FBQztJQUVNLDhCQUFVLEdBQWpCO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3BDLEtBQUssQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLDJCQUFPLEdBQWQ7UUFBQSxpQkFLQztRQUpBLGFBQWEsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFLElBQUksbUJBQW1CLENBQUM7WUFDaEYsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ3JDLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN6QyxDQUFDLEVBQUUsVUFBQyxPQUE2QixJQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFTSw0QkFBUSxHQUFmLFVBQWdCLENBQW1CLEVBQUUsS0FBWTtRQUFqRCxpQkFXQztRQVZBLElBQU0sTUFBTSxHQUFxQixLQUFLLENBQUMsTUFBTSxDQUFDO1FBQzlDLElBQU0sS0FBSyxHQUFhLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBTSxJQUFJLEdBQVMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVCLElBQU0sUUFBUSxHQUFHLElBQUksUUFBUSxFQUFFLENBQUM7UUFDaEMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6QyxhQUFhLENBQUMsT0FBTyxDQUFDLDJCQUEyQixFQUFFLE1BQU0sRUFBRSxJQUFJLG1CQUFtQixDQUFDLFVBQUMsY0FBOEI7WUFDakgsS0FBSSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNsRCxDQUFDLEVBQUUsVUFBQyxPQUE2QixJQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxVQUFHLElBQUksQ0FBQyxJQUFJLHNCQUFtQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzFILENBQUM7SUFFTSxrQ0FBYyxHQUFyQjtRQUNDLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHFDQUFxQztTQUM3RDtJQUNGLENBQUM7SUFFTSwrQkFBVyxHQUFsQixVQUFtQixTQUFrQjtRQUFyQyxpQkFVSTtRQVRILElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3JDLElBQU0sMEJBQTBCLEdBQUcsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUM7WUFDbEYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxtREFBNEMsS0FBSyw0Q0FBa0MsMEJBQTBCLENBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQyxVQUFDLFVBQXNCO2dCQUM1TCxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtvQkFDNUIsS0FBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQzdDO1lBQ0YsQ0FBQyxFQUFFLFVBQUMsT0FBNkIsSUFBTyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RTtJQUNDLENBQUM7SUFFRyxrQ0FBYyxHQUFyQjtRQUNDLElBQUksSUFBSSxDQUFDLHVCQUF1QixFQUFFLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHFDQUFxQztTQUN2RDtJQUNSLENBQUM7SUFFTSwrQkFBVyxHQUFsQixVQUFtQixTQUFrQjtRQUFyQyxpQkFVQztRQVRBLElBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDLElBQUksU0FBUyxFQUFFO1lBQ3JDLElBQU0sMEJBQTBCLEdBQUcsSUFBSSxDQUFDLHVDQUF1QyxFQUFFLENBQUM7WUFDbEYsYUFBYSxDQUFDLE9BQU8sQ0FBQyxtREFBNEMsS0FBSyw0Q0FBa0MsMEJBQTBCLENBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxtQkFBbUIsQ0FBQyxVQUFDLFVBQXNCO2dCQUM1TCxJQUFJLFVBQVUsQ0FBQyxXQUFXLEVBQUU7b0JBQzNCLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM3QztZQUNGLENBQUMsRUFBRSxVQUFDLE9BQTZCLElBQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDOUU7SUFDRixDQUFDO0lBRU0sNEJBQVEsR0FBZjtRQUNDLGFBQWEsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxFQUFFLElBQUksbUJBQW1CLENBQUMsVUFBQyxjQUFzQjtZQUN6RyxJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7WUFDN0UsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQztZQUN4RSxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUM1QixRQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUMvQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsR0FBRyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFFLFVBQUMsT0FBNkIsSUFBTyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU0sa0NBQWMsR0FBckI7UUFBQSxpQkFRQztRQVBBLGFBQWEsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxFQUFFLElBQUksbUJBQW1CLENBQUMsVUFBQyxXQUEwQjtZQUNuSCxJQUFNLGNBQWMsR0FBa0IsRUFBRSxDQUFDO1lBQ3pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekQsY0FBYyxDQUFDLElBQUksQ0FBVSxXQUFXLENBQUMsQ0FBQyxDQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzthQUNoRDtZQUNWLEtBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxFQUFFLFVBQUMsT0FBNkIsSUFBTyxhQUFhLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRU0sa0RBQThCLEdBQXJDO1FBQUEsaUJBUUM7UUFQQSxhQUFhLENBQUMsT0FBTyxDQUFDLGtEQUFrRCxFQUFFLEtBQUssRUFBRSxJQUFJLG1CQUFtQixDQUFDLFVBQUMsMkJBQTBDO1lBQ25KLElBQU0sK0JBQStCLEdBQWtCLEVBQUUsQ0FBQztZQUMxRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDekUsK0JBQStCLENBQUMsSUFBSSxDQUFVLDJCQUEyQixDQUFDLENBQUMsQ0FBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDMUY7WUFDRCxLQUFJLENBQUMsMkJBQTJCLENBQUMsK0JBQStCLENBQUMsQ0FBQztRQUNuRSxDQUFDLEVBQUUsVUFBQyxPQUE2QixJQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFqSUQsSUFpSUM7O0FBRUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcbmltcG9ydCBrbyBmcm9tICdrbm9ja291dCc7XHJcbmltcG9ydCB0b2FzdCBmcm9tICdAYnJlbm9yb29zZXZlbHQvdG9hc3QnO1xyXG5cclxuaW1wb3J0IHsgQ2hlc3NCb2FyZEJ1aWxkZXIgfSBmcm9tICcuL0NoZXNzQm9hcmRCdWlsZGVyLmpzJztcclxuaW1wb3J0IHR5cGUgeyBLbmlnaHRzVGFsZUR0byB9IGZyb20gJy4vRHRvcy9LbmlnaHRzVGFsZUR0by5qcyc7XHJcbmltcG9ydCB0eXBlIHsgTW92ZVJlc3VsdCB9IGZyb20gJy4vRHRvcy9Nb3ZlUmVzdWx0LmpzJztcclxuaW1wb3J0IHsgUmVxdWVzdENhbGxiYWNrc0R0byB9IGZyb20gJy4vRHRvcy9SZXF1ZXN0Q2FsbGJhY2tzRHRvLmpzJztcclxuaW1wb3J0IHsgUmVxdWVzdFNlbmRlciB9IGZyb20gJy4vUmVxdWVzdFNlbmRlci5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NHYW1lIHtcclxuXHJcblx0cHVibGljIGNoZXNzQm9hcmRCdWlsZGVyOiBDaGVzc0JvYXJkQnVpbGRlcjtcclxuXHJcblx0cHVibGljIHBsYXllclR5cGVzID0ga28ub2JzZXJ2YWJsZUFycmF5PHN0cmluZz4oW10pO1xyXG5cdHB1YmxpYyBzZWxlY3RlZEJsYWNrUGxheWVyVHlwZToga28uT2JzZXJ2YWJsZTxzdHJpbmc+ID0ga28ub2JzZXJ2YWJsZSgnJyk7XHJcblx0cHVibGljIHNlbGVjdGVkV2hpdGVQbGF5ZXJUeXBlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHJcblx0cHVibGljIGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcyA9IGtvLm9ic2VydmFibGVBcnJheTxzdHJpbmc+KFtdKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRCbGFja0ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHRwdWJsaWMgc2VsZWN0ZWRXaGl0ZUZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlOiBrby5PYnNlcnZhYmxlPHN0cmluZz4gPSBrby5vYnNlcnZhYmxlKCcnKTtcclxuXHJcblx0cHJpdmF0ZSByZWFkb25seSBzZWxmOiBDaGVzc0dhbWU7XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIgPSBuZXcgQ2hlc3NCb2FyZEJ1aWxkZXIodGhpcyk7XHJcblx0XHR0aGlzLmdldFBsYXllclR5cGVzKCk7XHJcblx0XHR0aGlzLmdldEZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcygpO1xyXG5cdFx0dGhpcy5zZWxmID0gdGhpcztcclxuXHJcblx0XHQkKGRvY3VtZW50KS5yZWFkeSgoKSA9PiB7XHJcblx0XHRcdGNvbnN0IGNoZXNzR2FtZSA9IHRoaXMuc2VsZjtcclxuXHRcdFx0aWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiBwZXJmb3JtYW5jZS5uYXZpZ2F0aW9uLnR5cGUgPT09IHBlcmZvcm1hbmNlLm5hdmlnYXRpb24uVFlQRV9SRUxPQUQpIHtcclxuXHRcdFx0XHRjb25zdCBjYWxsYmFja3MgPSBuZXcgUmVxdWVzdENhbGxiYWNrc0R0byhcclxuXHRcdFx0XHRcdChrbmlnaHRzVGFsZUR0bzogS25pZ2h0c1RhbGVEdG8pID0+IHsgY2hlc3NHYW1lLmNoZXNzQm9hcmRCdWlsZGVyLmxvYWRTdGF0ZShrbmlnaHRzVGFsZUR0byk7IH0sXHJcblx0XHRcdFx0XHQocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH1cclxuXHRcdFx0XHQpO1xyXG5cdFx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvcmVmcmVzaCcsICdQT1NUJywgY2FsbGJhY2tzLCAnUGFnZSByZWZyZXNoZWQuJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmVmcmVzaEJvYXJkKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zaG93Q2hlc3NCb2FyZCgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN3aXRjaFNpZGUoKTogdm9pZCB7XHJcblx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnN3aXRjaFNpZGUoKTtcclxuXHRcdHRvYXN0LnN1Y2Nlc3MoJ1RhYmxlIHR1cm5lZC4nKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBuZXdHYW1lKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9uZXcnLCAnR0VUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnJlc2V0U3RhdGVzKCk7XHJcblx0XHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIuc2hvd0NoZXNzQm9hcmQoKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSksICdOZXcgZ2FtZSBzdGFydGVkLicpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGxvYWRHYW1lKF86IEhUTUxJbnB1dEVsZW1lbnQsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG5cdFx0Y29uc3QgZmlsZXMgPSA8RmlsZUxpc3Q+dGFyZ2V0LmZpbGVzO1xyXG5cdFx0Y29uc3QgZmlsZSA9IDxGaWxlPmZpbGVzWzBdO1xyXG5cclxuXHRcdGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblx0XHRmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xyXG5cclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbG9hZCcsICdQT1NUJywgbmV3IFJlcXVlc3RDYWxsYmFja3NEdG8oKGtuaWdodHNUYWxlRHRvOiBLbmlnaHRzVGFsZUR0bykgPT4ge1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLmxvYWRTdGF0ZShrbmlnaHRzVGFsZUR0byk7XHJcblx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCBgJHtmaWxlLm5hbWV9IGhhcyBiZWVuIGxvYWRlZC5gLCBmb3JtRGF0YSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgYmxhY2tBSUNoYW5nZWQoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5zZWxlY3RlZEJsYWNrUGxheWVyVHlwZSgpKSB7XHJcblx0XHRcdHRoaXMubW92ZUJsYWNrQUkodHJ1ZSk7IC8vIFBhc3MgY29ycmVjdCB2YWx1ZSBpbnN0ZWFkIG9mIHRydWVcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBtb3ZlQmxhY2tBSShibGFja1R1cm46IGJvb2xlYW4pOiB2b2lkIHtcclxuXHRcdGNvbnN0IGxldmVsID0gdGhpcy5zZWxlY3RlZEJsYWNrUGxheWVyVHlwZSgpO1xyXG5cdFx0aWYgKChsZXZlbCAhPT0gJ0h1bWFuJykgJiYgYmxhY2tUdXJuKSB7XHJcblx0XHRcdGNvbnN0IGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlID0gdGhpcy5zZWxlY3RlZEJsYWNrRmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGUoKTtcclxuXHRcdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKGBLbmlnaHRzVGFsZS9hcGkvZ2FtZS9haS9nZXRtb3ZlP2xldmVsU3RyPSR7bGV2ZWx9JmZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlU3RyPSR7ZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGV9YCwgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChtb3ZlUmVzdWx0OiBNb3ZlUmVzdWx0KSA9PiB7XHJcblx0XHRcdFx0aWYgKCFtb3ZlUmVzdWx0LmlzV2hpdGVUdXJuKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLm1vdmUobW92ZVJlc3VsdC5tb3ZlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdFx0fVxyXG4gICAgfVxyXG5cclxuXHRwdWJsaWMgd2hpdGVBSUNoYW5nZWQoKTogdm9pZCB7XHJcblx0XHRpZiAodGhpcy5zZWxlY3RlZFdoaXRlUGxheWVyVHlwZSgpKSB7XHJcblx0XHRcdHRoaXMubW92ZVdoaXRlQUkodHJ1ZSk7IC8vIFBhc3MgY29ycmVjdCB2YWx1ZSBpbnN0ZWFkIG9mIHRydWVcclxuICAgICAgICB9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbW92ZVdoaXRlQUkod2hpdGVUdXJuOiBib29sZWFuKTogdm9pZCB7XHJcblx0XHRjb25zdCBsZXZlbCA9IHRoaXMuc2VsZWN0ZWRXaGl0ZVBsYXllclR5cGUoKTtcclxuXHRcdGlmICgobGV2ZWwgIT09ICdIdW1hbicpICYmIHdoaXRlVHVybikge1xyXG5cdFx0XHRjb25zdCBmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZSA9IHRoaXMuc2VsZWN0ZWRXaGl0ZUZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlKCk7XHJcblx0XHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvYWkvZ2V0bW92ZT9sZXZlbFN0cj0ke2xldmVsfSZmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZVN0cj0ke2ZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlfWAsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygobW92ZVJlc3VsdDogTW92ZVJlc3VsdCkgPT4ge1xyXG5cdFx0XHRcdGlmIChtb3ZlUmVzdWx0LmlzV2hpdGVUdXJuKSB7XHJcblx0XHRcdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLm1vdmUobW92ZVJlc3VsdC5tb3ZlKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHVibGljIHNhdmVHYW1lKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9zYXZlJywgJ1BPU1QnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygoYmFzZTY0U2F2ZUdhbWU6IHN0cmluZykgPT4ge1xyXG5cdFx0XHRjb25zdCBzYXZlR2FtZSA9IFVpbnQ4QXJyYXkuZnJvbShhdG9iKGJhc2U2NFNhdmVHYW1lKSwgYyA9PiBjLmNoYXJDb2RlQXQoMCkpO1xyXG5cdFx0XHRjb25zdCBmaWxlTGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuXHRcdFx0Y29uc3QgYmxvYiA9IG5ldyBCbG9iKFtzYXZlR2FtZV0sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScgfSk7XHJcblx0XHRcdGNvbnN0IGRvd25sb2FkVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblx0XHRcdGZpbGVMaW5rLmhyZWYgPSBkb3dubG9hZFVSTDtcclxuXHRcdFx0ZmlsZUxpbmsuZG93bmxvYWQgPSAnZ2FtZS5jZ3MnO1xyXG5cdFx0XHRmaWxlTGluay5jbGljaygpO1xyXG5cdFx0XHRVUkwucmV2b2tlT2JqZWN0VVJMKGZpbGVMaW5rLmhyZWYpO1xyXG5cdFx0fSwgKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KSA9PiB7IFJlcXVlc3RTZW5kZXIuc2hvd0Vycm9yKHJlcXVlc3QpOyB9KSwgJ1NhdmUgc3VjY2VlZGVkLicpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldFBsYXllclR5cGVzKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9wbGF5ZXJ0eXBlcycsICdHRVQnLCBuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygocGxheWVyVHlwZXM6IEFycmF5PG9iamVjdD4pID0+IHtcclxuXHRcdFx0Y29uc3QgcGxheWVyVHBlTmFtZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBPYmplY3Qua2V5cyhwbGF5ZXJUeXBlcykubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRwbGF5ZXJUcGVOYW1lcy5wdXNoKCg8b2JqZWN0PnBsYXllclR5cGVzW2ldKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgfVxyXG5cdFx0XHR0aGlzLnBsYXllclR5cGVzKHBsYXllclRwZU5hbWVzKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGdldEZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcygpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvZmlndXJldmFsdWVjYWxjdWxhdGlvbm1vZGVzJywgJ0dFVCcsIG5ldyBSZXF1ZXN0Q2FsbGJhY2tzRHRvKChmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZXM6IEFycmF5PG9iamVjdD4pID0+IHtcclxuXHRcdFx0Y29uc3QgZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVOYW1lczogQXJyYXk8c3RyaW5nPiA9IFtdO1xyXG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IE9iamVjdC5rZXlzKGZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcykubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZU5hbWVzLnB1c2goKDxvYmplY3Q+ZmlndXJlVmFsdWVDYWxjdWxhdGlvbk1vZGVzW2ldKS50b1N0cmluZygpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHR0aGlzLmZpZ3VyZVZhbHVlQ2FsY3VsYXRpb25Nb2RlcyhmaWd1cmVWYWx1ZUNhbGN1bGF0aW9uTW9kZU5hbWVzKTtcclxuXHRcdH0sIChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4geyBSZXF1ZXN0U2VuZGVyLnNob3dFcnJvcihyZXF1ZXN0KTsgfSkpO1xyXG5cdH1cclxufVxyXG5cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQ2hlc3NHYW1lKCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7Il19