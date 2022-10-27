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
        RequestSender.sendFormData('KnightsTale/api/game/load', 'POST', function () {
            _this.chessBoardBuilder.showChessBoard();
        }, formData);
    };
    ChessGame.prototype.saveGame = function () {
        RequestSender.execute('KnightsTale/api/game/save', 'PUT', function (data) { console.log(data); });
    };
    return ChessGame;
}());
export { ChessGame };
ko.applyBindings(new ChessGame(), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRDtJQUlDO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLDJCQUFPLEdBQWQ7UUFBQSxpQkFLQztRQUpBLGFBQWEsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFO1lBQ3hELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sNEJBQVEsR0FBZixVQUFnQixDQUFtQixFQUFFLEtBQVk7UUFBakQsaUJBV0M7UUFWQSxJQUFNLE1BQU0sR0FBcUIsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM5QyxJQUFNLEtBQUssR0FBYSxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQU0sSUFBSSxHQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsYUFBYSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxNQUFNLEVBQUU7WUFDL0QsS0FBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3pDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNkLENBQUM7SUFHTSw0QkFBUSxHQUFmO1FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsRUFBRSxLQUFLLEVBQUUsVUFBQyxJQUFZLElBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFwQ0QsSUFvQ0M7O0FBRUQsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFNBQVMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoZXNzQm9hcmRCdWlsZGVyIH0gZnJvbSAnLi9DaGVzc0JvYXJkQnVpbGRlci5qcyc7XHJcbmltcG9ydCB7IFJlcXVlc3RTZW5kZXIgfSBmcm9tICcuL1JlcXVlc3RTZW5kZXIuanMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENoZXNzR2FtZSB7XHJcblxyXG5cdHB1YmxpYyBjaGVzc0JvYXJkQnVpbGRlcjogQ2hlc3NCb2FyZEJ1aWxkZXI7XHJcblxyXG5cdHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcclxuXHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIgPSBuZXcgQ2hlc3NCb2FyZEJ1aWxkZXIoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzd2l0Y2hTaWRlKCk6IHZvaWQge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5zd2l0Y2hTaWRlKCk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgbmV3R2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbmV3JywgJ0dFVCcsICgpID0+IHtcclxuXHRcdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlci5yZXNldFN0YXRlcygpO1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnNob3dDaGVzc0JvYXJkKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBsb2FkR2FtZShfOiBIVE1MSW5wdXRFbGVtZW50LCBldmVudDogRXZlbnQpOiB2b2lkIHtcclxuXHRcdGNvbnN0IHRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcclxuXHRcdGNvbnN0IGZpbGVzID0gPEZpbGVMaXN0PnRhcmdldC5maWxlcztcclxuXHRcdGNvbnN0IGZpbGUgPSA8RmlsZT5maWxlc1swXTtcclxuXHJcblx0XHRjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG5cdFx0Zm9ybURhdGEuYXBwZW5kKCdmaWxlJywgZmlsZSwgZmlsZS5uYW1lKTtcclxuXHJcblx0XHRSZXF1ZXN0U2VuZGVyLnNlbmRGb3JtRGF0YSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvbG9hZCcsICdQT1NUJywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnNob3dDaGVzc0JvYXJkKCk7XHJcblx0XHR9LCBmb3JtRGF0YSk7XHJcblx0fVxyXG5cclxuXHJcblx0cHVibGljIHNhdmVHYW1lKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9zYXZlJywgJ1BVVCcsIChkYXRhOiBzdHJpbmcpID0+IHsgY29uc29sZS5sb2coZGF0YSk7IH0pO1xyXG5cdH1cclxufVxyXG5cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQ2hlc3NHYW1lKCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7Il19