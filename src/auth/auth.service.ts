import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    let user: Awaited<ReturnType<typeof this.usersService.findByEmail>>;

    try {
      user = await this.usersService.findByEmail(loginDto.email);
    } catch {
      throw new UnauthorizedException({ status: 'Error', mensaje: 'Credenciales incorrectas' });
    }

    const passwordValid = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException({ status: 'Error', mensaje: 'Credenciales incorrectas' });
    }

    const payload = { sub: user.id_user, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id_user: user.id_user,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
}
