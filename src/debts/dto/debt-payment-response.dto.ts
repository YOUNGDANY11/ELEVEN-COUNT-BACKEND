import { ApiProperty } from '@nestjs/swagger';

export class DebtPaymentResponseDto {
  @ApiProperty({ example: 1 })
  id_debt_payment!: number;

  @ApiProperty({ example: 1 })
  id_debt!: number;

  @ApiProperty({ example: 150000 })
  amount!: number;

  @ApiProperty({ example: 'Abono quincenal', required: false, nullable: true })
  note!: string | null;

  @ApiProperty({ example: '2026-06-04T18:00:00.000Z', format: 'date-time' })
  created_at!: Date;
}