import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty({message:'Es requerido el nombre'})
    name:string
}
