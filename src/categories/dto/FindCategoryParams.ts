import { IsEnum } from "class-validator";
import { categoryEnum } from "../entities/category.entity";

export class FindCategoryParamsDto{
    @IsEnum( categoryEnum,{message:'Este tipo de categoria no existes usa "AHORRO","GASTO","INGRESO"'})
    type:categoryEnum
}