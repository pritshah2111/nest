import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { CreateUserDto } from 'src/app/v1/user/dto/create-user.dto';
// import { UserService } from 'src/app/v1/user/user.service';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  changePasswordDto,
} from 'src/common/dto/common.dto';
import { CustomResponse } from 'src/common/response';
import * as bcrypt from 'bcrypt';
import { AuthResponse } from 'src/common/response/auth.respoinse';
import { CommonService } from 'src/common/services/common.serveice';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { successResponse } from 'src/common/response/success.helper';
import { LogOutDto } from './dto/logout.dto';
import * as jwt from 'jsonwebtoken';
import { sign } from 'jsonwebtoken';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { UserService } from 'src/app/user/user.service';
import { Users, UsersDocument } from 'src/schema/user.schema';
import { CustomException } from 'src/common/constants/exceptions';
import { AuthExceptions } from 'src/common/constants/exceptions/auth.exception';
// import { JwtPayload } from 'src/common/interface/jwt.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
    
    private jwtService: JwtService,
    private commonService: CommonService,
    // private readonly mailer: EmailHelper,
    private readonly userService: UserService,
  ) {}

  signPayload(payload: any) {
    return sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
  }

  async login(params: LoginDto): Promise<any> {
    try {
      const user: any = await this.userService.login(params);
      const payload: any = {
        email: user.data.email,
        sub: user.data._id,
        roles: user.data.userRole,
      };
      const accessToken = await this.signPayload(payload);

      user.accessToken = accessToken;
      const update = await this.userModel.findOneAndUpdate(
        { email: params.email },
        { accessToken: accessToken },
        { new: true },
      );
      return user;
    } catch (error) {
      throw CustomException.UnknownError(error?.message);
    }
  }

  // public async generateToken(
  //   tokenDto: any,
  //   expiredTime?: string,
  // ): Promise<string> {
  //   const token = jwt.sign(tokenDto, process.env.JWT_SECRET, {
  //     expiresIn: '10d',
  //   });
  //   return token;
  // }

  async forgotPassword(body: ForgotPasswordDto) {
    try {
      const user = await this.userService.findByEmail(body.email);

      if (!user) {
        return AuthExceptions.AcountNotExist();
      }

      // const token1 = await this.mailService.forgotPasswordMail(body.email);
      const token = await this.commonService.generateRandomString(32);

      const mailBody = `<tr>
                          <td style="padding:0 35px;">
                            <p style= "font-size:22px; text-align:left;">Hello ${user.name},</p>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                We've received a request to reset the password for your account.  Please click the link, below, to reset your password.
                            </p>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin-bottom:10px;">
                              If you did not make this request,  please contact our Support Team as soon as possible at <a href="mailto:  schoolmanagement@system.com" style="color:#0000EE;"> schoolmanagement@system.com</a>
                            </p>
                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">We're here to help you at any step in your journey.</p>
                            <p style= "font-size:20px">-School Management System</p>
                          </td>
                        </tr>`;

      // await this.mailer.sendMail(
      //   {
      //     userName: user.name,
      //     email: body.email,
      //     html: mailBody,
      //   },
      //   'Reset Your Password',
      // );

      // return await this.userService.resetToken(body.email, token);

      const restToken = await this.userModel.findOneAndUpdate(
        { email: body.email.toLowerCase() },
        { resetToken: token },
        { new: true },
      );
      successResponse.FORGOTPWDSUCC.data = {
        // resetToken: restToken.resetToken,
      };
      return successResponse.FORGOTPWDSUCC;
    } catch (error) {
      if (error?.response?.error) {
        throw error;
      } else {
        throw CustomException.UnknownError(error?.message);
      }
    }
  }

  async resetPassword(body: ResetPasswordDto) {
    try {
      const resetToken = await this.userModel.findOne({
        resetToken: body.token,
      });

      if (!resetToken) {
        throw AuthExceptions.InvalidToken();
      }

      const newPassword = await bcrypt.hash(body.newPassword, 10);
      await this.userModel.findOneAndUpdate(
        {
          email: resetToken.email,
        },
        {
          password: newPassword,
          resetToken: '',
        },
      );
      const mailBody = `<tr>
                          <td style="padding:0 35px;">
                            <p style= "font-size:22px; text-align:left;">Hello ${resetToken.name},</p>
                              <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                Your password to your account has been reset. If you didn't make a request to initiate this change, please contact our Support Team as soon as possible at <a href="mailto:  schoolmanagement@system.com" style="color:#0000EE;"> schoolmanagement@system.com</a>
                              </p>
                            </p>
                            <p style= "font-size:20px">-School Management System</p>    
                          </td>
                        </tr>`;

      // await this.mailer.sendMail(
      //   {
      //     userName: resetToken.name,
      //     email: resetToken.email,
      //     html: mailBody,
      //   },
      //   'Reset Your Password',
      // );

      successResponse.RESETPWDSUCC.data = {
        _id: resetToken._id,
        // resetToken: resetToken.resetToken,
      };
      return successResponse.RESETPWDSUCC;
    } catch (error) {
      if (error?.response?.error) {
        throw error;
      } else {
        throw CustomException.UnknownError(error?.message);
      }
    }
  }

  async changePassword(body: ChangePasswordDto) {
    try {
      const adminDetails = await this.userModel.findOne({
        _id: body.id,
      });
      if (!adminDetails) {
        return successResponse.USERNOTEXIST;
        // throw new HttpException("User does not exist", HttpStatus.BAD_REQUEST);
      }

      if (!bcrypt.compareSync(body.currentPassword, adminDetails.password)) {
        throw AuthExceptions.InvalidOldPassword();
      } else {
        const newPassword = await bcrypt.hash(body.newPassword, 10);
        await this.userModel.findOneAndUpdate(
          {
            _id: adminDetails._id,
          },
          {
            password: newPassword,
          },
          {
            new: true,
          },
        );
        return successResponse.CHANGEPWDSUCC;
      }
    } catch (error) {
      if (error?.response?.error) {
        throw error;
      } else {
        // throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async commonLogout(body: LogOutDto) {
    try {
      const findUser = await this.userModel.findOne({
        _id: new mongoose.Types.ObjectId(body._id),
      });

      /*find user exit or not*/
      if (!findUser) {
        throw new HttpException('user does not exists', HttpStatus.BAD_REQUEST);
      } else {
        /*fcmToken and authToken will be empty*/

        await this.userModel.findOneAndUpdate(
          {
            _id: new mongoose.Types.ObjectId(body._id),
          },
          {
            accessToken: '',
          },
        );

        return successResponse.LOG_OUT_SUCC;
      }
    } catch (error) {
      throw CustomException.UnknownError(error?.message);
    }
  }
}
