export class RequestCallbacksDto {
    public processDataCallback: (responseData: any) => void;
    public errorHandlerCallback: (request: JQuery.jqXHR<object>) => void;

    public constructor(processDataCallback: (responseData: any) => void,
        errorHandlerCallback: (request: JQuery.jqXHR<object>) => void) {
        this.processDataCallback = processDataCallback;
        this.errorHandlerCallback = errorHandlerCallback;
    }
}