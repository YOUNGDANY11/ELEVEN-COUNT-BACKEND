import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(){
    return this.usersService.findAll()
  }

  @Get('id/:id')
  findOneById(@Param('id',ParseIntPipe) id_user:number){
    return this.usersService.findById(id_user)
  }

  @Get('email')
  findOneByEmail(@Param('email') email:string){
    return this.usersService.findByEmail(email)
  }

  @Post()
  create(@Body() createUserDto:CreateUserDto){
    return this.usersService.create(createUserDto)
  }

  @Put('id/:id')
  update(@Param('id',ParseIntPipe) id_user:number, @Body()updateUserDto:UpdateUserDto){
    return this.usersService.update(id_user,updateUserDto)
  }

  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe)id_user:number){
    return this.usersService.delete(id_user)
  }
}
