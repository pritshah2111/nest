import { HttpException, HttpStatus } from '@nestjs/common';

export const SchoolResponse = {
  SuccessCreate(): any {
    return {
      message: 'School successfully created.',
      statusCode: HttpStatus.CREATED,
    };
  },

  SuccessSchoolCreateByAdmin(): any {
    return {
      message: 'Successfully create school and send email on resister email.',
      statusCode: HttpStatus.CREATED,
    };
  },
};
