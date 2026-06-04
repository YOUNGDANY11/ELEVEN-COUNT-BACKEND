import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMovementDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    @IsNotEmpty ({message:'Es requerido el id del usuario'})
    id_user!:number

    @ApiProperty({ example: 2 })
    @IsInt()
    @IsNotEmpty({message:'Es requerida la categoria'})
    id_category!:number

    @ApiProperty({ example: 250000 })
    @IsInt()
    @IsNotEmpty({message:'Tienes que agregar el monto'})
    amount!:number

    @ApiProperty({ example: 'Pago de mercado' })
    @IsString()
    description!:string
}

