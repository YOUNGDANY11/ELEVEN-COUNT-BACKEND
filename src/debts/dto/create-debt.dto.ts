import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateDebtDto {
    @ApiProperty({ example: 'Tarjeta Bancolombia' })
    @IsString()
    @IsNotEmpty({message:'Es requerido el nombre de la deuda'})
    @Length(2,100)
    name:string

    @ApiProperty({ example: 5000000 })
    @IsNumber({maxDecimalPlaces:2},{message:'El monto debe ser numerico'})
    @Min(0.01,{message:'El monto debe ser mayor a 0'})
    amount:number

    @ApiProperty({ example: 12 })
    @IsInt({message:'Las cuotas deben ser un numero entero'})
    @Min(1,{message:'Las cuotas deben ser al menos 1'})
    quotas:number

    @ApiProperty({ example: 24.5 })
    @IsNumber({maxDecimalPlaces:2},{message:'El porcentaje debe ser numerico'})
    @Min(0,{message:'El porcentaje no puede ser negativo'})
    percentage:number

    @ApiPropertyOptional({ example: 15000, nullable: true })
    @IsOptional()
    @IsNumber({maxDecimalPlaces:2},{message:'La cuota de manejo debe ser numerica'})
    @Min(0,{message:'La cuota de manejo no puede ser negativa'})
    management_fee?:number

    @ApiPropertyOptional({ example: 9000, nullable: true })
    @IsOptional()
    @IsNumber({maxDecimalPlaces:2},{message:'La cuota de uso debe ser numerica'})
    @Min(0,{message:'La cuota de uso no puede ser negativa'})
    usage_fee?:number
}