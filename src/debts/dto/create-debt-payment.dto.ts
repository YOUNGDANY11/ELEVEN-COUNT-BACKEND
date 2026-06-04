import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateDebtPaymentDto {
    @ApiProperty({ example: 150000 })
    @IsNumber({maxDecimalPlaces:2},{message:'El valor del pago debe ser numerico'})
    @Min(0.01,{message:'El pago debe ser mayor a 0'})
    amount:number

    @ApiPropertyOptional({ example: 'Abono quincenal', nullable: true })
    @IsOptional()
    @IsString()
    @Length(0,255)
    note?:string
}