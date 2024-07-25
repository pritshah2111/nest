import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { AUTH_IS_PUSBLIC_KEY } from 'src/common/constants';
import { AuthExceptions } from 'src/common/constants/exceptions/auth.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      AUTH_IS_PUSBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  heandleRequest(err, user, info) {
    if (info?.name === 'TokenExpiredError') {
      throw AuthExceptions.TokenExpired();
    }

    if (info?.name === 'JsonWebTokenError') {
      throw AuthExceptions.InvalidToken();
    }

    if (err || !user) {
      throw err || AuthExceptions.ForbiddenException();
    }
    return user;
  }
}
