import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from "class-validator";
import { categoryEnum } from "../entities/category.entity";

export class FindCategoryParamsDto{
    @ApiProperty({ enum: categoryEnum, example: categoryEnum.GASTO })
    @IsEnum( categoryEnum,{message:'Este tipo de categoria no existes usa "AHORRO","GASTO","INGRESO"'})
    type!:categoryEnum
}