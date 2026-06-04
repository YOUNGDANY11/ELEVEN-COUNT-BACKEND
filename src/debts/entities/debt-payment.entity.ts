import { ApiProperty } from '@nestjs/swagger';
import { Debt } from "./debt.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('debt_payments')
export class DebtPayment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id_debt_payment!:number

    @Column({nullable:false})
    @ApiProperty()
    id_debt!:number

    @ManyToOne(()=> Debt, (debt) => debt.payments, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name:'id_debt'})
    @ApiProperty({ type: () => Debt })
    debt!:Debt

    @Column({type:'decimal', precision:12, scale:2})
    @ApiProperty()
    amount!:number

    @Column({type:'varchar', length:255, nullable:true, default:null})
    @ApiProperty({ required: false, nullable: true })
    note!:string | null

    @CreateDateColumn({type:'timestamptz'})
    @ApiProperty({ type: String, format: 'date-time' })
    created_at!:Date
}