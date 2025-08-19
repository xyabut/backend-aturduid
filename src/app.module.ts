import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './feature/users/users.module';
import { TransactionsModule } from './feature/transactions/transactions.module';
import { AppController } from './feature/app/app.controller';
import { AppService } from './feature/app/app.service';
import { DatabaseModule } from './database/database.module';
import databaseConfig from './config/database/database.config';
import { AuthModule } from './feature/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: 'localhost',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'kmzwa8awaa',
    //   database: 'aturduid',
    //   entities:[User,Role],
    //   // set false for production
    //   synchronize: false
    // }),
    ConfigModule.forRoot({isGlobal: true, load:[databaseConfig]}),
    JwtModule.register({
      global:true,
      signOptions: {
          algorithm: "RS512",
          expiresIn: "7 days",
      },
      privateKey: process.env.JWT_PRIVATE,
      publicKey: process.env.JWT_PUBLIC,
    }), 
    DatabaseModule, UsersModule, TransactionsModule, AuthModule],
    
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
