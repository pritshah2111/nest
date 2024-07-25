import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
} from 'src/common/dto/common.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LogOutDto } from './dto/logout.dto';
import { ChangePasswordDto } from './dto/changePassword.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() params: LoginDto): Promise<any> {
    return await this.authService.login(params);
  }

  @Public()
  @Post('/forgot-password')
  async forgotPassword(@Body() params: ForgotPasswordDto): Promise<any> {
    return await this.authService.forgotPassword(params);
  }

  @Public()
  @Post('/reset-password')
  async resetPassword(@Body() params: ResetPasswordDto): Promise<any> {
    return await this.authService.resetPassword(params);
  }

  @Post('changePassword')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'This api used to change password' })
  async changePassword(@Body() body: ChangePasswordDto): Promise<any> {
    return await this.authService.changePassword(body);
  }

  @Post('/commonLogOut')
  @ApiOperation({ summary: 'common logout Api for all the user(roles)' })
  @Public()
  async commonLogOut(@Body() body: LogOutDto) {
    return await this.authService.commonLogout(body);
  }
}
