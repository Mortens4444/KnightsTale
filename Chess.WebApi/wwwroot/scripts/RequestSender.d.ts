export declare class RequestSender {
    columnIndex: number;
    rankIndex: number;
    constructor(columnIndex: number, rankIndex: number);
    static execute(url: string, method: string, processDataFunction: (responseData: any) => void, requestData?: any, contentType?: string | undefined): void;
    static sendFormData(url: string, method: string, processDataFunction: (responseData: any) => void, requestData?: any): void;
    private static processSuccessResult;
    private static showError;
}
//# sourceMappingURL=RequestSender.d.ts.map