import { InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersDocument } from 'src/schema/user.schema';
import { AuthExceptions } from 'src/common/constants/exceptions/auth.exception';
export class IsLoggedInMiddleware implements NestMiddleware {
  constructor(
    @InjectModel('Users')
    private userModel: Model<UsersDocument>,
  ) {}

  async use(req, res: Response, next: NextFunction) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const secretKey = process.env.JWT_SECRET;
      const accessToken = req.headers.authorization.split(' ')[1];

      try {
        const letData: any = verify(accessToken, secretKey);

        req['user'] = letData;
        if (req['user']) {
          const isValidUser = await this.isValidUser(
            req['user'].roles,
            req['user'].email,
          );
          if (isValidUser) {
            next();
          } else {
            this.handleUnauthorizedRequest(
              res,
              'Unauthorised Request || user not found.',
            );
          }
        } else {
          this.handleUnauthorizedRequest(res, 'Unauthorised Request');
        }
      } catch (error) {
        if (error?.name === 'TokenExpiredError') {
          throw AuthExceptions.TokenExpired();
        }
        if (error?.name === 'JsonWebTokenError') {
          throw AuthExceptions.InvalidToken();
        }
        if (error) {
          AuthExceptions.ForbiddenException();
        }
        throw new InternalServerErrorException('Internal Server error');
      }
    } else {
      next();
    }
  }

  async isValidUser(roles: string, email: string): Promise<boolean> {
    const findUser = await this.userModel.findOne({
      email: email,
      isDeleted: false,
    });

    if (
      !findUser ||
      findUser.isDeleted ||
      !findUser.isActive ||
      findUser.accessToken === ''
    ) {
      return false;
    }

    switch (roles) {
      case 'admin':
        return true;
      case 'school':
        return true;
      default:
        return false;
    }
  }

  handleUnauthorizedRequest(res: Response, message: string) {
    res.status(401).json({
      statusCode: 401,
      message: message,
      data: {},
    });
  }
}
