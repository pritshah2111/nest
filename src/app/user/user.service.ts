import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { successResponse } from 'src/common/response/success.helper';
import { JwtService } from '@nestjs/jwt';
import { activeInactiveUserDto } from './dto/activeUser.dto';
import { CommonService } from 'src/common/services/common.serveice';
import { Users, UsersDocument } from 'src/schema/user.schema';
import { CustomException } from 'src/common/constants/exceptions';
import { AuthExceptions } from 'src/common/constants/exceptions/auth.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    private jwtService: JwtService,
    private readonly commonService: CommonService,
  ) {}

  generateAuthToken(user: any) {
    return this.jwtService.sign({
      email: user.email,
      sub: user._id,
      roles: user.userRole,
    });
  }

  async login(params: any) {
    try {
      const user = await this.userModel.findOne({ email: params.email }).lean();

      if (!user) {
        throw AuthExceptions.AcountNotExist();
      }

      if (!bcrypt.compareSync(params.password, user.password)) {
        throw AuthExceptions.InvalidIdPassword();
      }

      if (!user.isActive) {
        throw AuthExceptions.AccountNotActive();
      }

      const { accessToken, ...userData } = user;

      successResponse.LOGINSUCC.data = userData;

      return successResponse.LOGINSUCC;
    } catch (error) {
      throw CustomException.UnknownError(error?.message);
    }
  }

  async createUser(createUserDto: any, other = false) {
    try {
      const userCheck = await this.userModel.findOne({
        email: createUserDto.email,
        isDeleted: false,
      });
      if (userCheck) {
        return successResponse.USEREXIST;
        // throw UserExceptions.AlreadyExist('User is already existeee!').response;
      }
      if (!other) {
        const salt = bcrypt.genSaltSync(10);
        // const hashPass = bcrypt.hashSync(createUserDto.password, salt);
        // const hashPass = await this.commonService.generateRandomString(7);
        const hashPass = '123456';

        createUserDto.password = bcrypt.hashSync(hashPass, salt);
        const data = await this.userModel.create(createUserDto);
        successResponse.CREATEUSER.data = data;
      } else {
        // if call this function from other services
        const data = await this.userModel.create(createUserDto);
        successResponse.CREATEUSER.data = data;
      }
      return successResponse.CREATEUSER;
    } catch (error) {
      return CustomException.UnknownError(error?.message);
    }
  }

  async findAll() {
    return await this.userModel.find();
  }

  async getUserDetails(id: string) {
    try {
      const checkUser = await this.userModel.findOne({
        _id: id,
      });

      if (!checkUser) {
        return successResponse.USERNOTEXIST;
      }

      const getUserData = await this.userModel.findOne({ _id: id });
      successResponse.USERDETAIL.data = getUserData;
      return successResponse.USERDETAIL;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async updateUser(id: string, body: any) {
    try {
      const checkUser = await this.userModel.findOne({
        _id: id,
      });

      if (!checkUser) {
        return successResponse.USERNOTEXIST;
      }

      const updateUaser = await this.userModel.findOneAndUpdate(
        { _id: id },
        { ...body },
        {
          new: true,
        },
      );

      successResponse.UPDATEUSER.data = updateUaser;
      return successResponse.UPDATEUSER;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(id: string) {
    try {
      const userCheck = await this.userModel.findOne({ _id: id });
      if (!userCheck) {
        // return UserExceptions.AccountNotexist();
        return successResponse.USERNOTEXIST;
      }
      const delUser = await this.userModel.findByIdAndUpdate(id, {
        isDeleted: true,
        isActive: false,
      });
      successResponse.DALETEUSER.data = delUser;
      return successResponse.DALETEUSER;
    } catch (error) {
      console.log('error: ', error);
      return CustomException.UnknownError(error?.message);
    }
  }

  async findByEmail(email: string): Promise<any> {
    return await this.userModel.findOne({
      $and: [
        {
          email: email.toLowerCase(),
        },
        {
          isDeleted: false,
        },
      ],
    });
  }

  /**
   * getRestaurantByPhoneNum common api using phoneNumber is find already exit or not
   * @param {phoneNumber} string
   */
  // async getRestaurantByPhoneNum(phoneNumber: string) {
  //   return await this.userModel.findOne({
  //     $and: [
  //       {
  //         contactNo: phoneNumber,
  //       },
  //       {
  //         isDeleted: false,
  //       },
  //     ],
  //   });
  // }
}
