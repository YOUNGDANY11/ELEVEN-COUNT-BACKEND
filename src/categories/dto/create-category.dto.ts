import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { categoryEnum } from "../entities/category.entity";

export class CreateCategoryDto {
    @ApiProperty({ example: 'Mercado' })
    @IsString()
    @IsNotEmpty({message:'Es requerido el nombre de la categoria'})
    name!:string

    @ApiProperty({ enum: categoryEnum, example: categoryEnum.GASTO })
    @IsString()
    @IsEnum(categoryEnum,{message:'Solo se puede usar "INGRESO","GASTO","AHORRO"'})
    type!: categoryEnum
}
