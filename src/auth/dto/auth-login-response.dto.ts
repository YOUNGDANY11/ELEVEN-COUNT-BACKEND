import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginUserResponseDto {
  @ApiProperty({ example: 1 })
  id_user!: number;

  @ApiProperty({ example: 'Dany' })
  name!: string;

  @ApiProperty({ example: 'Perez' })
  lastname!: string;

  @ApiProperty({ example: 'dany@example.com' })
  email!: string;
}

export class AuthLoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIs...' })
  access_token!: string;

  @ApiProperty({ type: () => AuthLoginUserResponseDto })
  user!: AuthLoginUserResponseDto;
}