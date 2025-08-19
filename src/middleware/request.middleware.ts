import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

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