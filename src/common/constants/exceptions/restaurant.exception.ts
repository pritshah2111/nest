import { HttpException, HttpStatus } from '@nestjs/common';

export const RestaurantException = {
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
};
