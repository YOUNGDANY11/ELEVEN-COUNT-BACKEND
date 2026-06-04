import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateMovementDto {
    @IsInt()
    @IsNotEmpty ({message:'Es requerido el id del usuario'})
    id_user:number

    @IsInt()
    @IsNotEmpty({message:'Es requerida la categoria'})
    id_category:number

    @IsInt()
    @IsNotEmpty({message:'Tienes que agregar el monto'})
    amount:number

    @IsString()
    description:string
}

