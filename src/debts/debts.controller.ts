import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { CreateDebtPaymentDto } from './dto/create-debt-payment.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Roles(Role.ADMIN, Role.USER)
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll(){
    return this.debtsService.findAll()
  }

  @Get('id/:id')
  findOneById(@Param('id',ParseIntPipe) id_debt:number){
    return this.debtsService.findById(id_debt)
  }

  @Roles(Role.ADMIN)
  @Get('user/:id')
  findByUserId(@Param('id',ParseIntPipe) id_user:number){
    return this.debtsService.findByUserId(id_user)
  }

  @Get('mine')
  findMine(@GetUser() user:User){
    return this.debtsService.findByUserId(user.id_user)
  }

  @Post()
  create(@GetUser() user:User, @Body() createDebtDto:CreateDebtDto){
    return this.debtsService.create(createDebtDto, user.id_user)
  }

  @Post('id/:id/payment')
  addPayment(@Param('id',ParseIntPipe) id_debt:number, @Body() createDebtPaymentDto:CreateDebtPaymentDto){
    return this.debtsService.addPayment(id_debt, createDebtPaymentDto)
  }

  @Put('id/:id')
  update(@Param('id',ParseIntPipe) id_debt:number, @Body() updateDebtDto:UpdateDebtDto){
    return this.debtsService.update(id_debt, updateDebtDto)
  }

  @Roles(Role.ADMIN)
  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_debt:number){
    return this.debtsService.delete(id_debt)
  }
}
