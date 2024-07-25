import { HttpException, HttpStatus } from '@nestjs/common';

export const UsersResponse = {
  SuccessCreate(): any {
    return {
      message: 'User successfully created.',
      statusCode: HttpStatus.CREATED,
    };
  },
};
