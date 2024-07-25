import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true })
  phone: string;

  @ApiProperty({ default: 'user' })
  userRole: string;

  @ApiProperty({ default: true })
  isActive: boolean;
}
