import { ApiProperty } from '@nestjs/swagger';

export class MovementResponseDto {
  @ApiProperty({ example: 1 })
  id_movement!: number;

  @ApiProperty({ example: 1 })
  id_user!: number;

  @ApiProperty({ example: 1 })
  id_category!: number;

  @ApiProperty({ example: 250000 })
  amount!: number;

  @ApiProperty({ example: 'Pago de mercado' })
  description!: string;

  @ApiProperty({ example: '2026-06-04T18:00:00.000Z', format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ example: '2026-06-04T18:00:00.000Z', format: 'date-time' })
  updated_at!: Date;
}