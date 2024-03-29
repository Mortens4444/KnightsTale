//import toast from '@brenoroosevelt/toast/lib/esm/toast.js';
import { error, success } from '@brenoroosevelt/toast/lib/esm/toast.js';
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
            contentType: contentType !== null && contentType !== void 0 ? contentType : false,
            success: function (data, text) {
                if (text != 'success' && console) {
                    console.log(data);
                }
                if (successMessage) {
                    success(successMessage);
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
        error(errorMessager);
    };
    return RequestSender;
}());
export { RequestSender };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdFNlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlcXVlc3RTZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsNkRBQTZEO0FBQzdELE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFLeEU7SUFJSSx1QkFBbUIsV0FBbUIsRUFBRSxTQUFpQjtRQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBRVUscUJBQU8sR0FBckIsVUFBc0IsR0FBVyxFQUFFLE1BQWMsRUFDaEQsbUJBQXdDLEVBQ3hDLGNBQW1CLEVBQ25CLFdBQTJDLEVBQzNDLFdBQTJDO1FBRjNDLCtCQUFBLEVBQUEsbUJBQW1CO1FBQ25CLDRCQUFBLEVBQUEsdUJBQTJDO1FBQzNDLDRCQUFBLEVBQUEsdUJBQTJDO1FBQzNDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDTixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osSUFBSSxFQUFFLFdBQVc7WUFDakIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsV0FBVyxFQUFFLFdBQVcsYUFBWCxXQUFXLGNBQVgsV0FBVyxHQUFJLEtBQUs7WUFDakMsT0FBTyxFQUFFLFVBQUMsSUFBNkIsRUFBRSxJQUFtQztnQkFDM0UsSUFBSSxJQUFJLElBQUksU0FBUyxJQUFJLE9BQU8sRUFBRTtvQkFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7Z0JBRUQsSUFBSSxjQUFjLEVBQUU7b0JBQ25CLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztpQkFDeEI7Z0JBQ0QsbUJBQW1CLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsQ0FBQztZQUNELEtBQUssRUFBRSxVQUFDLE9BQTZCO2dCQUNwQyxtQkFBbUIsQ0FBQyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNuRCxDQUFDO1NBQ0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVhLHVCQUFTLEdBQXZCLFVBQXdCLE9BQTZCO1FBQ3BELElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7UUFDM0MsSUFBSSxPQUFPLEVBQUU7WUFDWixPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3ZCO1FBQ1AsS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3RCLENBQUM7SUFDRixvQkFBQztBQUFELENBQUMsQUEzQ0QsSUEyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvL2ltcG9ydCB0b2FzdCBmcm9tICdAYnJlbm9yb29zZXZlbHQvdG9hc3QvbGliL2VzbS90b2FzdC5qcyc7XHJcbmltcG9ydCB7IGVycm9yLCBzdWNjZXNzIH0gZnJvbSAnQGJyZW5vcm9vc2V2ZWx0L3RvYXN0L2xpYi9lc20vdG9hc3QuanMnO1xyXG5cclxuaW1wb3J0IHR5cGUgeyBLbmlnaHRzVGFsZUR0byB9IGZyb20gJy4vRHRvcy9LbmlnaHRzVGFsZUR0by5qcyc7XHJcbmltcG9ydCB0eXBlIHsgUmVxdWVzdENhbGxiYWNrc0R0byB9IGZyb20gJy4vRHRvcy9SZXF1ZXN0Q2FsbGJhY2tzRHRvLmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VuZGVyIHtcclxuICAgIHB1YmxpYyBjb2x1bW5JbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJhbmtJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2x1bW5JbmRleDogbnVtYmVyLCByYW5rSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleDtcclxuICAgICAgICB0aGlzLnJhbmtJbmRleCA9IHJhbmtJbmRleDtcclxuICAgIH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBleGVjdXRlKHVybDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZyxcclxuXHRcdHJlcXVlc3RDYWxsYmFja3NEdG86IFJlcXVlc3RDYWxsYmFja3NEdG8sXHJcblx0XHRzdWNjZXNzTWVzc2FnZSA9ICcnLFxyXG5cdFx0cmVxdWVzdERhdGE6IG9iamVjdCB8IHVuZGVmaW5lZCA9IHVuZGVmaW5lZCxcclxuXHRcdGNvbnRlbnRUeXBlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQpOiB2b2lkIHtcclxuXHRcdCQuYWpheCh7XHJcblx0XHRcdHVybDogdXJsLFxyXG5cdFx0XHR0eXBlOiBtZXRob2QsXHJcblx0XHRcdGRhdGE6IHJlcXVlc3REYXRhLFxyXG5cdFx0XHRwcm9jZXNzRGF0YTogZmFsc2UsXHJcblx0XHRcdGNvbnRlbnRUeXBlOiBjb250ZW50VHlwZSA/PyBmYWxzZSxcclxuXHRcdFx0c3VjY2VzczogKGRhdGE6IEtuaWdodHNUYWxlRHRvIHwgc3RyaW5nLCB0ZXh0OiBKUXVlcnkuQWpheC5TdWNjZXNzVGV4dFN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdGlmICh0ZXh0ICE9ICdzdWNjZXNzJyAmJiBjb25zb2xlKSB7XHJcblx0XHRcdFx0XHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdGlmIChzdWNjZXNzTWVzc2FnZSkge1xyXG5cdFx0XHRcdFx0c3VjY2VzcyhzdWNjZXNzTWVzc2FnZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdHJlcXVlc3RDYWxsYmFja3NEdG8ucHJvY2Vzc0RhdGFDYWxsYmFjayhkYXRhKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8b2JqZWN0PikgPT4ge1xyXG5cdFx0XHRcdHJlcXVlc3RDYWxsYmFja3NEdG8uZXJyb3JIYW5kbGVyQ2FsbGJhY2socmVxdWVzdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBzaG93RXJyb3IocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPG9iamVjdD4pOiB2b2lkIHtcclxuXHRcdGNvbnN0IGVycm9yTWVzc2FnZXIgPSByZXF1ZXN0LnJlc3BvbnNlVGV4dDtcclxuXHRcdGlmIChjb25zb2xlKSB7XHJcblx0XHRcdGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlcik7XHJcbiAgICAgICAgfVxyXG5cdFx0ZXJyb3IoZXJyb3JNZXNzYWdlcik7XHJcblx0fVxyXG59Il19