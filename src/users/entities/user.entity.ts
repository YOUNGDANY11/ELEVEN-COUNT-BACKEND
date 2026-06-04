import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id_user:number

    @Column({nullable:false, length:100})
    name:string

    @Column({nullable:false,length:100})
    lastname:string

    @Column({nullable:false,length:150})
    email:string

    @Column({nullable:false,length:255})
    password:string

    @CreateDateColumn({type:'timestamptz'})
    created_at:Date

    @UpdateDateColumn({type:'timestamptz'})
    updated_at:Date
}
