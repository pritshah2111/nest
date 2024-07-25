import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { CommonService } from 'src/common/services/common.serveice';
import { Users, UsersSchema } from 'src/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Users.name, schema: UsersSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, JwtService, CommonService],
  exports: [UserService],
})
export class UserModule {}
