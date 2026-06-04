import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/FindCategoryParams';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { CategoryResponseDto } from './dto/category-response.dto';

@ApiTags('Categories')
@ApiBearerAuth('jwt')
@Roles(Role.ADMIN, Role.USER)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar categorias' })
  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  findAll(){
    return this.categoriesService.findAll()
  }

  @Get('id/:id')
  @ApiOperation({ summary: 'Consultar categoria por id' })
  @ApiOkResponse({ type: CategoryResponseDto })
  findOneById(@Param('id',ParseIntPipe) id_category:number){
    return this.categoriesService.findById(id_category)
  }

  @Get('type/:type')
  @ApiOperation({ summary: 'Consultar categorias por tipo' })
  @ApiOkResponse({ type: CategoryResponseDto, isArray: true })
  findByTypeCategory(@Param() params:FindCategoryParamsDto){
    return this.categoriesService.findByTypeCategory(params.type)
  }

  @Roles(Role.ADMIN)
  @Post()
  @ApiOperation({ summary: 'Crear categoria' })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  create(@Body() createCategoryDto:CreateCategoryDto){
    return this.categoriesService.create(createCategoryDto)
  }

  @Roles(Role.ADMIN)
  @Put('id/:id')
  @ApiOperation({ summary: 'Actualizar categoria' })
  @ApiOkResponse({ type: CategoryResponseDto })
  update(@Param('id',ParseIntPipe)id_category:number,@Body()updateCategoryDto:UpdateCategoryDto){
    return this.categoriesService.update(id_category,updateCategoryDto)
  }

  @Roles(Role.ADMIN)
  @Delete('id/:id')
  @ApiOperation({ summary: 'Eliminar categoria' })
  delete(@Param('id',ParseIntPipe) id_category:number){
    return this.categoriesService.delete(id_category)
  }
}
