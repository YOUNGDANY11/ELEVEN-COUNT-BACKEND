import { User } from "src/users/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id_role:number

    @Column({nullable:false})
    name:string

    @OneToMany(()=> User, (user) => user.role, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    users: User[]
}
