import { Module, Options } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { MovementsModule } from './movements/movements.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { RolesModule } from './roles/roles.module';
import { DebtsModule } from './debts/debts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'postgres',
      url:'postgresql://postgres:trHXLoYWsaDPuKwBZYhyCuVtiIpVXDVE@acela.proxy.rlwy.net:58845/railway',
      autoLoadEntities:true,
      synchronize:true,
      extra:{
        Options:'-c timezone=America/Bogota'
      }
    }),
    UsersModule,
    CategoriesModule,
    MovementsModule,
    AuthModule,
    RolesModule,
    DebtsModule
  ],
  controllers: [],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
