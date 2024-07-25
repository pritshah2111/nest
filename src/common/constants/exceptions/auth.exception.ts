import { HttpException, HttpStatus } from '@nestjs/common';

export const AuthExceptions = {
  AcountNotExist(): any {
    return new HttpException(
      {
        message: 'Account not active!',
        error: 'accountNotActive',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  InvalidIdPassword(): any {
    return new HttpException(
      {
        message: 'Invalid Password',
        error: 'InvalidIdPassword',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  InvalidOldPassword(): any {
    return new HttpException(
      {
        message: 'Invalid Current Password',
        error: 'Invalid old Password',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  AccountNotActive(): any {
    return new HttpException(
      {
        message: 'Account not active!',
        error: 'accountNotActive',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  TokenExpired(): any {
    return new HttpException(
      {
        message: 'Token Expired use RefreshToken',
        error: 'TokenExpiredError',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  InvalidToken(): any {
    return new HttpException(
      {
        message: 'Invalid Token',
        error: 'InvalidToken',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  ForbiddenException(): any {
    return new HttpException(
      {
        message: 'This resource is forbidden from this user',
        error: 'UnAuthorizedResourceError',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },
};
