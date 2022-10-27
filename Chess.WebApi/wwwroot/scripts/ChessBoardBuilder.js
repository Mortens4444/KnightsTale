import { DomManipulator } from './DomManipulator.js';
import { RequestSender } from './RequestSender.js';
import { Square } from './Square.js';
var a = 'A';
var h = 'H';
var table = 'table';
var th = 'th';
var tr = 'tr';
var td = 'td';
var tc = 'tc';
var id = 'id';
var selected = 'selected';
var InitialState = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];
var State = [
    ['♜', '♞', '♝', '♛', '♚', '♝', '♞', '♜'],
    ['♟', '♟', '♟', '♟', '♟', '♟', '♟', '♟'],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
    ['♙', '♙', '♙', '♙', '♙', '♙', '♙', '♙'],
    ['♖', '♘', '♗', '♕', '♔', '♗', '♘', '♖']
];
var ChessBoardBuilder = /** @class */ (function () {
    function ChessBoardBuilder() {
        this.domManipulator = new DomManipulator();
        this.moveFrom = null;
        this.whiteOnTopWhenShow = false;
        this.showChessBoard();
    }
    ChessBoardBuilder.prototype.createChessBoard = function () {
        var body = document.getElementsByTagName('body')[0];
        var board = this.domManipulator.createElement(table, body);
        board === null || board === void 0 ? void 0 : board.setAttribute('class', 'chess-board');
        var tableBody = this.domManipulator.createElement('tbody', board);
        this.createTableColumns(tableBody);
        this.createSquares(tableBody);
    };
    ChessBoardBuilder.prototype.createTableColumns = function (tableBody) {
        var header = this.domManipulator.createElement(tr, tableBody);
        this.domManipulator.createElement(th, header);
        for (var columnIndex = 0; columnIndex < 8; columnIndex++) {
            this.createTableHeaderCell(header, tc + columnIndex + 1, this.getColumnText(columnIndex));
        }
    };
    ChessBoardBuilder.prototype.createTableHeaderCell = function (parent, idValue, text) {
        var header = this.domManipulator.createElement(th, parent);
        header.setAttribute(id, idValue);
        header.textContent = text;
    };
    ChessBoardBuilder.prototype.createTableRank = function (tableBody, rankNumber) {
        var rank = this.domManipulator.createElement(tr, tableBody);
        this.createTableHeaderCell(rank, tr + rankNumber, rankNumber.toString());
        return rank;
    };
    ChessBoardBuilder.prototype.createSquares = function (tableBody) {
        for (var rankIndex = 0; rankIndex < 8; rankIndex++) {
            var rankNumber = this.whiteOnTopWhenShow ? rankIndex + 1 : 8 - rankIndex;
            var rank = this.createTableRank(tableBody, rankNumber);
            for (var columnIndex = 0; columnIndex < 8; columnIndex++) {
                var square = this.domManipulator.createElement(td, rank);
                square.setAttribute(id, this.getColumnText(columnIndex) + rankNumber);
                square.onclick = this.squareOnClick.bind(this);
                square.setAttribute('class', (rankIndex + columnIndex) % 2 == 1 ? 'dark' : 'light');
                square.textContent = this.isWhiteOnTopInStateRepresentation() ?
                    this.getState(rankNumber - 1, this.whiteOnTopWhenShow ? columnIndex : 7 - columnIndex) :
                    this.getState(this.whiteOnTopWhenShow ? 7 - rankIndex : rankIndex, this.whiteOnTopWhenShow ? 7 - columnIndex : columnIndex);
            }
        }
    };
    ChessBoardBuilder.prototype.squareOnClick = function (event) {
        var _this = this;
        if (this.moveFrom == null) {
            this.moveFrom = event.srcElement;
            this.moveFrom.classList.add(selected);
        }
        else {
            this.moveFrom.classList.remove(selected);
            var toSquare_1 = this.getSquare(event.srcElement);
            var fromSquare_1 = this.getSquare(this.moveFrom);
            RequestSender.execute('KnightsTale/api/game/move', 'PUT', function () {
                _this.setState(toSquare_1.rankIndex, toSquare_1.columnIndex, _this.getState(fromSquare_1.rankIndex, fromSquare_1.columnIndex));
                _this.setState(fromSquare_1.rankIndex, fromSquare_1.columnIndex, ' ');
                _this.showChessBoard();
            }, JSON.stringify(this.getMove(fromSquare_1, toSquare_1)), 'application/json');
            this.moveFrom = null;
        }
    };
    ChessBoardBuilder.prototype.getMove = function (fromSquare, toSquare) {
        return fromSquare.toString(this.whiteOnTopWhenShow) + toSquare.toString(this.whiteOnTopWhenShow);
    };
    ChessBoardBuilder.prototype.getSquare = function (square) {
        var rank = parseInt(square.id[1]);
        var column = square.id.charCodeAt(0);
        return this.isWhiteOnTopInStateRepresentation() ?
            new Square(h.charCodeAt(0) - column, rank - 1) :
            new Square(column - a.charCodeAt(0), 8 - rank);
    };
    ChessBoardBuilder.prototype.charShift = function (ch, shift) {
        return String.fromCharCode(ch.charCodeAt(0) + shift);
    };
    ChessBoardBuilder.prototype.getColumnText = function (columnIndex) {
        return this.whiteOnTopWhenShow ? this.charShift(h, -columnIndex) : this.charShift(a, columnIndex);
    };
    ChessBoardBuilder.prototype.isWhiteOnTopInStateRepresentation = function () {
        return InitialState[0][0] == '♖';
    };
    ChessBoardBuilder.prototype.getState = function (rankIndex, columnIndex) {
        return State[rankIndex][columnIndex];
    };
    ChessBoardBuilder.prototype.setState = function (rankIndex, columnIndex, value) {
        State[rankIndex][columnIndex] = value;
    };
    ChessBoardBuilder.prototype.resetStates = function () {
        for (var rankIndex = 0; rankIndex < 8; rankIndex++) {
            State[rankIndex] = InitialState[rankIndex].map(function (x) { return x; });
        }
    };
    ChessBoardBuilder.prototype.showChessBoard = function (whiteOnTopWhenShow) {
        if (whiteOnTopWhenShow === void 0) { whiteOnTopWhenShow = undefined; }
        if (whiteOnTopWhenShow !== undefined) {
            this.whiteOnTopWhenShow = whiteOnTopWhenShow;
        }
        var board = document.getElementsByTagName(table)[0];
        if (board) {
            board.remove();
            this.moveFrom = null;
        }
        this.createChessBoard();
    };
    ChessBoardBuilder.prototype.switchSide = function () {
        this.showChessBoard(!this.whiteOnTopWhenShow);
    };
    return ChessBoardBuilder;
}());
export { ChessBoardBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NCb2FyZEJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDaGVzc0JvYXJkQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckMsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2QsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2QsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQ3RCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQztBQUNoQixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDaEIsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQztBQUNoQixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDaEIsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBRTVCLElBQU0sWUFBWSxHQUF5QjtJQUMxQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0NBQ3hDLENBQUM7QUFFRixJQUFNLEtBQUssR0FBeUI7SUFDbkMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztDQUN4QyxDQUFDO0FBRUY7SUFNQztRQUNDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN2QixDQUFDO0lBRU8sNENBQWdCLEdBQXhCO1FBQ0MsSUFBTSxJQUFJLEdBQWdDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRixJQUFNLEtBQUssR0FBK0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFlLElBQUksQ0FBQyxDQUFDO1FBQ3RJLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxZQUFZLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQzVDLElBQU0sU0FBUyxHQUFnQixJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQWUsS0FBSyxDQUFDLENBQUM7UUFFOUYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVPLDhDQUFrQixHQUExQixVQUEyQixTQUFzQjtRQUNoRCxJQUFNLE1BQU0sR0FBZ0IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdFLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QyxLQUFLLElBQUksV0FBVyxHQUFHLENBQUMsRUFBRSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFO1lBQ3pELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLFdBQVcsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1NBQzFGO0lBQ0YsQ0FBQztJQUVPLGlEQUFxQixHQUE3QixVQUE4QixNQUFtQixFQUFFLE9BQWUsRUFBRSxJQUFZO1FBQy9FLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM3RCxNQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztJQUMzQixDQUFDO0lBRU8sMkNBQWUsR0FBdkIsVUFBd0IsU0FBc0IsRUFBRSxVQUFrQjtRQUNqRSxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsVUFBVSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3pFLE9BQU8sSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUVPLHlDQUFhLEdBQXJCLFVBQXNCLFNBQXNCO1FBQzNDLEtBQUssSUFBSSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsR0FBRyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUU7WUFDbkQsSUFBTSxVQUFVLEdBQVcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDO1lBQ25GLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXpELEtBQUssSUFBSSxXQUFXLEdBQUcsQ0FBQyxFQUFFLFdBQVcsR0FBRyxDQUFDLEVBQUUsV0FBVyxFQUFFLEVBQUU7Z0JBQ3pELElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFDdEUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEYsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsaUNBQWlDLEVBQUUsQ0FBQyxDQUFDO29CQUM5RCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO29CQUN4RixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUM7YUFDN0g7U0FDRDtJQUNGLENBQUM7SUFFTyx5Q0FBYSxHQUFyQixVQUFzQixLQUFpQjtRQUF2QyxpQkFpQkM7UUFoQkEsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsUUFBUSxHQUFnQixLQUFLLENBQUMsVUFBVSxDQUFDO1lBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QzthQUFNO1lBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pDLElBQU0sVUFBUSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQWMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3ZFLElBQU0sWUFBVSxHQUFXLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRXpELGFBQWEsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLEVBQUUsS0FBSyxFQUFFO2dCQUN6RCxLQUFJLENBQUMsUUFBUSxDQUFDLFVBQVEsQ0FBQyxTQUFTLEVBQUUsVUFBUSxDQUFDLFdBQVcsRUFBRSxLQUFJLENBQUMsUUFBUSxDQUFDLFlBQVUsQ0FBQyxTQUFTLEVBQUUsWUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JILEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBVSxDQUFDLFNBQVMsRUFBRSxZQUFVLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUNqRSxLQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDdkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFVLEVBQUUsVUFBUSxDQUFDLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBRTNFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO0lBQ0YsQ0FBQztJQUVPLG1DQUFPLEdBQWYsVUFBZ0IsVUFBa0IsRUFBRSxRQUFnQjtRQUNuRCxPQUFPLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNsRyxDQUFDO0lBRU8scUNBQVMsR0FBakIsVUFBa0IsTUFBbUI7UUFDcEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFTLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxJQUFNLE1BQU0sR0FBRyxNQUFNLENBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QyxPQUFPLElBQUksQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUM7WUFDaEQsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEQsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFFTyxxQ0FBUyxHQUFqQixVQUFrQixFQUFVLEVBQUUsS0FBYTtRQUMxQyxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRU8seUNBQWEsR0FBckIsVUFBc0IsV0FBbUI7UUFDeEMsT0FBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ25HLENBQUM7SUFFTyw2REFBaUMsR0FBekM7UUFDQyxPQUF1QixZQUFZLENBQUMsQ0FBQyxDQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO0lBQ25ELENBQUM7SUFFTyxvQ0FBUSxHQUFoQixVQUFpQixTQUFpQixFQUFFLFdBQW1CO1FBQ3RELE9BQStCLEtBQUssQ0FBQyxTQUFTLENBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRU8sb0NBQVEsR0FBaEIsVUFBaUIsU0FBaUIsRUFBRSxXQUFtQixFQUFFLEtBQWE7UUFDckQsS0FBSyxDQUFDLFNBQVMsQ0FBRSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN4RCxDQUFDO0lBRU0sdUNBQVcsR0FBbEI7UUFDQyxLQUFLLElBQUksU0FBUyxHQUFHLENBQUMsRUFBRSxTQUFTLEdBQUcsQ0FBQyxFQUFFLFNBQVMsRUFBRSxFQUFFO1lBQ25ELEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBbUIsWUFBWSxDQUFDLFNBQVMsQ0FBRSxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsRUFBRCxDQUFDLENBQUMsQ0FBQztTQUNsRjtJQUNGLENBQUM7SUFFTSwwQ0FBYyxHQUFyQixVQUFzQixrQkFBbUQ7UUFBbkQsbUNBQUEsRUFBQSw4QkFBbUQ7UUFDeEUsSUFBSSxrQkFBa0IsS0FBSyxTQUFTLEVBQUU7WUFDckMsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1NBQ3ZDO1FBRVAsSUFBTSxLQUFLLEdBQWlDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRixJQUFJLEtBQUssRUFBRTtZQUNWLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVNLHNDQUFVLEdBQWpCO1FBQ0MsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUFySUQsSUFxSUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEb21NYW5pcHVsYXRvciB9IGZyb20gJy4vRG9tTWFuaXB1bGF0b3IuanMnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0U2VuZGVyIH0gZnJvbSAnLi9SZXF1ZXN0U2VuZGVyLmpzJztcclxuaW1wb3J0IHsgU3F1YXJlIH0gZnJvbSAnLi9TcXVhcmUuanMnO1xyXG5cclxuY29uc3QgYSA9ICdBJztcclxuY29uc3QgaCA9ICdIJztcclxuY29uc3QgdGFibGUgPSAndGFibGUnO1xyXG5jb25zdCB0aCA9ICd0aCc7XHJcbmNvbnN0IHRyID0gJ3RyJztcclxuY29uc3QgdGQgPSAndGQnO1xyXG5jb25zdCB0YyA9ICd0Yyc7XHJcbmNvbnN0IGlkID0gJ2lkJztcclxuY29uc3Qgc2VsZWN0ZWQgPSAnc2VsZWN0ZWQnO1xyXG5cclxuY29uc3QgSW5pdGlhbFN0YXRlOiBBcnJheTxBcnJheTxzdHJpbmc+PiA9IFtcclxuXHRbJ+KZnCcsICfimZ4nLCAn4pmdJywgJ+KZmycsICfimZonLCAn4pmdJywgJ+KZnicsICfimZwnXSxcclxuXHRbJ+KZnycsICfimZ8nLCAn4pmfJywgJ+KZnycsICfimZ8nLCAn4pmfJywgJ+KZnycsICfimZ8nXSxcclxuXHRbJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICddLFxyXG5cdFsnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJ10sXHJcblx0WycgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnXSxcclxuXHRbJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICddLFxyXG5cdFsn4pmZJywgJ+KZmScsICfimZknLCAn4pmZJywgJ+KZmScsICfimZknLCAn4pmZJywgJ+KZmSddLFxyXG5cdFsn4pmWJywgJ+KZmCcsICfimZcnLCAn4pmVJywgJ+KZlCcsICfimZcnLCAn4pmYJywgJ+KZliddXHJcbl07XHJcblxyXG5jb25zdCBTdGF0ZTogQXJyYXk8QXJyYXk8c3RyaW5nPj4gPSBbXHJcblx0WyfimZwnLCAn4pmeJywgJ+KZnScsICfimZsnLCAn4pmaJywgJ+KZnScsICfimZ4nLCAn4pmcJ10sXHJcblx0WyfimZ8nLCAn4pmfJywgJ+KZnycsICfimZ8nLCAn4pmfJywgJ+KZnycsICfimZ8nLCAn4pmfJ10sXHJcblx0WycgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnXSxcclxuXHRbJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICddLFxyXG5cdFsnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJ10sXHJcblx0WycgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnXSxcclxuXHRbJ+KZmScsICfimZknLCAn4pmZJywgJ+KZmScsICfimZknLCAn4pmZJywgJ+KZmScsICfimZknXSxcclxuXHRbJ+KZlicsICfimZgnLCAn4pmXJywgJ+KZlScsICfimZQnLCAn4pmXJywgJ+KZmCcsICfimZYnXVxyXG5dO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZXNzQm9hcmRCdWlsZGVyIHtcclxuXHJcblx0cHJpdmF0ZSBkb21NYW5pcHVsYXRvcjogRG9tTWFuaXB1bGF0b3I7XHJcblx0cHJpdmF0ZSBtb3ZlRnJvbTogSFRNTEVsZW1lbnQgfCBudWxsO1xyXG5cdHByaXZhdGUgd2hpdGVPblRvcFdoZW5TaG93OiBib29sZWFuO1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmRvbU1hbmlwdWxhdG9yID0gbmV3IERvbU1hbmlwdWxhdG9yKCk7XHJcblx0XHR0aGlzLm1vdmVGcm9tID0gbnVsbDtcclxuXHRcdHRoaXMud2hpdGVPblRvcFdoZW5TaG93ID0gZmFsc2U7XHJcblx0XHR0aGlzLnNob3dDaGVzc0JvYXJkKCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNyZWF0ZUNoZXNzQm9hcmQoKTogdm9pZCB7XHJcblx0XHRjb25zdCBib2R5OiBIVE1MQm9keUVsZW1lbnQgfCB1bmRlZmluZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdO1xyXG5cdFx0Y29uc3QgYm9hcmQ6IEhUTUxUYWJsZUVsZW1lbnQgfCB1bmRlZmluZWQgPSA8SFRNTFRhYmxlRWxlbWVudCB8IHVuZGVmaW5lZD50aGlzLmRvbU1hbmlwdWxhdG9yLmNyZWF0ZUVsZW1lbnQodGFibGUsIDxIVE1MRWxlbWVudD5ib2R5KTtcclxuXHRcdGJvYXJkPy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NoZXNzLWJvYXJkJyk7XHJcblx0XHRjb25zdCB0YWJsZUJvZHk6IEhUTUxFbGVtZW50ID0gdGhpcy5kb21NYW5pcHVsYXRvci5jcmVhdGVFbGVtZW50KCd0Ym9keScsIDxIVE1MRWxlbWVudD5ib2FyZCk7XHJcblxyXG5cdFx0dGhpcy5jcmVhdGVUYWJsZUNvbHVtbnModGFibGVCb2R5KTtcclxuXHRcdHRoaXMuY3JlYXRlU3F1YXJlcyh0YWJsZUJvZHkpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjcmVhdGVUYWJsZUNvbHVtbnModGFibGVCb2R5OiBIVE1MRWxlbWVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgaGVhZGVyOiBIVE1MRWxlbWVudCA9IHRoaXMuZG9tTWFuaXB1bGF0b3IuY3JlYXRlRWxlbWVudCh0ciwgdGFibGVCb2R5KTtcclxuXHRcdHRoaXMuZG9tTWFuaXB1bGF0b3IuY3JlYXRlRWxlbWVudCh0aCwgaGVhZGVyKTtcdFxyXG5cdFx0Zm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IDg7IGNvbHVtbkluZGV4KyspIHtcclxuXHRcdFx0dGhpcy5jcmVhdGVUYWJsZUhlYWRlckNlbGwoaGVhZGVyLCB0YyArIGNvbHVtbkluZGV4ICsgMSwgdGhpcy5nZXRDb2x1bW5UZXh0KGNvbHVtbkluZGV4KSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNyZWF0ZVRhYmxlSGVhZGVyQ2VsbChwYXJlbnQ6IEhUTUxFbGVtZW50LCBpZFZhbHVlOiBzdHJpbmcsIHRleHQ6IHN0cmluZyk6IHZvaWQge1xyXG5cdFx0Y29uc3QgaGVhZGVyID0gdGhpcy5kb21NYW5pcHVsYXRvci5jcmVhdGVFbGVtZW50KHRoLCBwYXJlbnQpO1xyXG5cdFx0aGVhZGVyLnNldEF0dHJpYnV0ZShpZCwgaWRWYWx1ZSk7XHJcblx0XHRoZWFkZXIudGV4dENvbnRlbnQgPSB0ZXh0O1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBjcmVhdGVUYWJsZVJhbmsodGFibGVCb2R5OiBIVE1MRWxlbWVudCwgcmFua051bWJlcjogbnVtYmVyKSB7XHJcblx0XHRjb25zdCByYW5rID0gdGhpcy5kb21NYW5pcHVsYXRvci5jcmVhdGVFbGVtZW50KHRyLCB0YWJsZUJvZHkpO1xyXG5cdFx0dGhpcy5jcmVhdGVUYWJsZUhlYWRlckNlbGwocmFuaywgdHIgKyByYW5rTnVtYmVyLCByYW5rTnVtYmVyLnRvU3RyaW5nKCkpO1xyXG5cdFx0cmV0dXJuIHJhbms7XHJcblx0fVxyXG5cdFxyXG5cdHByaXZhdGUgY3JlYXRlU3F1YXJlcyh0YWJsZUJvZHk6IEhUTUxFbGVtZW50KSB7XHJcblx0XHRmb3IgKGxldCByYW5rSW5kZXggPSAwOyByYW5rSW5kZXggPCA4OyByYW5rSW5kZXgrKykge1xyXG5cdFx0XHRjb25zdCByYW5rTnVtYmVyOiBudW1iZXIgPSB0aGlzLndoaXRlT25Ub3BXaGVuU2hvdyA/IHJhbmtJbmRleCArIDEgOiA4IC0gcmFua0luZGV4O1xyXG5cdFx0XHRjb25zdCByYW5rID0gdGhpcy5jcmVhdGVUYWJsZVJhbmsodGFibGVCb2R5LCByYW5rTnVtYmVyKTtcclxuXHRcdFx0XHJcblx0XHRcdGZvciAobGV0IGNvbHVtbkluZGV4ID0gMDsgY29sdW1uSW5kZXggPCA4OyBjb2x1bW5JbmRleCsrKSB7XHJcblx0XHRcdFx0Y29uc3Qgc3F1YXJlID0gdGhpcy5kb21NYW5pcHVsYXRvci5jcmVhdGVFbGVtZW50KHRkLCByYW5rKTtcclxuXHRcdFx0XHRzcXVhcmUuc2V0QXR0cmlidXRlKGlkLCB0aGlzLmdldENvbHVtblRleHQoY29sdW1uSW5kZXgpICsgcmFua051bWJlcik7XHJcblx0XHRcdFx0c3F1YXJlLm9uY2xpY2sgPSB0aGlzLnNxdWFyZU9uQ2xpY2suYmluZCh0aGlzKTtcclxuXHRcdFx0XHRzcXVhcmUuc2V0QXR0cmlidXRlKCdjbGFzcycsIChyYW5rSW5kZXggKyBjb2x1bW5JbmRleCkgJSAyID09IDEgPyAnZGFyaycgOiAnbGlnaHQnKTtcclxuXHRcdFx0XHRzcXVhcmUudGV4dENvbnRlbnQgPSB0aGlzLmlzV2hpdGVPblRvcEluU3RhdGVSZXByZXNlbnRhdGlvbigpID9cclxuXHRcdFx0XHRcdHRoaXMuZ2V0U3RhdGUocmFua051bWJlciAtIDEsIHRoaXMud2hpdGVPblRvcFdoZW5TaG93ID8gY29sdW1uSW5kZXggOiA3IC0gY29sdW1uSW5kZXgpIDpcclxuXHRcdFx0XHRcdHRoaXMuZ2V0U3RhdGUodGhpcy53aGl0ZU9uVG9wV2hlblNob3cgPyA3IC0gcmFua0luZGV4IDogcmFua0luZGV4LCB0aGlzLndoaXRlT25Ub3BXaGVuU2hvdyA/IDcgLSBjb2x1bW5JbmRleCA6IGNvbHVtbkluZGV4KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzcXVhcmVPbkNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XHJcblx0XHRpZiAodGhpcy5tb3ZlRnJvbSA9PSBudWxsKSB7XHJcblx0XHRcdHRoaXMubW92ZUZyb20gPSA8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudDtcclxuXHRcdFx0dGhpcy5tb3ZlRnJvbS5jbGFzc0xpc3QuYWRkKHNlbGVjdGVkKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHRoaXMubW92ZUZyb20uY2xhc3NMaXN0LnJlbW92ZShzZWxlY3RlZCk7XHJcblx0XHRcdGNvbnN0IHRvU3F1YXJlOiBTcXVhcmUgPSB0aGlzLmdldFNxdWFyZSg8SFRNTEVsZW1lbnQ+ZXZlbnQuc3JjRWxlbWVudCk7XHJcblx0XHRcdGNvbnN0IGZyb21TcXVhcmU6IFNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKHRoaXMubW92ZUZyb20pO1xyXG5cclxuXHRcdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9tb3ZlJywgJ1BVVCcsICgpID0+IHtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKHRvU3F1YXJlLnJhbmtJbmRleCwgdG9TcXVhcmUuY29sdW1uSW5kZXgsIHRoaXMuZ2V0U3RhdGUoZnJvbVNxdWFyZS5yYW5rSW5kZXgsIGZyb21TcXVhcmUuY29sdW1uSW5kZXgpKTtcclxuXHRcdFx0XHR0aGlzLnNldFN0YXRlKGZyb21TcXVhcmUucmFua0luZGV4LCBmcm9tU3F1YXJlLmNvbHVtbkluZGV4LCAnICcpO1xyXG5cdFx0XHRcdHRoaXMuc2hvd0NoZXNzQm9hcmQoKTtcclxuXHRcdFx0fSwgSlNPTi5zdHJpbmdpZnkodGhpcy5nZXRNb3ZlKGZyb21TcXVhcmUsIHRvU3F1YXJlKSksICdhcHBsaWNhdGlvbi9qc29uJyk7XHJcblxyXG5cdFx0XHR0aGlzLm1vdmVGcm9tID0gbnVsbDtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0TW92ZShmcm9tU3F1YXJlOiBTcXVhcmUsIHRvU3F1YXJlOiBTcXVhcmUpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIGZyb21TcXVhcmUudG9TdHJpbmcodGhpcy53aGl0ZU9uVG9wV2hlblNob3cpICsgdG9TcXVhcmUudG9TdHJpbmcodGhpcy53aGl0ZU9uVG9wV2hlblNob3cpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBnZXRTcXVhcmUoc3F1YXJlOiBIVE1MRWxlbWVudCk6IFNxdWFyZSB7XHJcblx0XHRjb25zdCByYW5rID0gcGFyc2VJbnQoPHN0cmluZz5zcXVhcmUuaWRbMV0pO1xyXG5cdFx0Y29uc3QgY29sdW1uID0gc3F1YXJlIC5pZC5jaGFyQ29kZUF0KDApO1xyXG5cdFx0cmV0dXJuIHRoaXMuaXNXaGl0ZU9uVG9wSW5TdGF0ZVJlcHJlc2VudGF0aW9uKCkgP1xyXG5cdFx0XHRuZXcgU3F1YXJlKGguY2hhckNvZGVBdCgwKSAtIGNvbHVtbiwgcmFuayAtIDEpIDpcclxuXHRcdFx0bmV3IFNxdWFyZShjb2x1bW4gLSBhLmNoYXJDb2RlQXQoMCksIDggLSByYW5rKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY2hhclNoaWZ0KGNoOiBzdHJpbmcsIHNoaWZ0OiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoY2guY2hhckNvZGVBdCgwKSArIHNoaWZ0KTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0Q29sdW1uVGV4dChjb2x1bW5JbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiB0aGlzLndoaXRlT25Ub3BXaGVuU2hvdyA/IHRoaXMuY2hhclNoaWZ0KGgsIC1jb2x1bW5JbmRleCkgOiB0aGlzLmNoYXJTaGlmdChhLCBjb2x1bW5JbmRleCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGlzV2hpdGVPblRvcEluU3RhdGVSZXByZXNlbnRhdGlvbigpOiBib29sZWFuIHtcclxuXHRcdHJldHVybiAoPEFycmF5PHN0cmluZz4+SW5pdGlhbFN0YXRlWzBdKVswXSA9PSAn4pmWJztcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0U3RhdGUocmFua0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIpOiBzdHJpbmcge1xyXG5cdFx0cmV0dXJuIDxzdHJpbmc+KDxBcnJheTxzdHJpbmc+PlN0YXRlW3JhbmtJbmRleF0pW2NvbHVtbkluZGV4XTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc2V0U3RhdGUocmFua0luZGV4OiBudW1iZXIsIGNvbHVtbkluZGV4OiBudW1iZXIsIHZhbHVlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdCg8QXJyYXk8c3RyaW5nPj5TdGF0ZVtyYW5rSW5kZXhdKVtjb2x1bW5JbmRleF0gPSB2YWx1ZTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyByZXNldFN0YXRlcygpOiB2b2lkIHtcclxuXHRcdGZvciAobGV0IHJhbmtJbmRleCA9IDA7IHJhbmtJbmRleCA8IDg7IHJhbmtJbmRleCsrKSB7XHJcblx0XHRcdFN0YXRlW3JhbmtJbmRleF0gPSAoPEFycmF5PHN0cmluZz4+SW5pdGlhbFN0YXRlW3JhbmtJbmRleF0pLm1hcCgoeDogc3RyaW5nKSA9PiB4KTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzaG93Q2hlc3NCb2FyZCh3aGl0ZU9uVG9wV2hlblNob3c6IGJvb2xlYW4gfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiB2b2lkIHtcclxuXHRcdGlmICh3aGl0ZU9uVG9wV2hlblNob3cgIT09IHVuZGVmaW5lZCkge1xyXG5cdFx0XHR0aGlzLndoaXRlT25Ub3BXaGVuU2hvdyA9IHdoaXRlT25Ub3BXaGVuU2hvdztcclxuICAgICAgICB9XHJcblxyXG5cdFx0Y29uc3QgYm9hcmQ6IEhUTUxUYWJsZUVsZW1lbnQgfCB1bmRlZmluZWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWJsZSlbMF07XHJcblx0XHRpZiAoYm9hcmQpIHtcclxuXHRcdFx0Ym9hcmQucmVtb3ZlKCk7XHJcblx0XHRcdHRoaXMubW92ZUZyb20gPSBudWxsO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5jcmVhdGVDaGVzc0JvYXJkKCk7XHJcblx0fVxyXG5cdFxyXG5cdHB1YmxpYyBzd2l0Y2hTaWRlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5zaG93Q2hlc3NCb2FyZCghdGhpcy53aGl0ZU9uVG9wV2hlblNob3cpO1xyXG5cdH1cclxufSJdfQ==