import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { ResponseUtils } from "src/utils/response_utils";

export class RequestMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        if (req.headers["content-type"] == 'application/json') {
            next();
        } else {
            res.statusCode = 400;
            res.send();
            // res.send(ResponseUtils.createError("Bad"));
        }
    }
    
}