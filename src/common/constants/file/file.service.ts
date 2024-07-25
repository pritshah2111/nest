import { Injectable } from '@nestjs/common';

import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
// import { FileService } from './file.service';
import { FileDto } from './dto/file.dto';
import { Request, Response } from 'express';
import { Public } from 'src/security/auth/auth.decorator';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';
import { CustomException } from '../exceptions';
import { rimraf } from 'rimraf';

@Injectable()
export class FileService {
  // uploadLocal(){
  // }
  //   async uploadFile(
  //     @UploadedFile() file: Express.Multer.File,
  //     @Body() params: any,
  //     @Res() res: Response,
  //   ) {
  //     if (!fs.existsSync(`./uploads/${params.moduleName}`)) {
  //       fs.mkdirSync(`./uploads/${params.moduleName}`, {
  //         recursive: true,
  //       });
  //     }
  //     fs.copyFile(
  //       file.path,
  //       `./uploads/${params.moduleName}/${file.filename}`,
  //       async (err) => {
  //         if (err) {
  //           throw CustomError.UnknownError('Oops! Something went wrong');
  //         } else {
  //           rimraf(file.path, () => {});
  //           res.status(HttpStatus.OK).send({
  //             statusCode: HttpStatus.OK,
  //             message: 'Success',
  //             data: { name: `/uploads/${params.moduleName}/${file.filename}` },
  //           });
  //         }
  //       },
  //     );
  //   }
}
