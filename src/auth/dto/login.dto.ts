import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty({ message: 'Es requerido el correo' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Es requerida la contraseña' })
  @MinLength(6, { message: 'El minimo de caracteres es 6' })
  password: string;
}
