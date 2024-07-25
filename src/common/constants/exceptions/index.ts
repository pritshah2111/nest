import { HttpException, HttpStatus } from '@nestjs/common';

export const CustomException = {
  UnknownError(msg = null): any {
    return new HttpException(
      {
        message: msg || 'Something went wrong, please try again later!',
        error: 'UnknownError',
        statusCode: HttpStatus.BAD_GATEWAY,
      },
      HttpStatus.BAD_GATEWAY,
    );
  },
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
  NotExist(msg: string): any {
    return new HttpException(
      {
        message: msg,
        error: 'AlreadyExistError',
        statusCode: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT,
    );
  },
  InternalServerError(): any {
    return new HttpException(
      {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server error',
        data: {},
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  },
};
