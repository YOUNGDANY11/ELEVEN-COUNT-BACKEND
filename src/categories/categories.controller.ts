import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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

  @Post()
  create(@Body() createCategoryDto:CreateCategoryDto){
    return this.categoriesService.create(createCategoryDto)
  }

  @Put('id/:id')
  update(@Param('id',ParseIntPipe)id_category:number,@Body()updateCategoryDto:UpdateCategoryDto){
    return this.categoriesService.update(id_category,updateCategoryDto)
  }

  @Delete('id/:id')
  delete(@Param('id',ParseIntPipe) id_category:number){
    return this.categoriesService.delete(id_category)
  }
}
