import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Debt } from './entities/debt.entity';
import { DebtPayment } from './entities/debt-payment.entity';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { CreateDebtPaymentDto } from './dto/create-debt-payment.dto';

type DebtSummary = Debt & {
  total_interest:number
  total_fees:number
  total_debt:number
  amount_paid:number
  amount_remaining:number
  installment_value:number
  quotas_paid:number
  quotas_remaining:number
}

@Injectable()
export class DebtsService {
  constructor(
    @InjectRepository(Debt) private debtRepository:Repository<Debt>,
    @InjectRepository(DebtPayment) private debtPaymentRepository:Repository<DebtPayment>
  ){}

  private normalizeNumber(value:number | string | null | undefined){
    return Number(value ?? 0)
  }

  private calculateSummary(debt:Debt):DebtSummary {
    const amount = this.normalizeNumber(debt.amount)
    const percentage = this.normalizeNumber(debt.percentage)
    const managementFee = this.normalizeNumber(debt.management_fee)
    const usageFee = this.normalizeNumber(debt.usage_fee)
    const totalInterest = amount * (percentage / 100)
    const totalFees = managementFee + usageFee
    const totalDebt = amount + totalInterest + totalFees
    const payments = [...(debt.payments ?? [])].sort((left, right) => left.created_at.getTime() - right.created_at.getTime())
    const amountPaid = payments.reduce((total, payment) => total + this.normalizeNumber(payment.amount), 0)
    const amountRemaining = Math.max(totalDebt - amountPaid, 0)
    const installmentValue = debt.quotas > 0 ? totalDebt / debt.quotas : 0
    const quotasPaid = installmentValue > 0 ? Math.min(Math.floor(amountPaid / installmentValue), debt.quotas) : 0
    const quotasRemaining = Math.max(debt.quotas - quotasPaid, 0)

    return {
      ...debt,
      amount,
      percentage,
      management_fee: debt.management_fee === null ? null : managementFee,
      usage_fee: debt.usage_fee === null ? null : usageFee,
      total_interest: totalInterest,
      total_fees: totalFees,
      total_debt: totalDebt,
      amount_paid: amountPaid,
      amount_remaining: amountRemaining,
      installment_value: installmentValue,
      quotas_paid: quotasPaid,
      quotas_remaining: quotasRemaining,
    }
  }

  private async findDebtOrFail(id_debt:number){
    const debt = await this.debtRepository.findOne({
      where:{id_debt},
      relations:{payments:true, user:true},
    })
    if(!debt) throw new NotFoundException({status:'Error',mensaje:'No existe esta deuda'})
    return debt
  }

  private assertDebtAccess(id_role:number, debt:Debt, id_user:number){
    const isAdmin = id_role === 1
    const isOwner = debt.id_user === id_user

    if(!isAdmin && !isOwner){
      throw new ForbiddenException({status:'Error',mensaje:'No tienes permisos para realizar esta acción'})
    }
  }

  async findAll(){
    const debts = await this.debtRepository.find({
      relations:{payments:true, user:true},
      order:{id_debt:'DESC'},
    })
    if(debts.length === 0) throw new NotFoundException({status:'Error',mensaje:'No hay deudas registradas'})
    return debts.map((debt) => this.calculateSummary(debt))
  }

  async findById(id_debt:number, id_user:number, id_role:number){
    const debt = await this.findDebtOrFail(id_debt)
    this.assertDebtAccess(id_role, debt, id_user)
    return this.calculateSummary(debt)
  }

  async findByUserId(id_user:number){
    const debts = await this.debtRepository.find({
      where:{id_user},
      relations:{payments:true, user:true},
      order:{id_debt:'DESC'},
    })
    if(debts.length === 0) throw new NotFoundException({status:'Error',mensaje:'No existen deudas para este usuario'})
    return debts.map((debt) => this.calculateSummary(debt))
  }

  async create(createDebtDto:CreateDebtDto, id_user:number){
    const savedDebt = await this.debtRepository.save({
      ...createDebtDto,
      id_user,
      management_fee: createDebtDto.management_fee ?? null,
      usage_fee: createDebtDto.usage_fee ?? null,
    })
    const fullDebt = await this.findDebtOrFail(savedDebt.id_debt)
    return this.calculateSummary(fullDebt)
  }

  async update(id_debt:number, updateDebtDto:UpdateDebtDto, id_user:number, id_role:number){
    const existsDebt = await this.findDebtOrFail(id_debt)
    this.assertDebtAccess(id_role, existsDebt, id_user)
    const debt = await this.debtRepository.merge(existsDebt, {
      ...updateDebtDto,
      management_fee: updateDebtDto.management_fee ?? existsDebt.management_fee,
      usage_fee: updateDebtDto.usage_fee ?? existsDebt.usage_fee,
    })
    await this.debtRepository.save(debt)
    const fullDebt = await this.findDebtOrFail(id_debt)
    return this.calculateSummary(fullDebt)
  }

  async delete(id_debt:number, id_user:number, id_role:number){
    const debt = await this.findDebtOrFail(id_debt)
    this.assertDebtAccess(id_role, debt, id_user)
    await this.debtRepository.remove(debt)
    return debt
  }

  async addPayment(id_debt:number, createDebtPaymentDto:CreateDebtPaymentDto, id_user:number, id_role:number){
    const debt = await this.findDebtOrFail(id_debt)
    this.assertDebtAccess(id_role, debt, id_user)
    const debtSummary = this.calculateSummary(debt)

    if(createDebtPaymentDto.amount > debtSummary.amount_remaining){
      throw new BadRequestException({status:'Error',mensaje:'El pago no puede ser mayor al saldo pendiente'})
    }

    await this.debtPaymentRepository.save({
      ...createDebtPaymentDto,
      id_debt,
      note: createDebtPaymentDto.note ?? undefined,
    })
    const updatedDebt = await this.findDebtOrFail(id_debt)
    return this.calculateSummary(updatedDebt)
  }
}