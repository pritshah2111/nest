import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const option: MongooseModuleOptions = {
          uri: configService.get<string>('database.connectionString'),
        };
        return option;
      },
    }),
  ],
})
export class DatabaseModule {}
