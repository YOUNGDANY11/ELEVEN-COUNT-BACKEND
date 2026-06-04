import { User } from "src/users/entities/user.entity";
import { DebtPayment } from "./debt-payment.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('debts')
export class Debt {
    @PrimaryGeneratedColumn()
    id_debt:number

    @Column({nullable:false})
    id_user:number

    @ManyToOne(()=> User, (user) => user.debt, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name:'id_user'})
    user:User

    @Column({nullable:false, length:100})
    name:string

    @Column({type:'decimal', precision:12, scale:2})
    amount:number

    @Column({type:'int'})
    quotas:number

    @Column({type:'decimal', precision:5, scale:2})
    percentage:number

    @Column({type:'decimal', precision:12, scale:2, nullable:true, default:null})
    management_fee:number | null

    @Column({type:'decimal', precision:12, scale:2, nullable:true, default:null})
    usage_fee:number | null

    @CreateDateColumn({type:'timestamptz'})
    created_at:Date

    @UpdateDateColumn({type:'timestamptz'})
    updated_at:Date

    @OneToMany(()=> DebtPayment, (payment) => payment.debt, {cascade:true})
    payments:DebtPayment[]
}