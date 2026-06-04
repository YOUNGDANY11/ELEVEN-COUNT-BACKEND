import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { DebtsService } from './debts.service';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { CreateDebtPaymentDto } from './dto/create-debt-payment.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { DebtResponseDto } from './dto/debt-response.dto';

@ApiTags('Debts')
@ApiBearerAuth('jwt')
@Roles(Role.ADMIN, Role.USER)
@Controller('debts')
export class DebtsController {
  constructor(private readonly debtsService: DebtsService) {}

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Listar deudas' })
  @ApiOkResponse({ type: DebtResponseDto, isArray: true })
  findAll(){
    return this.debtsService.findAll()
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar deuda por id' })
  @ApiOkResponse({ type: DebtResponseDto })
  findOneById(@Param('id',ParseIntPipe) id_debt:number, @GetUser() user:User){
    return this.debtsService.findById(id_debt, user.id_user, user.id_role)
  }

  @Roles(Role.ADMIN)
  @Get('user/:id')
  @ApiOperation({ summary: 'Consultar deudas por usuario' })
  @ApiOkResponse({ type: DebtResponseDto, isArray: true })
  findByUserId(@Param('id',ParseIntPipe) id_user:number){
    return this.debtsService.findByUserId(id_user)
  }

  @Get('mine')
  @ApiOperation({ summary: 'Consultar deudas del usuario autenticado' })
  @ApiOkResponse({ type: DebtResponseDto, isArray: true })
  findMine(@GetUser() user:User){
    return this.debtsService.findByUserId(user.id_user)
  }

  @Post()
  @ApiOperation({ summary: 'Crear deuda para el usuario autenticado' })
  @ApiCreatedResponse({ type: DebtResponseDto })
  create(@GetUser() user:User, @Body() createDebtDto:CreateDebtDto){
    return this.debtsService.create(createDebtDto, user.id_user)
  }

  @Post('id/:id/payment')
  @ApiOperation({ summary: 'Registrar un pago sobre una deuda' })
  @ApiOkResponse({ type: DebtResponseDto })
  addPayment(@Param('id',ParseIntPipe) id_debt:number, @Body() createDebtPaymentDto:CreateDebtPaymentDto, @GetUser() user:User){
    return this.debtsService.addPayment(id_debt, createDebtPaymentDto, user.id_user, user.id_role)
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar deuda' })
  @ApiOkResponse({ type: DebtResponseDto })
  update(@Param('id',ParseIntPipe) id_debt:number, @Body() updateDebtDto:UpdateDebtDto, @GetUser() user:User){
    return this.debtsService.update(id_debt, updateDebtDto, user.id_user, user.id_role)
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar deuda' })
  delete(@Param('id',ParseIntPipe) id_debt:number, @GetUser() user:User){
    return this.debtsService.delete(id_debt, user.id_user, user.id_role)
  }
}
