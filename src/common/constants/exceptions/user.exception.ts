import { HttpException, HttpStatus } from '@nestjs/common';

export const UserExceptions = {
  AlreadyExist(msg: string): any {
    return new HttpException(
      {
        message: msg,
        error: 'AlreadyExistError',
        statusCode: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT,
    );
  },
  AccountNotexist(): any {
    return new HttpException(
      {
        message: 'Account dose not exist!',
        error: 'accountNotExist',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },
};
