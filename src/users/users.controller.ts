import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UserResponseDto } from './dto/user-response.dto';

@ApiTags('Users')
@ApiBearerAuth('jwt')
@Roles(Role.ADMIN)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar usuarios' })
  @ApiOkResponse({ type: UserResponseDto, isArray: true })
  findAll(){
    return this.usersService.findAll()
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar usuario por id' })
  @ApiOkResponse({ type: UserResponseDto })
  findOneById(@Param('id',ParseIntPipe) id_user:number){
    return this.usersService.findById(id_user)
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Consultar usuario por correo' })
  @ApiOkResponse({ type: UserResponseDto })
  findOneByEmail(@Param('email') email:string){
    return this.usersService.findByEmail(email)
  }

  @Post()
  @ApiOperation({ summary: 'Crear usuario' })
  @ApiCreatedResponse({ type: UserResponseDto })
  create(@Body() createUserDto:CreateUserDto){
    return this.usersService.create(createUserDto)
  }

  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiOkResponse({ type: UserResponseDto })
  update(@Param('id',ParseIntPipe) id_user:number, @Body()updateUserDto:UpdateUserDto){
    return this.usersService.update(id_user,updateUserDto)
  }

  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar usuario' })
  delete(@Param('id',ParseIntPipe)id_user:number){
    return this.usersService.delete(id_user)
  }
}
