import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id_user!: number;

  @ApiProperty({ example: 1 })
  id_role!: number;

  @ApiProperty({ example: 'Dany' })
  name!: string;

  @ApiProperty({ example: 'Perez' })
  lastname!: string;

  @ApiProperty({ example: 'dany@example.com' })
  email!: string;

  @ApiProperty({ example: 'hashed_password' })
  password!: string;

  @ApiProperty({ example: '2026-06-04T18:00:00.000Z', format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ example: '2026-06-04T18:00:00.000Z', format: 'date-time' })
  updated_at!: Date;
}