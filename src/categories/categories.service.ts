import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category, categoryEnum } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepository:Repository<Category>
  ){}

  async findAll(){
    const categories = await this.categoryRepository.find({order:{type:'ASC'}})
    if(categories.length === 0) throw new NotFoundException({status:'Error',mensaje:'No hay categorias registradas'})
    return categories
  }

  async findById(id_category:number){
    const category = await this.categoryRepository.findOneBy({id_category})
    if(!category) throw new NotFoundException({status:'Error',mensaje:'No existe esta categoria'})
    return category
  }

  async findByTypeCategory(type:categoryEnum){
    const categories = await this.categoryRepository.find({ where: { type }, order:{id_category:'DESC'} }) 
    if(categories.length === 0) throw new NotFoundException({status:'Error',mensaje:'No existe ninguna categoria con esta clasificacion'})
    return categories
  }

  async create(createCategoryDto:CreateCategoryDto){
    const category = await this.categoryRepository.save(createCategoryDto)
    return category
  }

  async update(id_category:number,updateCategoryDto:UpdateCategoryDto){
    const existsCategory = await this.findById(id_category)
    const category = await this.categoryRepository.merge(existsCategory,updateCategoryDto)
    await this.categoryRepository.save(category)
    return category
  }

  async delete(id_category:number){
    const category = await this.findById(id_category)
    await this.categoryRepository.remove(category)
    return category
  }
}


