import { Movement } from "src/movements/entities/movement.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum categoryEnum{
    INGRESO = 'INGRESO',
    GASTO = 'GASTO',
    AHORRO = 'AHORRO'
}

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id_category:number

    @Column({nullable:false, length:50})
    name:string

    @Column({type:'enum', enum: categoryEnum})
    type: categoryEnum

    @OneToMany(()=> Movement, (movement) => movement.category)
    movement:Movement[]
}


