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
        RequestSender.execute('KnightsTale/api/game/save', 'POST', function (base64SaveGame) {
            var saveGame = Uint8Array.from(atob(base64SaveGame), function (c) { return c.charCodeAt(0); });
            var fileLink = document.createElement('a');
            var blob = new Blob([saveGame], { type: 'application/octet-stream' });
            var downloadURL = window.URL.createObjectURL(blob);
            fileLink.href = downloadURL;
            fileLink.download = 'game.cgs';
            fileLink.click();
            URL.revokeObjectURL(fileLink.href);
        });
    };
    return ChessGame;
}());
export { ChessGame };
ko.applyBindings(new ChessGame(), document.getElementById('app'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlc3NHYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQ2hlc3NHYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRTNELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVuRDtJQUlDO1FBQ0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksaUJBQWlCLEVBQUUsQ0FBQztJQUNsRCxDQUFDO0lBRU0sOEJBQVUsR0FBakI7UUFDQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLDJCQUFPLEdBQWQ7UUFBQSxpQkFLQztRQUpBLGFBQWEsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLEVBQUUsS0FBSyxFQUFFO1lBQ3hELEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNyQyxLQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDekMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBRU0sNEJBQVEsR0FBZixVQUFnQixDQUFtQixFQUFFLEtBQVk7UUFBakQsaUJBV0M7UUFWQSxJQUFNLE1BQU0sR0FBcUIsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM5QyxJQUFNLEtBQUssR0FBYSxNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQU0sSUFBSSxHQUFTLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU1QixJQUFNLFFBQVEsR0FBRyxJQUFJLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFekMsYUFBYSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxNQUFNLEVBQUUsVUFBQyxjQUE4QjtZQUM5RixLQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2xELENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNkLENBQUM7SUFFTSw0QkFBUSxHQUFmO1FBQ0MsYUFBYSxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsRUFBRSxNQUFNLEVBQUUsVUFBQyxjQUFzQjtZQUNqRixJQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7WUFDN0UsSUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM3QyxJQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLDBCQUEwQixFQUFFLENBQUMsQ0FBQztZQUN4RSxJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxRQUFRLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztZQUM1QixRQUFRLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUMvQixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDakIsR0FBRyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDOztBQUVELEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxTQUFTLEVBQUUsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGVzc0JvYXJkQnVpbGRlciB9IGZyb20gJy4vQ2hlc3NCb2FyZEJ1aWxkZXIuanMnO1xyXG5pbXBvcnQgdHlwZSB7IEtuaWdodHNUYWxlRHRvIH0gZnJvbSAnLi9EdG9zL0tuaWdodHNUYWxlRHRvLmpzJztcclxuaW1wb3J0IHsgUmVxdWVzdFNlbmRlciB9IGZyb20gJy4vUmVxdWVzdFNlbmRlci5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQ2hlc3NHYW1lIHtcclxuXHJcblx0cHVibGljIGNoZXNzQm9hcmRCdWlsZGVyOiBDaGVzc0JvYXJkQnVpbGRlcjtcclxuXHJcblx0cHVibGljIGNvbnN0cnVjdG9yKCkge1xyXG5cdFx0dGhpcy5jaGVzc0JvYXJkQnVpbGRlciA9IG5ldyBDaGVzc0JvYXJkQnVpbGRlcigpO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN3aXRjaFNpZGUoKTogdm9pZCB7XHJcblx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnN3aXRjaFNpZGUoKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBuZXdHYW1lKCk6IHZvaWQge1xyXG5cdFx0UmVxdWVzdFNlbmRlci5leGVjdXRlKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9uZXcnLCAnR0VUJywgKCkgPT4ge1xyXG5cdFx0XHR0aGlzLmNoZXNzQm9hcmRCdWlsZGVyLnJlc2V0U3RhdGVzKCk7XHJcblx0XHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIuc2hvd0NoZXNzQm9hcmQoKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIGxvYWRHYW1lKF86IEhUTUxJbnB1dEVsZW1lbnQsIGV2ZW50OiBFdmVudCk6IHZvaWQge1xyXG5cdFx0Y29uc3QgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xyXG5cdFx0Y29uc3QgZmlsZXMgPSA8RmlsZUxpc3Q+dGFyZ2V0LmZpbGVzO1xyXG5cdFx0Y29uc3QgZmlsZSA9IDxGaWxlPmZpbGVzWzBdO1xyXG5cclxuXHRcdGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XHJcblx0XHRmb3JtRGF0YS5hcHBlbmQoJ2ZpbGUnLCBmaWxlLCBmaWxlLm5hbWUpO1xyXG5cclxuXHRcdFJlcXVlc3RTZW5kZXIuc2VuZEZvcm1EYXRhKCdLbmlnaHRzVGFsZS9hcGkvZ2FtZS9sb2FkJywgJ1BPU1QnLCAoa25pZ2h0c1RhbGVEdG86IEtuaWdodHNUYWxlRHRvKSA9PiB7XHJcblx0XHRcdHRoaXMuY2hlc3NCb2FyZEJ1aWxkZXIubG9hZFN0YXRlKGtuaWdodHNUYWxlRHRvKTtcclxuXHRcdH0sIGZvcm1EYXRhKTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzYXZlR2FtZSgpOiB2b2lkIHtcclxuXHRcdFJlcXVlc3RTZW5kZXIuZXhlY3V0ZSgnS25pZ2h0c1RhbGUvYXBpL2dhbWUvc2F2ZScsICdQT1NUJywgKGJhc2U2NFNhdmVHYW1lOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0Y29uc3Qgc2F2ZUdhbWUgPSBVaW50OEFycmF5LmZyb20oYXRvYihiYXNlNjRTYXZlR2FtZSksIGMgPT4gYy5jaGFyQ29kZUF0KDApKTtcclxuXHRcdFx0Y29uc3QgZmlsZUxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcblx0XHRcdGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbc2F2ZUdhbWVdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nIH0pO1xyXG5cdFx0XHRjb25zdCBkb3dubG9hZFVSTCA9IHdpbmRvdy5VUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xyXG5cdFx0XHRmaWxlTGluay5ocmVmID0gZG93bmxvYWRVUkw7XHJcblx0XHRcdGZpbGVMaW5rLmRvd25sb2FkID0gJ2dhbWUuY2dzJztcclxuXHRcdFx0ZmlsZUxpbmsuY2xpY2soKTtcclxuXHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChmaWxlTGluay5ocmVmKTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxua28uYXBwbHlCaW5kaW5ncyhuZXcgQ2hlc3NHYW1lKCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSk7Il19