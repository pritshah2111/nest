import { HttpException, HttpStatus } from '@nestjs/common';

export const CustomResponse = {
  SuccessCreate(message: string): any {
    return {
      message: message,
      statusCode: HttpStatus.CREATED,
    };
  },

  SuccessResponse(message: string, data: any = null): any {
    return {
      message: message,
      data: data,
      statusCode: HttpStatus.OK,
    };
  },
  SuccessDelete(message: string, data: any = null): any {
    return {
      message: message,
      statusCode: HttpStatus.OK,
    };
  },
};
