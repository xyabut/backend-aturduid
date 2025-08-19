import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseModel {

    @Column({
        name: 'uuids',
        type: 'varchar'
    })
    uuid: string;

    @Column({
        name: 'created_at',
        type: 'timestamp without time zone'
    })
    createdAt: Date;

    @Column({
        name: 'created_by',
        type: 'varchar'
    })
    createdBy: string;

    @Column({
        name: 'updated_at',
        type: 'timestamp without time zone'
    })
    updatedAt: Date;

    @Column({
        name: 'updated_by',
        type: 'varchar'
    })
    updatedBy: string;

    @Column({
        name: 'deleted_at',
        type: 'timestamp without time zone'
    })
    deletedAt: Date;

    @Column({
        name: 'deleted_by',
        type: 'varchar'
    })
    deletedBy: string;
}