import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class MovementsService {
  constructor(
    @InjectRepository(Movement) private movementRepository:Repository<Movement>
  ){}

  async findAll(){
    const movements = await this.movementRepository.find()
    if(movements.length === 0) throw new NotFoundException({status:'Error',mensaje:'No existe registro de movimientos'})
    return movements
  }

  async findById(id_movement:number){
    const movement = await this.movementRepository.findOneBy({id_movement})
    if(!movement) throw new NotFoundException({status:'Error',mensaje:'No existe este registro de movimiento'})
    return movement
  } 

  async findByCategoryId(id_category:number){
    const movements = await this.movementRepository.find({where:{id_category}})
    if(movements.length === 0) throw new NotFoundException({status:'Error',mensaje:'No existe este registro de movimientos relacionado en esta categoria'})
    return movements
  }

  async findByUserId(id_user:number){
    const movements = await this.movementRepository.find({where:{id_user}})
    if(movements.length === 0) throw new NotFoundException({status:'Error',mensaje:'No existen registros de movimientos para este usuario'})
    return movements
  }

  async create(createMovementDto:CreateMovementDto){
    const movement = await this.movementRepository.save(createMovementDto)
    return movement
  }

  async update(id_movement:number, updateMovementDto:UpdateMovementDto){
    const existsMovement = await this.findById(id_movement)
    const movement = await this.movementRepository.merge(existsMovement,updateMovementDto)
    await this.movementRepository.save(movement)
    return movement
  }

  async delete(id_movement:number){
    const existsMovement = await this.findById(id_movement)
    const movement = await this.movementRepository.remove(existsMovement)
    return movement
  }
}
