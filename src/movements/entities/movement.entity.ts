import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('movements')
export class Movement {
    @PrimaryGeneratedColumn()
    id_movement:number

    @Column({nullable:false})
    id_user:number

    @ManyToOne(() => User, (user) => user.movement, {onDelete:'CASCADE', onUpdate:'CASCADE'})
    @JoinColumn({name:'id_user'})
    user:User

    @Column({nullable:false})
    id_category:number

    @ManyToOne(()=> Category, (category) => category.movement)
    @JoinColumn({name:'id_category'})
    category:Category

    @Column({type:'decimal', precision:12,scale:0})
    amount:number

    @Column({length:255})
    description:string

    @CreateDateColumn({type:'timestamptz'})
    created_at:Date

    @UpdateDateColumn({type:'timestamptz'})
    updated_at:Date
}
