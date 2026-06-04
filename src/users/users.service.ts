import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs'
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository:Repository<User>
  ){}

  async findAll(){
    const users = await this.userRepository.find({order:{id_user:'DESC'}})
    if(users.length === 0) throw new NotFoundException({status:'Error',mensaje:'No hay usuarios registrados'})
    return users
  }

  async findById(id_user:number){
    const user = await this.userRepository.findOneBy({id_user})
    if(!user) throw new NotFoundException({status:'Error',mensaje:'No existe este usuario'})
    return user
  }

  async findByEmail(email:string){
    const user = await this.userRepository.findOneBy({email})
    if(!user) throw new NotFoundException({status:'Error',mensaje:'No existe ningun usuario con este correo'})
    return user
  }

  async create(createUserDto:CreateUserDto){
    const email = createUserDto.email
    const existsEmail = await this.userRepository.findOneBy({email})
    if(existsEmail) throw new BadRequestException({status:'Error',mensaje:'Ya existe este correo registrado a algun usuario'})
    const password = await bcrypt.hash(createUserDto.password,10)
    const user = await this.userRepository.save({...createUserDto, password})
    return user
  }

  async update(id_user:number,updateUserDto:UpdateUserDto){
    const {email} = updateUserDto
    const existsUser = await this.findById(id_user)
    if(email && email !== existsUser?.email){
      const existsUserByEmail = await this.userRepository.findOneBy({email})
      if(existsUserByEmail) throw new BadRequestException({status:'Error',mensaje:'Este correo ya esta en uso'})
    }

    if(updateUserDto.password){
      updateUserDto.password = await bcrypt.hash(updateUserDto.password,10)
    }
    const user = await this.userRepository.merge(existsUser,updateUserDto)
    await this.userRepository.save(user)
    return user
  }

  async delete(id_user:number){
    const user = await this.findById(id_user)
    await this.userRepository.remove(user)
    return user
  }
}
