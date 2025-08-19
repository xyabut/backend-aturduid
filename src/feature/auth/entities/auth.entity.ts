import { BaseModel } from "src/model/base";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'auth'})
export class Auth extends BaseModel {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        length: 10
    })
    userId: string;

    @Column({
        name: 'total_failed_login'
    })
    totalFailedLogin: number;

    @Column({
        name: 'last_login'
    })
    lastLogin: Date;

    @Column({
        name: 'is_locked'
    })
    isLocked: number;

    @Column({
        name: 'is_deleted',
        type: 'int4'
    })
    isDeleted: number;

    @Column({
        name: 'access_token',
        type: 'text',
    })
    accessToken: string;

    @Column({
        name: 'last_logout'
    })
    lastLogout: Date;
}