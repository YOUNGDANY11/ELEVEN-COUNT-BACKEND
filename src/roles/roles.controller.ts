import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RoleResponseDto } from './dto/role-response.dto';

@ApiTags('Roles')
@ApiBearerAuth('jwt')
@Roles(Role.ADMIN)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar roles' })
  @ApiOkResponse({ type: RoleResponseDto, isArray: true })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Consultar un rol por id' })
  @ApiOkResponse({ type: RoleResponseDto })
  findOne(@Param('id') id: string) {
    return this.rolesService.findById(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un rol' })
  @ApiCreatedResponse({ type: RoleResponseDto })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un rol' })
  @ApiOkResponse({ type: RoleResponseDto })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un rol' })
  remove(@Param('id') id: string) {
    return this.rolesService.delete(+id);
  }
}
