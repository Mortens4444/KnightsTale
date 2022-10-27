import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';

export class RequestSender {
    public columnIndex: number;
    public rankIndex: number;

    public constructor(columnIndex: number, rankIndex: number) {
        this.columnIndex = columnIndex;
        this.rankIndex = rankIndex;
    }

	public static execute(url: string, method: string, processDataFunction: (responseData: any) => void, requestData: any = undefined, contentType: string | undefined = undefined): void {
		$.ajax({
			url: url,
			type: method,
			data: requestData,
			processData: false,
			contentType: contentType,
			success: (data: any, text: JQuery.Ajax.SuccessTextStatus) => {
				this.processSuccessResult(data, text, processDataFunction);
			},
			error: (request: JQuery.jqXHR<any>, status: JQuery.Ajax.ErrorTextStatus, error: string) => {
				this.showError(request, status, error);
			}
		});
	}

	public static sendFormData(url: string, method: string, processDataFunction: (responseData: any) => void, requestData: any = undefined): void {
		$.ajax({
			url: url,
			type: method,
			data: requestData,
			processData: false,
			contentType: false,
			success: (data: any, text: JQuery.Ajax.SuccessTextStatus) => {
				this.processSuccessResult(data, text, processDataFunction);
			},
			error: (request: JQuery.jqXHR<any>, status: JQuery.Ajax.ErrorTextStatus, error: string) => {
				this.showError(request, status, error);
			}
		});
	}

	private static processSuccessResult(data: any, text: JQuery.Ajax.SuccessTextStatus, processDataFunction: (responseData: any) => void): void {
		if (text != 'success') {
			console.log(data);
		}

		toast.success('Operation succeeded');
		processDataFunction(data);
	}

	private static showError(request: JQuery.jqXHR<any>, status: JQuery.Ajax.ErrorTextStatus, error: string): void {
		const errorMessager = 'Unable to execute request: ' + status;
		console.error(errorMessager);
		console.error(request + ' ' + error);
		toast.error(errorMessager);
	}
}