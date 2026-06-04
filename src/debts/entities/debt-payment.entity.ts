import { Debt } from "./debt.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('debt_payments')
export class DebtPayment {
    @PrimaryGeneratedColumn()
    id_debt_payment:number

    @Column({nullable:false})
    id_debt:number

    @ManyToOne(()=> Debt, (debt) => debt.payments, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name:'id_debt'})
    debt:Debt

    @Column({type:'decimal', precision:12, scale:2})
    amount:number

    @Column({type:'varchar', length:255, default:null})
    note:string

    @CreateDateColumn({type:'timestamptz'})
    created_at:Date
}