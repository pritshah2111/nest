import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LogOutDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;
}
