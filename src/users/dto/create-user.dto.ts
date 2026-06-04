import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message:'Es requerido el nombre'})
    name:string

    @IsString()
    @IsNotEmpty({message:'Es requerido el apellido'})
    lastname:string

    @IsEmail()
    @IsNotEmpty({message:'Es requerido el correo'})
    email:string

    @IsString()
    @IsNotEmpty({message:'Es requerida la contraseña'})
    password:string
}

