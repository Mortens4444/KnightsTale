import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';
var RequestSender = /** @class */ (function () {
    function RequestSender(columnIndex, rankIndex) {
        this.columnIndex = columnIndex;
        this.rankIndex = rankIndex;
    }
    RequestSender.execute = function (url, method, requestCallbacksDto, successMessage, requestData, contentType) {
        var _this = this;
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
                _this.processSuccessResult(successMessage, data, text, requestCallbacksDto.processDataCallback);
            },
            error: function (request) {
                requestCallbacksDto.errorHandlerCallback(request);
            }
        });
    };
    RequestSender.showError = function (request) {
        var errorMessager = request.responseText;
        console.error(errorMessager);
        toast.error(errorMessager);
    };
    RequestSender.processSuccessResult = function (successMessage, data, text, processDataCallback) {
        if (text != 'success') {
            console.log(data);
        }
        if (successMessage) {
            toast.success(successMessage);
        }
        processDataCallback(data);
    };
    return RequestSender;
}());
export { RequestSender };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdFNlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlcXVlc3RTZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQztBQUl2RTtJQUlJLHVCQUFtQixXQUFtQixFQUFFLFNBQWlCO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFVSxxQkFBTyxHQUFyQixVQUFzQixHQUFXLEVBQUUsTUFBYyxFQUNoRCxtQkFBd0MsRUFDeEMsY0FBbUIsRUFDbkIsV0FBMkMsRUFDM0MsV0FBMkM7UUFKNUMsaUJBa0JDO1FBaEJBLCtCQUFBLEVBQUEsbUJBQW1CO1FBQ25CLDRCQUFBLEVBQUEsdUJBQTJDO1FBQzNDLDRCQUFBLEVBQUEsdUJBQTJDO1FBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLFdBQVc7WUFDakIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsV0FBVyxFQUFFLFdBQVcsSUFBSSxLQUFLO1lBQ2pDLE9BQU8sRUFBRSxVQUFDLElBQTZCLEVBQUUsSUFBbUM7Z0JBQzNFLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ2hHLENBQUM7WUFDRCxLQUFLLEVBQUUsVUFBQyxPQUE2QjtnQkFDcEMsbUJBQW1CLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDbkQsQ0FBQztTQUNELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFYSx1QkFBUyxHQUF2QixVQUF3QixPQUE2QjtRQUNwRCxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRWMsa0NBQW9CLEdBQW5DLFVBQW9DLGNBQXNCLEVBQUUsSUFBNkIsRUFBRSxJQUFtQyxFQUFFLG1CQUFvRTtRQUNuTSxJQUFJLElBQUksSUFBSSxTQUFTLEVBQUU7WUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQjtRQUVELElBQUksY0FBYyxFQUFFO1lBQ25CLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDeEI7UUFDUCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdG9hc3QgZnJvbSAnLi4vbGliL0BicmVub3Jvb3NldmVsdC90b2FzdC9saWIvZXNtL3RvYXN0LmpzJztcclxuaW1wb3J0IHR5cGUgeyBLbmlnaHRzVGFsZUR0byB9IGZyb20gJy4vRHRvcy9LbmlnaHRzVGFsZUR0by5qcyc7XHJcbmltcG9ydCB0eXBlIHsgUmVxdWVzdENhbGxiYWNrc0R0byB9IGZyb20gJy4vRHRvcy9SZXF1ZXN0Q2FsbGJhY2tzRHRvLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VuZGVyIHtcclxuICAgIHB1YmxpYyBjb2x1bW5JbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJhbmtJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2x1bW5JbmRleDogbnVtYmVyLCByYW5rSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleDtcclxuICAgICAgICB0aGlzLnJhbmtJbmRleCA9IHJhbmtJbmRleDtcclxuICAgIH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBleGVjdXRlKHVybDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyxcclxuXHRcdHJlcXVlc3RDYWxsYmFja3NEdG86IFJlcXVlc3RDYWxsYmFja3NEdG8sXHJcblx0XHRzdWNjZXNzTWVzc2FnZSA9ICcnLFxyXG5cdFx0cmVxdWVzdERhdGE6IG9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcclxuXHRcdGNvbnRlbnRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiB2b2lkIHtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHR0eXBlOiBtZXRob2QsXHJcblx0XHRcdGRhdGE6IHJlcXVlc3REYXRhLFxyXG5cdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSB8fCBmYWxzZSxcclxuXHRcdFx0c3VjY2VzczogKGRhdGE6IEtuaWdodHNUYWxlRHRvIHwgc3RyaW5nLCB0ZXh0OiBKUXVlcnkuQWpheC5TdWNjZXNzVGV4dFN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc1N1Y2Nlc3NSZXN1bHQoc3VjY2Vzc01lc3NhZ2UsIGRhdGEsIHRleHQsIHJlcXVlc3RDYWxsYmFja3NEdG8ucHJvY2Vzc0RhdGFDYWxsYmFjayk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pID0+IHtcclxuXHRcdFx0XHRyZXF1ZXN0Q2FsbGJhY2tzRHRvLmVycm9ySGFuZGxlckNhbGxiYWNrKHJlcXVlc3QpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHB1YmxpYyBzdGF0aWMgc2hvd0Vycm9yKHJlcXVlc3Q6IEpRdWVyeS5qcVhIUjxvYmplY3Q+KTogdm9pZCB7XHJcblx0XHRjb25zdCBlcnJvck1lc3NhZ2VyID0gcmVxdWVzdC5yZXNwb25zZVRleHQ7XHJcblx0XHRjb25zb2xlLmVycm9yKGVycm9yTWVzc2FnZXIpO1xyXG5cdFx0dG9hc3QuZXJyb3IoZXJyb3JNZXNzYWdlcik7XHJcblx0fVxyXG5cclxuXHRwcml2YXRlIHN0YXRpYyBwcm9jZXNzU3VjY2Vzc1Jlc3VsdChzdWNjZXNzTWVzc2FnZTogc3RyaW5nLCBkYXRhOiBLbmlnaHRzVGFsZUR0byB8IHN0cmluZywgdGV4dDogSlF1ZXJ5LkFqYXguU3VjY2Vzc1RleHRTdGF0dXMsIHByb2Nlc3NEYXRhQ2FsbGJhY2s6IChyZXNwb25zZURhdGE6IEtuaWdodHNUYWxlRHRvIHwgc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XHJcblx0XHRpZiAodGV4dCAhPSAnc3VjY2VzcycpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYgKHN1Y2Nlc3NNZXNzYWdlKSB7XHJcblx0XHRcdHRvYXN0LnN1Y2Nlc3Moc3VjY2Vzc01lc3NhZ2UpO1xyXG4gICAgICAgIH1cclxuXHRcdHByb2Nlc3NEYXRhQ2FsbGJhY2soZGF0YSk7XHJcblx0fVxyXG59Il19