import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';
var RequestSender = /** @class */ (function () {
    function RequestSender(columnIndex, rankIndex) {
        this.columnIndex = columnIndex;
        this.rankIndex = rankIndex;
    }
    RequestSender.execute = function (url, method, requestCallbacksDto, successMessage, requestData, contentType) {
        if (successMessage === void 0) { successMessage = ''; }
        if (requestData === void 0) { requestData = undefined; }
        if (contentType === void 0) { contentType = undefined; }
        $.ajax({
            url: url,
            type: method,
            data: requestData,
            processData: false,
            contentType: contentType || false,
            success: function (data, text) {
                if (text != 'success' && console) {
                    console.log(data);
                }
                if (successMessage) {
                    toast.success(successMessage);
                }
                requestCallbacksDto.processDataCallback(data);
            },
            error: function (request) {
                requestCallbacksDto.errorHandlerCallback(request);
            }
        });
    };
    RequestSender.showError = function (request) {
        var errorMessager = request.responseText;
        if (console) {
            console.error(errorMessager);
        }
        toast.error(errorMessager);
    };
    return RequestSender;
}());
export { RequestSender };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdFNlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlcXVlc3RTZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQztBQUl2RTtJQUlJLHVCQUFtQixXQUFtQixFQUFFLFNBQWlCO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFVSxxQkFBTyxHQUFyQixVQUFzQixHQUFXLEVBQUUsTUFBYyxFQUNoRCxtQkFBd0MsRUFDeEMsY0FBbUIsRUFDbkIsV0FBMkMsRUFDM0MsV0FBMkM7UUFGM0MsK0JBQUEsRUFBQSxtQkFBbUI7UUFDbkIsNEJBQUEsRUFBQSx1QkFBMkM7UUFDM0MsNEJBQUEsRUFBQSx1QkFBMkM7UUFDM0MsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsV0FBVztZQUNqQixXQUFXLEVBQUUsS0FBSztZQUNsQixXQUFXLEVBQUUsV0FBVyxJQUFJLEtBQUs7WUFDakMsT0FBTyxFQUFFLFVBQUMsSUFBNkIsRUFBRSxJQUFtQztnQkFDM0UsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtvQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7Z0JBRUQsSUFBSSxjQUFjLEVBQUU7b0JBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7aUJBQzlCO2dCQUNELG1CQUFtQixDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLENBQUM7WUFDRCxLQUFLLEVBQUUsVUFBQyxPQUE2QjtnQkFDcEMsbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsQ0FBQztTQUNELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFYSx1QkFBUyxHQUF2QixVQUF3QixPQUE2QjtRQUNwRCxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzNDLElBQUksT0FBTyxFQUFFO1lBQ1osT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUN2QjtRQUNQLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQTNDRCxJQTJDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHRvYXN0IGZyb20gJy4uL2xpYi9AYnJlbm9yb29zZXZlbHQvdG9hc3QvbGliL2VzbS90b2FzdC5qcyc7XHJcbmltcG9ydCB0eXBlIHsgS25pZ2h0c1RhbGVEdG8gfSBmcm9tICcuL0R0b3MvS25pZ2h0c1RhbGVEdG8uanMnO1xyXG5pbXBvcnQgdHlwZSB7IFJlcXVlc3RDYWxsYmFja3NEdG8gfSBmcm9tICcuL0R0b3MvUmVxdWVzdENhbGxiYWNrc0R0by5qcyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUmVxdWVzdFNlbmRlciB7XHJcbiAgICBwdWJsaWMgY29sdW1uSW5kZXg6IG51bWJlcjtcclxuICAgIHB1YmxpYyByYW5rSW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoY29sdW1uSW5kZXg6IG51bWJlciwgcmFua0luZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmNvbHVtbkluZGV4ID0gY29sdW1uSW5kZXg7XHJcbiAgICAgICAgdGhpcy5yYW5rSW5kZXggPSByYW5rSW5kZXg7XHJcbiAgICB9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgZXhlY3V0ZSh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsXHJcblx0XHRyZXF1ZXN0Q2FsbGJhY2tzRHRvOiBSZXF1ZXN0Q2FsbGJhY2tzRHRvLFxyXG5cdFx0c3VjY2Vzc01lc3NhZ2UgPSAnJyxcclxuXHRcdHJlcXVlc3REYXRhOiBvYmplY3QgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXHJcblx0XHRjb250ZW50VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0dHlwZTogbWV0aG9kLFxyXG5cdFx0XHRkYXRhOiByZXF1ZXN0RGF0YSxcclxuXHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG5cdFx0XHRjb250ZW50VHlwZTogY29udGVudFR5cGUgfHwgZmFsc2UsXHJcblx0XHRcdHN1Y2Nlc3M6IChkYXRhOiBLbmlnaHRzVGFsZUR0byB8IHN0cmluZywgdGV4dDogSlF1ZXJ5LkFqYXguU3VjY2Vzc1RleHRTdGF0dXMpID0+IHtcclxuXHRcdFx0XHRpZiAodGV4dCAhPSAnc3VjY2VzcycgJiYgY29uc29sZSkge1xyXG5cdFx0XHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRpZiAoc3VjY2Vzc01lc3NhZ2UpIHtcclxuXHRcdFx0XHRcdHRvYXN0LnN1Y2Nlc3Moc3VjY2Vzc01lc3NhZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRyZXF1ZXN0Q2FsbGJhY2tzRHRvLnByb2Nlc3NEYXRhQ2FsbGJhY2soZGF0YSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHtcclxuXHRcdFx0XHRyZXF1ZXN0Q2FsbGJhY2tzRHRvLmVycm9ySGFuZGxlckNhbGxiYWNrKHJlcXVlc3QpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgc2hvd0Vycm9yKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KTogdm9pZCB7XHJcblx0XHRjb25zdCBlcnJvck1lc3NhZ2VyID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XHJcblx0XHRpZiAoY29uc29sZSkge1xyXG5cdFx0XHRjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZXIpO1xyXG4gICAgICAgIH1cclxuXHRcdHRvYXN0LmVycm9yKGVycm9yTWVzc2FnZXIpO1xyXG5cdH1cclxufSJdfQ==