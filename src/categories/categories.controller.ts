import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FindCategoryParamsDto } from './dto/FindCategoryParams';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Roles(Role.ADMIN, Role.USER)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll(){
    return this.categoriesService.findAll()
  }

  @Get('id/:id')
  findOneById(@Param('id',ParseIntPipe) id_category:number){
    return this.categoriesService.findById(id_category)
  }

  @Get('type/:type')
  findByTypeCategory(@Param() params:FindCategoryParamsDto){
    return this.categoriesService.findByTypeCategory(params.type)
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createCategoryDto:CreateCategoryDto){
    return this.categoriesService.create(createCategoryDto)
  }

  @Roles(Role.ADMIN)
  @Put('id/:id')
  update(@Param('id',ParseIntPipe)id_category:number,@Body()updateCategoryDto:UpdateCategoryDto){
    return this.categoriesService.update(id_category,updateCategoryDto)
  }

  @Roles(Role.ADMIN)
  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_category:number){
    return this.categoriesService.delete(id_category)
  }
}
