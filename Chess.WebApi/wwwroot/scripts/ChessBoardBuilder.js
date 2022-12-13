import { DomManipulator } from './DomManipulator.js';
import { RequestCallbacksDto } from './Dtos/RequestCallbacksDto.js';
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
        if (this.moveFrom == null) {
            this.moveFrom = event.srcElement;
            this.moveFrom.classList.add(selected);
        }
        else {
            this.moveFrom.classList.remove(selected);
            var toSquare = this.getSquare(event.srcElement);
            var fromSquare = this.getSquare(this.moveFrom);
            this.move(this.getMove(fromSquare, toSquare));
            this.moveFrom = null;
        }
    };
    ChessBoardBuilder.prototype.move = function (move) {
        var _this = this;
        RequestSender.execute("KnightsTale/api/game/move/".concat(move), 'POST', new RequestCallbacksDto(function (knightsTaleDto) {
            _this.loadState(knightsTaleDto);
        }, function (request) { RequestSender.showError(request); }), "".concat(move, " executed."));
    };
    ChessBoardBuilder.prototype.getMove = function (fromSquare, toSquare) {
        return fromSquare.toString() + toSquare.toString();
    };
    ChessBoardBuilder.prototype.getSquare = function (square) {
        var rank = parseInt(square.id[1]);
        var column = square.id.charCodeAt(0);
        return this.isWhiteOnTopInStateRepresentation() ?
            new Square(column + a.charCodeAt(0), 8 - rank) :
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
    ChessBoardBuilder.prototype.loadState = function (knightsTaleDto) {
        for (var i = 0; i < knightsTaleDto.states.length; i++) {
            var rank = Math.floor(i / 8);
            var column = i % 8;
            this.setState(rank, column, knightsTaleDto.states[i]);
        }
        this.showChessBoard();
    };
    return ChessBoardBuilder;
}());
export { ChessBoardBuilder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NCb2FyZEJ1aWxkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDaGVzc0JvYXJkQnVpbGRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFckQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDcEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFckMsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2QsSUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ2QsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDO0FBQ3RCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQztBQUNoQixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDaEIsSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQztBQUNoQixJQUFNLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDaEIsSUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDO0FBRTVCLElBQU0sWUFBWSxHQUF5QjtJQUMxQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0NBQ3hDLENBQUM7QUFFRixJQUFNLEtBQUssR0FBeUI7SUFDbkMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQztJQUN4QyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7SUFDeEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ3hDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FB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OUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RELElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFVLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM5RDtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBQ0wsd0JBQUM7QUFBRCxDQUFDLEFBL0lELElBK0lDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9tTWFuaXB1bGF0b3IgfSBmcm9tICcuL0RvbU1hbmlwdWxhdG9yLmpzJztcclxuaW1wb3J0IHR5cGUgeyBLbmlnaHRzVGFsZUR0byB9IGZyb20gJy4vRHRvcy9LbmlnaHRzVGFsZUR0by5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RDYWxsYmFja3NEdG8gfSBmcm9tICcuL0R0b3MvUmVxdWVzdENhbGxiYWNrc0R0by5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RTZW5kZXIgfSBmcm9tICcuL1JlcXVlc3RTZW5kZXIuanMnO1xyXG5pbXBvcnQgeyBTcXVhcmUgfSBmcm9tICcuL1NxdWFyZS5qcyc7XHJcblxyXG5jb25zdCBhID0gJ0EnO1xyXG5jb25zdCBoID0gJ0gnO1xyXG5jb25zdCB0YWJsZSA9ICd0YWJsZSc7XHJcbmNvbnN0IHRoID0gJ3RoJztcclxuY29uc3QgdHIgPSAndHInO1xyXG5jb25zdCB0ZCA9ICd0ZCc7XHJcbmNvbnN0IHRjID0gJ3RjJztcclxuY29uc3QgaWQgPSAnaWQnO1xyXG5jb25zdCBzZWxlY3RlZCA9ICdzZWxlY3RlZCc7XHJcblxyXG5jb25zdCBJbml0aWFsU3RhdGU6IEFycmF5PEFycmF5PHN0cmluZz4+ID0gW1xyXG5cdFsn4pmcJywgJ+KZnicsICfimZ0nLCAn4pmbJywgJ+KZmicsICfimZ0nLCAn4pmeJywgJ+KZnCddLFxyXG5cdFsn4pmfJywgJ+KZnycsICfimZ8nLCAn4pmfJywgJ+KZnycsICfimZ8nLCAn4pmfJywgJ+KZnyddLFxyXG5cdFsnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJ10sXHJcblx0WycgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnXSxcclxuXHRbJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICddLFxyXG5cdFsnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJ10sXHJcblx0WyfimZknLCAn4pmZJywgJ+KZmScsICfimZknLCAn4pmZJywgJ+KZmScsICfimZknLCAn4pmZJ10sXHJcblx0WyfimZYnLCAn4pmYJywgJ+KZlycsICfimZUnLCAn4pmUJywgJ+KZlycsICfimZgnLCAn4pmWJ11cclxuXTtcclxuXHJcbmNvbnN0IFN0YXRlOiBBcnJheTxBcnJheTxzdHJpbmc+PiA9IFtcclxuXHRbJ+KZnCcsICfimZ4nLCAn4pmdJywgJ+KZmycsICfimZonLCAn4pmdJywgJ+KZnicsICfimZwnXSxcclxuXHRbJ+KZnycsICfimZ8nLCAn4pmfJywgJ+KZnycsICfimZ8nLCAn4pmfJywgJ+KZnycsICfimZ8nXSxcclxuXHRbJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICddLFxyXG5cdFsnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJ10sXHJcblx0WycgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnXSxcclxuXHRbJyAnLCAnICcsICcgJywgJyAnLCAnICcsICcgJywgJyAnLCAnICddLFxyXG5cdFsn4pmZJywgJ+KZmScsICfimZknLCAn4pmZJywgJ+KZmScsICfimZknLCAn4pmZJywgJ+KZmSddLFxyXG5cdFsn4pmWJywgJ+KZmCcsICfimZcnLCAn4pmVJywgJ+KZlCcsICfimZcnLCAn4pmYJywgJ+KZliddXHJcbl07XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NCb2FyZEJ1aWxkZXIge1xyXG5cclxuXHRwcml2YXRlIGRvbU1hbmlwdWxhdG9yOiBEb21NYW5pcHVsYXRvcjtcclxuXHRwcml2YXRlIG1vdmVGcm9tOiBIVE1MRWxlbWVudCB8IG51bGw7XHJcblx0cHJpdmF0ZSB3aGl0ZU9uVG9wV2hlblNob3c6IGJvb2xlYW47XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuZG9tTWFuaXB1bGF0b3IgPSBuZXcgRG9tTWFuaXB1bGF0b3IoKTtcclxuXHRcdHRoaXMubW92ZUZyb20gPSBudWxsO1xyXG5cdFx0dGhpcy53aGl0ZU9uVG9wV2hlblNob3cgPSBmYWxzZTtcclxuXHRcdHRoaXMuc2hvd0NoZXNzQm9hcmQoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY3JlYXRlQ2hlc3NCb2FyZCgpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGJvZHk6IEhUTUxCb2R5RWxlbWVudCB8IHVuZGVmaW5lZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XHJcblx0XHRjb25zdCBib2FyZDogSFRNTFRhYmxlRWxlbWVudCB8IHVuZGVmaW5lZCA9IDxIVE1MVGFibGVFbGVtZW50IHwgdW5kZWZpbmVkPnRoaXMuZG9tTWFuaXB1bGF0b3IuY3JlYXRlRWxlbWVudCh0YWJsZSwgPEhUTUxFbGVtZW50PmJvZHkpO1xyXG5cdFx0Ym9hcmQ/LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY2hlc3MtYm9hcmQnKTtcclxuXHRcdGNvbnN0IHRhYmxlQm9keTogSFRNTEVsZW1lbnQgPSB0aGlzLmRvbU1hbmlwdWxhdG9yLmNyZWF0ZUVsZW1lbnQoJ3Rib2R5JywgPEhUTUxFbGVtZW50PmJvYXJkKTtcclxuXHJcblx0XHR0aGlzLmNyZWF0ZVRhYmxlQ29sdW1ucyh0YWJsZUJvZHkpO1xyXG5cdFx0dGhpcy5jcmVhdGVTcXVhcmVzKHRhYmxlQm9keSk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNyZWF0ZVRhYmxlQ29sdW1ucyh0YWJsZUJvZHk6IEhUTUxFbGVtZW50KTogdm9pZCB7XHJcblx0XHRjb25zdCBoZWFkZXI6IEhUTUxFbGVtZW50ID0gdGhpcy5kb21NYW5pcHVsYXRvci5jcmVhdGVFbGVtZW50KHRyLCB0YWJsZUJvZHkpO1xyXG5cdFx0dGhpcy5kb21NYW5pcHVsYXRvci5jcmVhdGVFbGVtZW50KHRoLCBoZWFkZXIpO1x0XHJcblx0XHRmb3IgKGxldCBjb2x1bW5JbmRleCA9IDA7IGNvbHVtbkluZGV4IDwgODsgY29sdW1uSW5kZXgrKykge1xyXG5cdFx0XHR0aGlzLmNyZWF0ZVRhYmxlSGVhZGVyQ2VsbChoZWFkZXIsIHRjICsgY29sdW1uSW5kZXggKyAxLCB0aGlzLmdldENvbHVtblRleHQoY29sdW1uSW5kZXgpKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdHByaXZhdGUgY3JlYXRlVGFibGVIZWFkZXJDZWxsKHBhcmVudDogSFRNTEVsZW1lbnQsIGlkVmFsdWU6IHN0cmluZywgdGV4dDogc3RyaW5nKTogdm9pZCB7XHJcblx0XHRjb25zdCBoZWFkZXIgPSB0aGlzLmRvbU1hbmlwdWxhdG9yLmNyZWF0ZUVsZW1lbnQodGgsIHBhcmVudCk7XHJcblx0XHRoZWFkZXIuc2V0QXR0cmlidXRlKGlkLCBpZFZhbHVlKTtcclxuXHRcdGhlYWRlci50ZXh0Q29udGVudCA9IHRleHQ7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNyZWF0ZVRhYmxlUmFuayh0YWJsZUJvZHk6IEhUTUxFbGVtZW50LCByYW5rTnVtYmVyOiBudW1iZXIpIHtcclxuXHRcdGNvbnN0IHJhbmsgPSB0aGlzLmRvbU1hbmlwdWxhdG9yLmNyZWF0ZUVsZW1lbnQodHIsIHRhYmxlQm9keSk7XHJcblx0XHR0aGlzLmNyZWF0ZVRhYmxlSGVhZGVyQ2VsbChyYW5rLCB0ciArIHJhbmtOdW1iZXIsIHJhbmtOdW1iZXIudG9TdHJpbmcoKSk7XHJcblx0XHRyZXR1cm4gcmFuaztcclxuXHR9XHJcblx0XHJcblx0cHJpdmF0ZSBjcmVhdGVTcXVhcmVzKHRhYmxlQm9keTogSFRNTEVsZW1lbnQpIHtcclxuXHRcdGZvciAobGV0IHJhbmtJbmRleCA9IDA7IHJhbmtJbmRleCA8IDg7IHJhbmtJbmRleCsrKSB7XHJcblx0XHRcdGNvbnN0IHJhbmtOdW1iZXI6IG51bWJlciA9IHRoaXMud2hpdGVPblRvcFdoZW5TaG93ID8gcmFua0luZGV4ICsgMSA6IDggLSByYW5rSW5kZXg7XHJcblx0XHRcdGNvbnN0IHJhbmsgPSB0aGlzLmNyZWF0ZVRhYmxlUmFuayh0YWJsZUJvZHksIHJhbmtOdW1iZXIpO1xyXG5cdFx0XHRcclxuXHRcdFx0Zm9yIChsZXQgY29sdW1uSW5kZXggPSAwOyBjb2x1bW5JbmRleCA8IDg7IGNvbHVtbkluZGV4KyspIHtcclxuXHRcdFx0XHRjb25zdCBzcXVhcmUgPSB0aGlzLmRvbU1hbmlwdWxhdG9yLmNyZWF0ZUVsZW1lbnQodGQsIHJhbmspO1xyXG5cdFx0XHRcdHNxdWFyZS5zZXRBdHRyaWJ1dGUoaWQsIHRoaXMuZ2V0Q29sdW1uVGV4dChjb2x1bW5JbmRleCkgKyByYW5rTnVtYmVyKTtcclxuXHRcdFx0XHRzcXVhcmUub25jbGljayA9IHRoaXMuc3F1YXJlT25DbGljay5iaW5kKHRoaXMpO1xyXG5cdFx0XHRcdHNxdWFyZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgKHJhbmtJbmRleCArIGNvbHVtbkluZGV4KSAlIDIgPT0gMSA/ICdkYXJrJyA6ICdsaWdodCcpO1xyXG5cdFx0XHRcdHNxdWFyZS50ZXh0Q29udGVudCA9IHRoaXMuaXNXaGl0ZU9uVG9wSW5TdGF0ZVJlcHJlc2VudGF0aW9uKCkgP1xyXG5cdFx0XHRcdFx0dGhpcy5nZXRTdGF0ZShyYW5rTnVtYmVyIC0gMSwgdGhpcy53aGl0ZU9uVG9wV2hlblNob3cgPyBjb2x1bW5JbmRleCA6IDcgLSBjb2x1bW5JbmRleCkgOlxyXG5cdFx0XHRcdFx0dGhpcy5nZXRTdGF0ZSh0aGlzLndoaXRlT25Ub3BXaGVuU2hvdyA/IDcgLSByYW5rSW5kZXggOiByYW5rSW5kZXgsIHRoaXMud2hpdGVPblRvcFdoZW5TaG93ID8gNyAtIGNvbHVtbkluZGV4IDogY29sdW1uSW5kZXgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNxdWFyZU9uQ2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQpIHtcclxuXHRcdGlmICh0aGlzLm1vdmVGcm9tID09IG51bGwpIHtcclxuXHRcdFx0dGhpcy5tb3ZlRnJvbSA9IDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50O1xyXG5cdFx0XHR0aGlzLm1vdmVGcm9tLmNsYXNzTGlzdC5hZGQoc2VsZWN0ZWQpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5tb3ZlRnJvbS5jbGFzc0xpc3QucmVtb3ZlKHNlbGVjdGVkKTtcclxuXHRcdFx0Y29uc3QgdG9TcXVhcmU6IFNxdWFyZSA9IHRoaXMuZ2V0U3F1YXJlKDxIVE1MRWxlbWVudD5ldmVudC5zcmNFbGVtZW50KTtcclxuXHRcdFx0Y29uc3QgZnJvbVNxdWFyZTogU3F1YXJlID0gdGhpcy5nZXRTcXVhcmUodGhpcy5tb3ZlRnJvbSk7XHJcblx0XHRcdHRoaXMubW92ZSh0aGlzLmdldE1vdmUoZnJvbVNxdWFyZSwgdG9TcXVhcmUpKTtcclxuXHRcdFx0dGhpcy5tb3ZlRnJvbSA9IG51bGw7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbW92ZShtb3ZlOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZShgS25pZ2h0c1RhbGUvYXBpL2dhbWUvbW92ZS8ke21vdmV9YCwgJ1BPU1QnLFxyXG5cdFx0XHRuZXcgUmVxdWVzdENhbGxiYWNrc0R0bygoa25pZ2h0c1RhbGVEdG86IEtuaWdodHNUYWxlRHRvKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pO1xyXG5cdFx0XHR9LCAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHsgUmVxdWVzdFNlbmRlci5zaG93RXJyb3IocmVxdWVzdCk7IH0pLCBgJHttb3ZlfSBleGVjdXRlZC5gKTtcclxuICAgIH1cclxuXHJcblx0cHJpdmF0ZSBnZXRNb3ZlKGZyb21TcXVhcmU6IFNxdWFyZSwgdG9TcXVhcmU6IFNxdWFyZSk6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gZnJvbVNxdWFyZS50b1N0cmluZygpICsgdG9TcXVhcmUudG9TdHJpbmcoKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgZ2V0U3F1YXJlKHNxdWFyZTogSFRNTEVsZW1lbnQpOiBTcXVhcmUge1xyXG5cdFx0Y29uc3QgcmFuayA9IHBhcnNlSW50KDxzdHJpbmc+c3F1YXJlLmlkWzFdKTtcclxuXHRcdGNvbnN0IGNvbHVtbiA9IHNxdWFyZSAuaWQuY2hhckNvZGVBdCgwKTtcclxuXHRcdHJldHVybiB0aGlzLmlzV2hpdGVPblRvcEluU3RhdGVSZXByZXNlbnRhdGlvbigpID9cclxuXHRcdFx0bmV3IFNxdWFyZShjb2x1bW4gKyBhLmNoYXJDb2RlQXQoMCksIDggLSByYW5rKSA6XHJcblx0XHRcdG5ldyBTcXVhcmUoY29sdW1uIC0gYS5jaGFyQ29kZUF0KDApLCA4IC0gcmFuayk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGNoYXJTaGlmdChjaDogc3RyaW5nLCBzaGlmdDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoLmNoYXJDb2RlQXQoMCkgKyBzaGlmdCk7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldENvbHVtblRleHQoY29sdW1uSW5kZXg6IG51bWJlcik6IHN0cmluZyB7XHJcblx0XHRyZXR1cm4gdGhpcy53aGl0ZU9uVG9wV2hlblNob3cgPyB0aGlzLmNoYXJTaGlmdChoLCAtY29sdW1uSW5kZXgpIDogdGhpcy5jaGFyU2hpZnQoYSwgY29sdW1uSW5kZXgpO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBpc1doaXRlT25Ub3BJblN0YXRlUmVwcmVzZW50YXRpb24oKTogYm9vbGVhbiB7XHJcblx0XHRyZXR1cm4gKDxBcnJheTxzdHJpbmc+PkluaXRpYWxTdGF0ZVswXSlbMF0gPT0gJ+KZlic7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIGdldFN0YXRlKHJhbmtJbmRleDogbnVtYmVyLCBjb2x1bW5JbmRleDogbnVtYmVyKTogc3RyaW5nIHtcclxuXHRcdHJldHVybiA8c3RyaW5nPig8QXJyYXk8c3RyaW5nPj5TdGF0ZVtyYW5rSW5kZXhdKVtjb2x1bW5JbmRleF07XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHNldFN0YXRlKHJhbmtJbmRleDogbnVtYmVyLCBjb2x1bW5JbmRleDogbnVtYmVyLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XHJcblx0XHQoPEFycmF5PHN0cmluZz4+U3RhdGVbcmFua0luZGV4XSlbY29sdW1uSW5kZXhdID0gdmFsdWU7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgcmVzZXRTdGF0ZXMoKTogdm9pZCB7XHJcblx0XHRmb3IgKGxldCByYW5rSW5kZXggPSAwOyByYW5rSW5kZXggPCA4OyByYW5rSW5kZXgrKykge1xyXG5cdFx0XHRTdGF0ZVtyYW5rSW5kZXhdID0gKDxBcnJheTxzdHJpbmc+PkluaXRpYWxTdGF0ZVtyYW5rSW5kZXhdKS5tYXAoKHg6IHN0cmluZykgPT4geCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc2hvd0NoZXNzQm9hcmQod2hpdGVPblRvcFdoZW5TaG93OiBib29sZWFuIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblx0XHRpZiAod2hpdGVPblRvcFdoZW5TaG93ICE9PSB1bmRlZmluZWQpIHtcclxuXHRcdFx0dGhpcy53aGl0ZU9uVG9wV2hlblNob3cgPSB3aGl0ZU9uVG9wV2hlblNob3c7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdGNvbnN0IGJvYXJkOiBIVE1MVGFibGVFbGVtZW50IHwgdW5kZWZpbmVkID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFibGUpWzBdO1xyXG5cdFx0aWYgKGJvYXJkKSB7XHJcblx0XHRcdGJvYXJkLnJlbW92ZSgpO1xyXG5cdFx0XHR0aGlzLm1vdmVGcm9tID0gbnVsbDtcclxuXHRcdH1cclxuXHRcdHRoaXMuY3JlYXRlQ2hlc3NCb2FyZCgpO1xyXG5cdH1cclxuXHRcclxuXHRwdWJsaWMgc3dpdGNoU2lkZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuc2hvd0NoZXNzQm9hcmQoIXRoaXMud2hpdGVPblRvcFdoZW5TaG93KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBsb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG86IEtuaWdodHNUYWxlRHRvKTogdm9pZCB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGtuaWdodHNUYWxlRHRvLnN0YXRlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCByYW5rID0gTWF0aC5mbG9vcihpIC8gOCk7XHJcblx0XHRcdGNvbnN0IGNvbHVtbiA9IGkgJSA4O1xyXG5cdFx0XHR0aGlzLnNldFN0YXRlKHJhbmssIGNvbHVtbiwgPHN0cmluZz5rbmlnaHRzVGFsZUR0by5zdGF0ZXNbaV0pO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zaG93Q2hlc3NCb2FyZCgpO1xyXG4gICAgfVxyXG59Il19