import { HttpStatus } from '@nestjs/common';

export const AuthResponse = {
  SuccessLogin(data: any): any {
    return {
      message: 'User successfully Login.',
      statusCode: HttpStatus.OK,
      data: data,
    };
  },
};
