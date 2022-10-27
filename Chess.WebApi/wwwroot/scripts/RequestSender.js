import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';
var RequestSender = /** @class */ (function () {
    function RequestSender(columnIndex, rankIndex) {
        this.columnIndex = columnIndex;
        this.rankIndex = rankIndex;
    }
    RequestSender.execute = function (url, method, processDataFunction, requestData, contentType) {
        var _this = this;
        if (requestData === void 0) { requestData = undefined; }
        if (contentType === void 0) { contentType = undefined; }
        $.ajax({
            url: url,
            type: method,
            data: requestData,
            processData: false,
            contentType: contentType,
            success: function (data, text) {
                _this.processSuccessResult(data, text, processDataFunction);
            },
            error: function (request, status, error) {
                _this.showError(request, status, error);
            }
        });
    };
    RequestSender.sendFormData = function (url, method, processDataFunction, requestData) {
        var _this = this;
        if (requestData === void 0) { requestData = undefined; }
        $.ajax({
            url: url,
            type: method,
            data: requestData,
            processData: false,
            contentType: false,
            success: function (data, text) {
                _this.processSuccessResult(data, text, processDataFunction);
            },
            error: function (request, status, error) {
                _this.showError(request, status, error);
            }
        });
    };
    RequestSender.processSuccessResult = function (data, text, processDataFunction) {
        if (text != 'success') {
            console.log(data);
        }
        toast.success('Operation succeeded');
        processDataFunction(data);
    };
    RequestSender.showError = function (request, status, error) {
        var errorMessager = 'Unable to execute request: ' + status;
        console.error(errorMessager);
        console.error(request + ' ' + error);
        toast.error(errorMessager);
    };
    return RequestSender;
}());
export { RequestSender };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxdWVzdFNlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJlcXVlc3RTZW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxLQUFLLEtBQUssTUFBTSwrQ0FBK0MsQ0FBQztBQUV2RTtJQUlJLHVCQUFtQixXQUFtQixFQUFFLFNBQWlCO1FBQ3JELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7SUFFVSxxQkFBTyxHQUFyQixVQUFzQixHQUFXLEVBQUUsTUFBYyxFQUFFLG1CQUFnRCxFQUFFLFdBQTRCLEVBQUUsV0FBMkM7UUFBOUssaUJBY0M7UUFkb0csNEJBQUEsRUFBQSx1QkFBNEI7UUFBRSw0QkFBQSxFQUFBLHVCQUEyQztRQUM3SyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ04sR0FBRyxFQUFFLEdBQUc7WUFDUixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxXQUFXO1lBQ2pCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLE9BQU8sRUFBRSxVQUFDLElBQVMsRUFBRSxJQUFtQztnQkFDdkQsS0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztZQUM1RCxDQUFDO1lBQ0QsS0FBSyxFQUFFLFVBQUMsT0FBMEIsRUFBRSxNQUFtQyxFQUFFLEtBQWE7Z0JBQ3JGLEtBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4QyxDQUFDO1NBQ0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVhLDBCQUFZLEdBQTFCLFVBQTJCLEdBQVcsRUFBRSxNQUFjLEVBQUUsbUJBQWdELEVBQUUsV0FBNEI7UUFBdEksaUJBY0M7UUFkeUcsNEJBQUEsRUFBQSx1QkFBNEI7UUFDckksQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNOLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixJQUFJLEVBQUUsV0FBVztZQUNqQixXQUFXLEVBQUUsS0FBSztZQUNsQixXQUFXLEVBQUUsS0FBSztZQUNsQixPQUFPLEVBQUUsVUFBQyxJQUFTLEVBQUUsSUFBbUM7Z0JBQ3ZELEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixDQUFDLENBQUM7WUFDNUQsQ0FBQztZQUNELEtBQUssRUFBRSxVQUFDLE9BQTBCLEVBQUUsTUFBbUMsRUFBRSxLQUFhO2dCQUNyRixLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDeEMsQ0FBQztTQUNELENBQUMsQ0FBQztJQUNKLENBQUM7SUFFYyxrQ0FBb0IsR0FBbkMsVUFBb0MsSUFBUyxFQUFFLElBQW1DLEVBQUUsbUJBQWdEO1FBQ25JLElBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTtZQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3JDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFYyx1QkFBUyxHQUF4QixVQUF5QixPQUEwQixFQUFFLE1BQW1DLEVBQUUsS0FBYTtRQUN0RyxJQUFNLGFBQWEsR0FBRyw2QkFBNkIsR0FBRyxNQUFNLENBQUM7UUFDN0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUM3QixPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBeERELElBd0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgdG9hc3QgZnJvbSAnLi4vbGliL0BicmVub3Jvb3NldmVsdC90b2FzdC9saWIvZXNtL3RvYXN0LmpzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0U2VuZGVyIHtcclxuICAgIHB1YmxpYyBjb2x1bW5JbmRleDogbnVtYmVyO1xyXG4gICAgcHVibGljIHJhbmtJbmRleDogbnVtYmVyO1xyXG5cclxuICAgIHB1YmxpYyBjb25zdHJ1Y3Rvcihjb2x1bW5JbmRleDogbnVtYmVyLCByYW5rSW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuY29sdW1uSW5kZXggPSBjb2x1bW5JbmRleDtcclxuICAgICAgICB0aGlzLnJhbmtJbmRleCA9IHJhbmtJbmRleDtcclxuICAgIH1cclxuXHJcblx0cHVibGljIHN0YXRpYyBleGVjdXRlKHVybDogc3RyaW5nLCBtZXRob2Q6IHN0cmluZywgcHJvY2Vzc0RhdGFGdW5jdGlvbjogKHJlc3BvbnNlRGF0YTogYW55KSA9PiB2b2lkLCByZXF1ZXN0RGF0YTogYW55ID0gdW5kZWZpbmVkLCBjb250ZW50VHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkKTogdm9pZCB7XHJcblx0XHQkLmFqYXgoe1xyXG5cdFx0XHR1cmw6IHVybCxcclxuXHRcdFx0dHlwZTogbWV0aG9kLFxyXG5cdFx0XHRkYXRhOiByZXF1ZXN0RGF0YSxcclxuXHRcdFx0cHJvY2Vzc0RhdGE6IGZhbHNlLFxyXG5cdFx0XHRjb250ZW50VHlwZTogY29udGVudFR5cGUsXHJcblx0XHRcdHN1Y2Nlc3M6IChkYXRhOiBhbnksIHRleHQ6IEpRdWVyeS5BamF4LlN1Y2Nlc3NUZXh0U3RhdHVzKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5wcm9jZXNzU3VjY2Vzc1Jlc3VsdChkYXRhLCB0ZXh0LCBwcm9jZXNzRGF0YUZ1bmN0aW9uKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0ZXJyb3I6IChyZXF1ZXN0OiBKUXVlcnkuanFYSFI8YW55Piwgc3RhdHVzOiBKUXVlcnkuQWpheC5FcnJvclRleHRTdGF0dXMsIGVycm9yOiBzdHJpbmcpID0+IHtcclxuXHRcdFx0XHR0aGlzLnNob3dFcnJvcihyZXF1ZXN0LCBzdGF0dXMsIGVycm9yKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRwdWJsaWMgc3RhdGljIHNlbmRGb3JtRGF0YSh1cmw6IHN0cmluZywgbWV0aG9kOiBzdHJpbmcsIHByb2Nlc3NEYXRhRnVuY3Rpb246IChyZXNwb25zZURhdGE6IGFueSkgPT4gdm9pZCwgcmVxdWVzdERhdGE6IGFueSA9IHVuZGVmaW5lZCk6IHZvaWQge1xyXG5cdFx0JC5hamF4KHtcclxuXHRcdFx0dXJsOiB1cmwsXHJcblx0XHRcdHR5cGU6IG1ldGhvZCxcclxuXHRcdFx0ZGF0YTogcmVxdWVzdERhdGEsXHJcblx0XHRcdHByb2Nlc3NEYXRhOiBmYWxzZSxcclxuXHRcdFx0Y29udGVudFR5cGU6IGZhbHNlLFxyXG5cdFx0XHRzdWNjZXNzOiAoZGF0YTogYW55LCB0ZXh0OiBKUXVlcnkuQWpheC5TdWNjZXNzVGV4dFN0YXR1cykgPT4ge1xyXG5cdFx0XHRcdHRoaXMucHJvY2Vzc1N1Y2Nlc3NSZXN1bHQoZGF0YSwgdGV4dCwgcHJvY2Vzc0RhdGFGdW5jdGlvbik7XHJcblx0XHRcdH0sXHJcblx0XHRcdGVycm9yOiAocmVxdWVzdDogSlF1ZXJ5LmpxWEhSPGFueT4sIHN0YXR1czogSlF1ZXJ5LkFqYXguRXJyb3JUZXh0U3RhdHVzLCBlcnJvcjogc3RyaW5nKSA9PiB7XHJcblx0XHRcdFx0dGhpcy5zaG93RXJyb3IocmVxdWVzdCwgc3RhdHVzLCBlcnJvcik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cHJpdmF0ZSBzdGF0aWMgcHJvY2Vzc1N1Y2Nlc3NSZXN1bHQoZGF0YTogYW55LCB0ZXh0OiBKUXVlcnkuQWpheC5TdWNjZXNzVGV4dFN0YXR1cywgcHJvY2Vzc0RhdGFGdW5jdGlvbjogKHJlc3BvbnNlRGF0YTogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcblx0XHRpZiAodGV4dCAhPSAnc3VjY2VzcycpIHtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHR9XHJcblxyXG5cdFx0dG9hc3Quc3VjY2VzcygnT3BlcmF0aW9uIHN1Y2NlZWRlZCcpO1xyXG5cdFx0cHJvY2Vzc0RhdGFGdW5jdGlvbihkYXRhKTtcclxuXHR9XHJcblxyXG5cdHByaXZhdGUgc3RhdGljIHNob3dFcnJvcihyZXF1ZXN0OiBKUXVlcnkuanFYSFI8YW55Piwgc3RhdHVzOiBKUXVlcnkuQWpheC5FcnJvclRleHRTdGF0dXMsIGVycm9yOiBzdHJpbmcpOiB2b2lkIHtcclxuXHRcdGNvbnN0IGVycm9yTWVzc2FnZXIgPSAnVW5hYmxlIHRvIGV4ZWN1dGUgcmVxdWVzdDogJyArIHN0YXR1cztcclxuXHRcdGNvbnNvbGUuZXJyb3IoZXJyb3JNZXNzYWdlcik7XHJcblx0XHRjb25zb2xlLmVycm9yKHJlcXVlc3QgKyAnICcgKyBlcnJvcik7XHJcblx0XHR0b2FzdC5lcnJvcihlcnJvck1lc3NhZ2VyKTtcclxuXHR9XHJcbn0iXX0=