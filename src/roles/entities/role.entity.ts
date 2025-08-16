import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseModel } from '../../model/base';

@Entity({
    name: 'users_roles',
    schema: 'public'
})
export class Role extends BaseModel {
    @PrimaryGeneratedColumn({
        type: "int4"
    })
    id: number;

    @Column({
        name: 'role_name',
        type: 'varchar',
    })
    roleName: string;

    @Column({
        name: 'is_deleted',
        type: 'int4'
    })
    isDeleted: number;

}
