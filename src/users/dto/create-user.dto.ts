import { IsEmail, IsNotEmpty, IsString, Length, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message:'Es requerido el nombre'})
    @Length(2,100)
    name:string

    @IsString()
    @IsNotEmpty({message:'Es requerido el apellido'})
    @Length(2,100)
    lastname:string

    @IsEmail()
    @IsNotEmpty({message:'Es requerido el correo'})
    @MaxLength(150,{message:'El maximo es de 150 caracteres'})
    email:string

    @IsString()
    @IsNotEmpty({message:'Es requerida la contraseña'})
    @MinLength(6,{message:'El minimo de caracteres es 6'})
    password:string
}

