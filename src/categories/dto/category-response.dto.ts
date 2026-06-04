import { ApiProperty } from '@nestjs/swagger';
import { categoryEnum } from '../entities/category.entity';

export class CategoryResponseDto {
  @ApiProperty({ example: 1 })
  id_category!: number;

  @ApiProperty({ example: 'Mercado' })
  name!: string;

  @ApiProperty({ enum: categoryEnum, example: categoryEnum.GASTO })
  type!: categoryEnum;
}