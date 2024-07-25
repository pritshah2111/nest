import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import AppConfiguration from './config/app.config';
import DatabaseConfiguration from './config/database.config';
import AuthConfiguration from './config/auth.config';
import { UserModule } from './app/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/user.schema';
import { DatabaseModule } from './provider/database.module';
import { AuthModule } from './security/auth/auth.module';
import { FileModule } from './common/constants/file/file.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

dotenv.config();
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfiguration, DatabaseConfiguration, AuthConfiguration],
      // ignoreEnvFile: false,
      // isGlobal: true,
    }),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    DatabaseModule,
    AuthModule,
    UserModule,
    FileModule,
    ServeStaticModule.forRoot({
      serveRoot: '/uploads',
      rootPath: join(__dirname, '..', 'uploads'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
