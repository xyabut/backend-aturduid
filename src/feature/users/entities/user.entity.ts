
import { Role } from 'src/feature/roles/entities/role.entity';
import { BaseModel } from 'src/model/base';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
@Entity({
    name: 'users',
    schema: 'public'
})
export class User extends BaseModel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'user_id',
        length: 10
    })
    userId: string;

    @Column()
    password: string;   

    @Column({
        name: 'role_id',
        type: 'int4'
    })
    roleId: number;

    @OneToOne(() => Role, {
        eager:true
    })
    @JoinColumn({referencedColumnName: 'id', name: 'role_id'})
    role: Role;

    @Column({
        name: 'email_address',
        type: 'varchar'
    })
    emailAddress: string;

    @Column({
        name: 'is_deleted',
        type: 'int4'
    })
    isDeleted: number;
}
