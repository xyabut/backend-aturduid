import { IsEmail, IsEmpty, IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsEmail()
    emailAddress: string;

    @IsNotEmpty()
    @IsInt()
    roleId: number;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmpty()
    createdBy: string;

}
