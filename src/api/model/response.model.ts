import { Response as NativeResponse } from "express";
import { statusMessages } from "src/constants/app.contants";

export class Response<T> {
    public error: boolean;
    public statusCode: number;
    public statusMessage: number;
    public message: string;
    public data?: T;
    public error_details?: T;

    constructor(init: Partial<Response<T>>) {
        Object.assign(this, init);
    }

    private static send<T>(res: NativeResponse, data: Partial<Response<T>>){
        const responseBody = new Response<T>(data);
        return res.status(responseBody.statusCode).send(responseBody)
    }

    public static error<T = Record<string, unknown>>(res: NativeResponse, data: Pick<Response<T>, 'statusCode' | 'message' | 'error_details'>) {
        const responseBody = {error: true, statusMessage: statusMessages[data.statusCode], ...data};
        return this.send(res, responseBody)
    }

    public static success<T = Record<string, unknown>>(
        res: NativeResponse,
        data: Pick<Response<T>, 'statusCode' | 'message' | 'data'>
    ){
        const responseBody = {error: false, statusMessage: statusMessages[data.statusCode], ...data};
        return this.send<T>(res, responseBody)
    }
}
