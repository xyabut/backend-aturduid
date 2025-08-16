import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Role } from 'src/roles/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'kmzwa8awaa',
      database: 'aturduid',
      entities:[User,Role],
      // set false for production
      synchronize: false
    }),
    UsersModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
