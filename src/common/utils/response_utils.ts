import { ResponseModel } from "src/model/response";

export class ResponseUtils {

    static create(status: boolean, statusCode: number, data: any, message: string) : ResponseModel {
        var respModel = new ResponseModel();
        respModel.status = status;
        respModel.statusCode = statusCode;
        respModel.data = data;
        respModel.message = message;
        return respModel;
    }

    static createError(message: string) : ResponseModel {
        var respModel = new ResponseModel();
        respModel.status = false;
        respModel.statusCode = 500;
        respModel.data = {};
        respModel.message = message;
        return respModel;
    }
}