import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from 'src/feature/auth/entities/auth.entity';
import { Role } from 'src/feature/roles/entities/role.entity';
import { User } from 'src/feature/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.database'),
        entities: [User, Role, Auth],
        // TODO replace with grob pattern
        // entities: [__dirname.replace('database', 'feature/**/*.entity.ts')],
        // autoLoadEntities: true,
        synchronize: false
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {

}