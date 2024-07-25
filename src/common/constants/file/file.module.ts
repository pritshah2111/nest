import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
