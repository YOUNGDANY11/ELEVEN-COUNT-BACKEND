import { ApiProperty } from '@nestjs/swagger';
import { DebtPaymentResponseDto } from './debt-payment-response.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';

export class DebtResponseDto {
  @ApiProperty({ example: 1 })
  id_debt!: number;

  @ApiProperty({ example: 1 })
  id_user!: number;

  @ApiProperty({ example: 'Tarjeta Bancolombia' })
  name!: string;

  @ApiProperty({ example: 5000000 })
  amount!: number;

  @ApiProperty({ example: 12 })
  quotas!: number;

  @ApiProperty({ example: 24.5 })
  percentage!: number;

  @ApiProperty({ example: 15000, required: false, nullable: true })
  management_fee!: number | null;

  @ApiProperty({ example: 9000, required: false, nullable: true })
  usage_fee!: number | null;

  @ApiProperty({ example: '2026-06-04T18:00:00.000Z', format: 'date-time' })
  created_at!: Date;

  @ApiProperty({ example: '2026-06-04T18:00:00.000Z', format: 'date-time' })
  updated_at!: Date;

  @ApiProperty({ type: () => UserResponseDto })
  user!: UserResponseDto;

  @ApiProperty({ type: () => DebtPaymentResponseDto, isArray: true })
  payments!: DebtPaymentResponseDto[];

  @ApiProperty({ example: 1225000 })
  total_interest!: number;

  @ApiProperty({ example: 24000 })
  total_fees!: number;

  @ApiProperty({ example: 5274000 })
  total_debt!: number;

  @ApiProperty({ example: 1200000 })
  amount_paid!: number;

  @ApiProperty({ example: 4074000 })
  amount_remaining!: number;

  @ApiProperty({ example: 439500 })
  installment_value!: number;

  @ApiProperty({ example: 2 })
  quotas_paid!: number;

  @ApiProperty({ example: 10 })
  quotas_remaining!: number;
}