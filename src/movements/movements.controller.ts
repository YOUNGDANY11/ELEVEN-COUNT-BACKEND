import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Roles(Role.ADMIN, Role.USER)
@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Roles(Role.ADMIN)
  @Get()
  findAll(){
    return this.movementsService.findAll()
  }

  @Get('id/:id')
  findById(@Param('id',ParseIntPipe) id_movement:number){
    return this.movementsService.findById(id_movement)
  }

  @Get('category/:id')
  findByCategoryId(@Param('id',ParseIntPipe)id_category:number){
    return this.movementsService.findByCategoryId(id_category)
  }

  @Get('user/:id')
  findByUserId(@Param('id',ParseIntPipe) id_user:number){
    return this.movementsService.findByUserId(id_user)
  }

  @Get('user-active')
  findByUserActive(@GetUser() user: User){
    return this.movementsService.findByUserId(user.id_user)
  }

  @Post()
  create(@Body() createMovementDto:CreateMovementDto){
    return this.movementsService.create(createMovementDto)
  }

  @Put('id/:id')
  update(@Param('id',ParseIntPipe) id_movement:number, @Body() updateMovementDto:UpdateMovementDto){
    return this.movementsService.update(id_movement,updateMovementDto)
  }

  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_movement:number){
    return this.movementsService.delete(id_movement)
  }
}
