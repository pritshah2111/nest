import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/security/role/role.decorators';
import { RolesGuard } from 'src/security/role/role.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/security/auth/auth.decorator';
import { activeInactiveUserDto } from './dto/activeUser.dto';
import { ROLE } from 'src/common/constants';

@Controller('user')
@ApiTags('User Management')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @ApiBearerAuth()
  @Roles(ROLE.Admin)
  // @UseGuards(RolesGuard)
  @Get('/')
  findAll() {
    return this.userService.findAll();
  }

  @Public()
  @Post('/createUser')
  async createUser(@Body() params: CreateUserDto): Promise<any> {
    return await this.userService.createUser(params);
  }

  @ApiBearerAuth()
  // @Roles(ROLE.Admin)
  // @UseGuards(RolesGuard)
  @Get('getUserDetails/:id')
  async getUserDetails(@Param('id') id: string) {
    return this.userService.getUserDetails(id);
  }

  // @Get('studentDetail/:id')
  // studentDetail(@Param('id') id: string) {
  //   return this.studentService.studentDetail(id);
  // }

  // update user profile
  @ApiBearerAuth()
  // @Roles(ROLE.User)
  // @UseGuards(RolesGuard)
  @Patch('updateUser/:id')
  updateUser(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string) {
    return this.userService.updateUser(id, updateUserDto);
  }

  // @ApiBearerAuth()
  @Delete('deleteUser/:id')
  @Public()
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
