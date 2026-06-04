import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MovementsModule } from './movements/movements.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      url:'postgresql://postgres:trHXLoYWsaDPuKwBZYhyCuVtiIpVXDVE@acela.proxy.rlwy.net:58845/railway',
      autoLoadEntities:true,
      synchronize:true
    }),
    UsersModule,
    CategoriesModule,
    MovementsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
