import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private roleRepository:Repository<Role>
  ){}

  async findAll(){
    const roles = await this.roleRepository.find()
    if(roles.length === 0) throw new NotFoundException({message:'No hay roles registrados'})
    return roles
  }

  async findById(id:number){
    const role = await this.roleRepository.findOneBy({id_role:id})
    if(!role) throw new NotFoundException({message:'No se encontro el rol'})
    return role
  }

  async create(createRoleDto: CreateRoleDto) {
    const role = this.roleRepository.create(createRoleDto)
    await this.roleRepository.save(role)
    return role
  }

  async update(id_role: number, updateRoleDto: UpdateRoleDto) {
    const existsRole = await this.findById(id_role)
    if(!existsRole) throw new NotFoundException({message:'No se encontro el rol'})
    const role = await this.roleRepository.merge(existsRole,updateRoleDto)
    await this.roleRepository.save(role)
    return role
  }

  async delete(id_role: number) {
    const existsRole = await this.findById(id_role)
    if(!existsRole) throw new NotFoundException({message:'No se encontro el rol'})
    await this.roleRepository.remove(existsRole)
  }
}
