import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { categoryEnum } from "../entities/category.entity";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty({message:'Es requerido el nombre de la categoria'})
    name:string

    @IsString()
    @IsEnum(categoryEnum,{message:'Solo se puede usar "INGRESO","GASTO","AHORRO"'})
    type: categoryEnum
}
