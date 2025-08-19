import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../users/entities/user.entity";
import { Auth } from "./entities/auth.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { Hashing } from "src/config/security/crypto/hashing.crypto";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([User, Auth])],
    providers: [AuthService, Hashing],
    controllers: [AuthController],
})

export class AuthModule {}