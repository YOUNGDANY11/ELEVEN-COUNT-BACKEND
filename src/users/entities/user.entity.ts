import { Movement } from "src/movements/entities/movement.entity";
import { Debt } from "src/debts/entities/debt.entity";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id_user:number

    @Column({nullable:false})
    id_role:number

    @ManyToOne(()=> Role, (role) => role.users)
    @JoinColumn({name:'id_role'})
    role: Role

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

    @OneToMany(()=> Movement, (movement) => movement.user, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    movement: Movement[]

    @OneToMany(()=> Debt, (debt) => debt.user, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    debt: Debt[]
}
