import { IsNumber, IsOptional, IsString, Length, Min } from "class-validator";

export class CreateDebtPaymentDto {
    @IsNumber({maxDecimalPlaces:2},{message:'El valor del pago debe ser numerico'})
    @Min(0.01,{message:'El pago debe ser mayor a 0'})
    amount:number

    @IsOptional()
    @IsString()
    @Length(0,255)
    note?:string
}