import * as toast from '../lib/@brenoroosevelt/toast/lib/esm/toast.js';
import type { KnightsTaleDto } from './Dtos/KnightsTaleDto.js';
import type { RequestCallbacksDto } from './Dtos/RequestCallbacksDto.js';

export class RequestSender {
    public columnIndex: number;
    public rankIndex: number;

    public constructor(columnIndex: number, rankIndex: number) {
        this.columnIndex = columnIndex;
        this.rankIndex = rankIndex;
    }

	public static execute(url: string, method: string,
		requestCallbacksDto: RequestCallbacksDto,
		successMessage = '',
		requestData: object | undefined = undefined,
		contentType: string | undefined = undefined): void {
		$.ajax({
			url: url,
			type: method,
			data: requestData,
			processData: false,
			contentType: contentType || false,
			success: (data: KnightsTaleDto | string, text: JQuery.Ajax.SuccessTextStatus) => {
				if (text != 'success' && console) {
					console.log(data);
				}

				if (successMessage) {
					toast.success(successMessage);
				}
				requestCallbacksDto.processDataCallback(data);
			},
			error: (request: JQuery.jqXHR<object>) => {
				requestCallbacksDto.errorHandlerCallback(request);
			}
		});
	}

	public static showError(request: JQuery.jqXHR<object>): void {
		const errorMessager = request.responseText;
		if (console) {
			console.error(errorMessager);
        }
		toast.error(errorMessager);
	}
}