import { ChessBoardBuilder } from './ChessBoardBuilder.js';
import { RequestSender } from './RequestSender.js';
var ChessGame = /** @class */ (function () {
    function ChessGame() {
        this.chessBoardBuilder = new ChessBoardBuilder();
    }
    ChessGame.prototype.switchSide = function () {
        this.chessBoardBuilder.switchSide();
    };
    ChessGame.prototype.newGame = function () {
        var _this = this;
        RequestSender.execute('KnightsTale/api/game/new', 'GET', function () {
            _this.chessBoardBuilder.resetStates();
            _this.chessBoardBuilder.showChessBoard();
        });
    };
    ChessGame.prototype.loadGame = function (_, event) {
        var _this = this;
        var target = event.target;
        var files = target.files;
        var file = files[0];
        var formData = new FormData();
        formData.append('file', file, file.name);
        RequestSender.sendFormData('KnightsTale/api/game/load', 'POST', function (knightsTaleDto) {
            _this.chessBoardBuilder.loadState(knightsTaleDto);
        }, formData);
    };
    ChessGame.prototype.saveGame = function () {
        RequestSender.execute('KnightsTale/api/game/save', 'PUT', function (data) { console.log(data); });
    };
    return ChessGame;
}());
export { ChessGame };
ko.applyBindings(new ChessGame(), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRDtJQUlDO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLDJCQUFPLEdBQWQ7UUFBQSxpQkFLQztRQUpBLGFBQWEsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFO1lBQ3hELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sNEJBQVEsR0FBZixVQUFnQixDQUFtQixFQUFFLEtBQVk7UUFBakQsaUJBV0M7UUFWQSxJQUFNLE1BQU0sR0FBcUIsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM5QyxJQUFNLEtBQUssR0FBYSxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQU0sSUFBSSxHQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsYUFBYSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxNQUFNLEVBQUUsVUFBQyxjQUE4QjtZQUM5RixLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNkLENBQUM7SUFHTSw0QkFBUSxHQUFmO1FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsRUFBRSxLQUFLLEVBQUUsVUFBQyxJQUFZLElBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7O0FBRUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoZXNzQm9hcmRCdWlsZGVyIH0gZnJvbSAnLi9DaGVzc0JvYXJkQnVpbGRlci5qcyc7XHJcbmltcG9ydCB0eXBlIHsgS25pZ2h0c1RhbGVEdG8gfSBmcm9tICcuL0R0b3MvS25pZ2h0c1RhbGVEdG8uanMnO1xyXG5pbXBvcnQgeyBSZXF1ZXN0U2VuZGVyIH0gZnJvbSAnLi9SZXF1ZXN0U2VuZGVyLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBDaGVzc0dhbWUge1xyXG5cclxuXHRwdWJsaWMgY2hlc3NCb2FyZEJ1aWxkZXI6IENoZXNzQm9hcmRCdWlsZGVyO1xyXG5cclxuXHRwdWJsaWMgY29uc3RydWN0b3IoKSB7XHJcblx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyID0gbmV3IENoZXNzQm9hcmRCdWlsZGVyKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3dpdGNoU2lkZSgpOiB2b2lkIHtcclxuXHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIuc3dpdGNoU2lkZSgpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIG5ld0dhbWUoKTogdm9pZCB7XHJcblx0XHRSZXF1ZXN0U2VuZGVyLmV4ZWN1dGUoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL25ldycsICdHRVQnLCAoKSA9PiB7XHJcblx0XHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIucmVzZXRTdGF0ZXMoKTtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zaG93Q2hlc3NCb2FyZCgpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbG9hZEdhbWUoXzogSFRNTElucHV0RWxlbWVudCwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XHJcblx0XHRjb25zdCB0YXJnZXQgPSA8SFRNTElucHV0RWxlbWVudD5ldmVudC50YXJnZXQ7XHJcblx0XHRjb25zdCBmaWxlcyA9IDxGaWxlTGlzdD50YXJnZXQuZmlsZXM7XHJcblx0XHRjb25zdCBmaWxlID0gPEZpbGU+ZmlsZXNbMF07XHJcblxyXG5cdFx0Y29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuXHRcdGZvcm1EYXRhLmFwcGVuZCgnZmlsZScsIGZpbGUsIGZpbGUubmFtZSk7XHJcblxyXG5cdFx0UmVxdWVzdFNlbmRlci5zZW5kRm9ybURhdGEoJ0tuaWdodHNUYWxlL2FwaS9nYW1lL2xvYWQnLCAnUE9TVCcsIChrbmlnaHRzVGFsZUR0bzogS25pZ2h0c1RhbGVEdG8pID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5sb2FkU3RhdGUoa25pZ2h0c1RhbGVEdG8pO1xyXG5cdFx0fSwgZm9ybURhdGEpO1xyXG5cdH1cclxuXHJcblxyXG5cdHB1YmxpYyBzYXZlR2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvc2F2ZScsICdQVVQnLCAoZGF0YTogc3RyaW5nKSA9PiB7IGNvbnNvbGUubG9nKGRhdGEpOyB9KTtcclxuXHR9XHJcbn1cclxuXHJcbmtvLmFwcGx5QmluZGluZ3MobmV3IENoZXNzR2FtZSgpLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJykpOyJdfQ==