import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Repository } from "typeorm";
import { Hashing } from "src/config/security/crypto/hashing.crypto";
import { Auth } from "./entities/auth.entity";
import { LoginDto } from "./dto/login.dto";
import { ResponseModel } from "src/model/response";
import { ResponseUtils } from "src/common/utils/response_utils";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Auth)
        private authRepository: Repository<Auth>,
        private hashing: Hashing,
        private jwtService: JwtService) {}

    async login(loginBody: LoginDto) {
        var responseModel = new ResponseModel();

        var dataUser = await this.userRepository.findOne({where: {
            userId: loginBody.userId
        }})

        if (dataUser == null) {
            return ResponseUtils.create(false, 200, null, "Wrong user id");
        }
        
        var dataAuth = await this.authRepository.findOne({
            where: {
                isDeleted: 0,
                userId: loginBody.userId
            }
        })

        if (dataAuth?.isLocked == 1) {
            return ResponseUtils.create(false, 200, null, "User locked, Please contact Administrator to unlock");
        }

        // var inputPassHash = await this.hashing.passHash(loginBody.password);
        const isMatch = await bcrypt.compare(dataUser.password, loginBody.password);


        // inputPassHash !== dataUser.password
        if (isMatch) {
            var messageResponse = "Wrong password";
            if (dataAuth != null) {
                //TODO get threshold failed login from table param
                var isLocked = dataAuth.isLocked;
                var totalFailedLogin = dataAuth.totalFailedLogin;

                totalFailedLogin++;
                if (totalFailedLogin == 5) {
                    isLocked = 1;
                    messageResponse = "Your account is locked, Please contact Administrator"; 
                }

                await this.authRepository.update({uuid: dataAuth.uuid}, {
                    totalFailedLogin: totalFailedLogin,
                    isLocked: isLocked,
                    updatedAt: new Date(),
                    updatedBy: dataUser.uuid
                })
            }

            return ResponseUtils.create(false, 200, null, messageResponse);
        }

        const payload = { userId: dataUser.userId, email: dataUser.emailAddress, roleId: dataUser.roleId, uuid:dataUser.uuid };
        var accessToken = await this.jwtService.signAsync(payload);

        if (dataAuth != null ) {
            await this.authRepository.update({uuid: dataAuth.uuid}, {
                accessToken: accessToken,
                updatedAt: new Date(),
                updatedBy: dataUser.uuid,
                lastLogin: new Date(),
                totalFailedLogin: 0,
            });
        }


        return ResponseUtils.create(true, 200, {
            accessToken: accessToken,
            days: 7,
            //TODO add expired date
        }, "Success login")

    }

    async logout(accessToken:string) {

    }

}