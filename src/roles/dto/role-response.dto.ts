import { ApiProperty } from '@nestjs/swagger';

export class RoleResponseDto {
  @ApiProperty({ example: 1 })
  id_role!: number;

  @ApiProperty({ example: 'ADMIN' })
  name!: string;
}