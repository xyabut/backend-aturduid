import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import type { Request, Response } from "express";
import { ResponseUtils } from "src/common/utils/response_utils";

@Controller("api")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("/login")
    login(@Body() bodyLogin: LoginDto, @Res() response: Response) {
        this.authService.login(bodyLogin).then((value) => {
            response.statusCode = value.statusCode;
            response.send(value);
        }).catch((message) => {
            console.log(message);
            response.statusCode = 500;
            response.send(ResponseUtils.createError("Error login"));
        });
    }

    @Post("/logout")
    logout(@Req() request: Request) {
        var token = request.headers['authorization'];
    }
}