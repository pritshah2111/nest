import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsEmail,
} from 'class-validator';
export class LoginDto {
  @ApiProperty({ required: true, default: 'admin@yopmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, default: 'Admin@123' })
  password: string;
}

export class ListingDto {
  @ApiProperty()
  @IsNotEmpty()
  page: number;

  @ApiProperty()
  @IsNotEmpty()
  limit: number;

  @ApiProperty()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsOptional()
  column: string;

  @ApiProperty()
  @IsOptional()
  order: string;
}

export class ForgotPasswordDto {
  @ApiProperty({ required: true })
  email: string;
}

export class ResetPasswordDto {
  @ApiProperty({ required: true })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  @MinLength(32)
  @MaxLength(32)
  token: string;

  @ApiProperty({ minLength: 8, maxLength: 16 })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  newPassword: string;
}

export class changePasswordDto {
  @ApiProperty({ minLength: 6, maxLength: 16 })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ minLength: 6, maxLength: 16 })
  @Transform(({ value }) => value.trim())
  @IsNotEmpty()
  newPassword: string;
}
