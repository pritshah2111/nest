import { HttpException, HttpStatus } from '@nestjs/common';

export const successResponse = {
  SOMEWENTWRONG: {
    statusCode: HttpStatus.BAD_GATEWAY,
    message: 'Oops! Something went wrong.',
    data: {},
  },
  CREATESCHOOL: {
    statusCode: HttpStatus.OK,
    message: 'School Created Successfully.',
    data: {},
  },
  DELETESCHOOL: {
    statusCode: HttpStatus.OK,
    message: 'School Deleted Successfully.',
    data: {},
  },
  UPDATESCHOOL: {
    statusCode: HttpStatus.OK,
    message: 'School Details Update Successfully.',
    data: {},
  },
  FORGOTPWDSUCC: {
    message: 'Password reset link sent to your email.',
    statusCode: HttpStatus.OK,
    data: {},
  },
  RESETPWDSUCC: {
    message: 'Password reset successfully.',
    statusCode: HttpStatus.OK,
    data: {},
  },
  CHANGEPWDSUCC: {
    message: 'Password changed successfully.',
    statusCode: HttpStatus.OK,
    data: {},
  },
  CREATESTD: {
    statusCode: HttpStatus.OK,
    message: 'Standard Created Successfully.',
    data: {},
  },
  STDLIST: {
    statusCode: HttpStatus.OK,
    message: 'Std List get Successfully.',
    data: {},
  },
  UPDATESTD: {
    statusCode: HttpStatus.OK,
    message: 'Standard Updated Successfully.',
    data: {},
  },
  LOG_OUT_SUCC: {
    statusCode: HttpStatus.OK,
    message: 'Logout Successfully.',
    data: {},
  },
  LOGINSUCC: {
    statusCode: HttpStatus.OK,
    message: 'User Login Successfully.',
    data: {},
  },
  CREATESTUDENT: {
    statusCode: HttpStatus.OK,
    message: 'Student Created Successfully.',
    data: {},
  },
  STUDENTEXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'student already exists.',
    data: {},
  },
  SCHOOLEXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'School already exists.',
    data: {},
  },
  STUDENTLIST: {
    statusCode: HttpStatus.OK,
    message: 'School List get Successfully.',
    data: {},
  },
  SCHOOLLIST: {
    statusCode: HttpStatus.OK,
    message: 'School List get Successfully.',
    data: {},
  },
  SCHOOLNOTEXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'School does not exist.',
    data: {},
  },
  STUDENTNOTEXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Student does not exist.',
    data: {},
  },
  STUDENTDETAIL: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Student details get successfully..',
    data: {},
  },
  UPDATESTUDENT: {
    statusCode: HttpStatus.OK,
    message: 'Student Details Update Successfully.',
    data: {},
  },
  DALETESTUDENT: {
    statusCode: HttpStatus.OK,
    message: 'Student Deleted Successfully.',
    data: {},
  },
  DALETESCHOOL: {
    statusCode: HttpStatus.OK,
    message: 'School Deleted Successfully.',
    data: {},
  },
  STDEXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Standard already exists.',
    data: {},
  },
  STDNOTEXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Standard does not exist.',
    data: {},
  },
  DELETESTD: {
    statusCode: HttpStatus.OK,
    message: 'Standard Deleted Successfully.',
    data: {},
  },
  STDDETAIL: {
    statusCode: HttpStatus.OK,
    message: 'Standard Detail get Successfully.',
    data: {},
  },
  CREATEUSER: {
    statusCode: HttpStatus.OK,
    message: 'User Added Successfully.',
    data: {},
  },
  USERNOTEXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User does not exist.',
    data: {},
  },
  USEREXIST: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User already exists.',
    data: {},
  },
  USERDETAIL: {
    statusCode: HttpStatus.NOT_FOUND,
    message: 'User details get successfully..',
    data: {},
  },

  UPDATEUSER: {
    statusCode: HttpStatus.OK,
    message: 'User Updated Successfully.',
    data: {},
  },
  DALETEUSER: {
    statusCode: HttpStatus.OK,
    message: 'User Deleted Successfully.',
    data: {},
  },
  DASHBOARDDETAILS: {
    statusCode: HttpStatus.OK,
    message: 'Dashboard Details get Successfully.',
    data: {},
  },
  ALLCITYLIST: {
    statusCode: HttpStatus.OK,
    message: 'City List get Successfully.',
    data: {},
  },
  ALLCOUNTRYLIST: {
    statusCode: HttpStatus.OK,
    message: 'Country List get Successfully.',
    data: {},
  },
  ALLSTATELIST: {
    statusCode: HttpStatus.OK,
    message: 'State List get Successfully.',
    data: {},
  },
  SCHOOLDETAIL: {
    statusCode: HttpStatus.OK,
    message: 'School Details get Successfully.',
    data: {},
  },
  STANDARDLIST: {
    statusCode: HttpStatus.OK,
    message: 'Standard List get Successfully.',
    data: {},
  },
};
