import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'dany@example.com' })
  @IsEmail()
  @IsNotEmpty({ message: 'Es requerido el correo' })
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @IsNotEmpty({ message: 'Es requerida la contraseña' })
  @MinLength(6, { message: 'El minimo de caracteres es 6' })
  password!: string;
}
