import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { MovementResponseDto } from './dto/movement-response.dto';

@ApiTags('Movements')
@ApiBearerAuth('jwt')
@Roles(Role.ADMIN, Role.USER)
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Roles(Role.ADMIN)
  @Get()
  @ApiOperation({ summary: 'Listar movimientos' })
  @ApiOkResponse({ type: MovementResponseDto, isArray: true })
  findAll(){
    return this.movementsService.findAll()
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar movimiento por id' })
  @ApiOkResponse({ type: MovementResponseDto })
  findById(@Param('id',ParseIntPipe) id_movement:number){
    return this.movementsService.findById(id_movement)
  }

  @Get('category/:id')
  @ApiOperation({ summary: 'Consultar movimientos por categoria' })
  @ApiOkResponse({ type: MovementResponseDto, isArray: true })
  findByCategoryId(@Param('id',ParseIntPipe)id_category:number){
    return this.movementsService.findByCategoryId(id_category)
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Consultar movimientos por usuario' })
  @ApiOkResponse({ type: MovementResponseDto, isArray: true })
  findByUserId(@Param('id',ParseIntPipe) id_user:number){
    return this.movementsService.findByUserId(id_user)
  }

  @Get('user-active')
  @ApiOperation({ summary: 'Consultar movimientos del usuario autenticado' })
  @ApiOkResponse({ type: MovementResponseDto, isArray: true })
  findByUserActive(@GetUser() user: User){
    return this.movementsService.findByUserId(user.id_user)
  }

  @Post()
  @ApiOperation({ summary: 'Crear movimiento' })
  @ApiCreatedResponse({ type: MovementResponseDto })
  create(@Body() createMovementDto:CreateMovementDto){
    return this.movementsService.create(createMovementDto)
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar movimiento' })
  @ApiOkResponse({ type: MovementResponseDto })
  update(@Param('id',ParseIntPipe) id_movement:number, @Body() updateMovementDto:UpdateMovementDto){
    return this.movementsService.update(id_movement,updateMovementDto)
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar movimiento' })
  delete(@Param('id',ParseIntPipe) id_movement:number){
    return this.movementsService.delete(id_movement)
  }
}
