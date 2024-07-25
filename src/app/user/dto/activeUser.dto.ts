import { ApiProperty } from '@nestjs/swagger';

export class activeInactiveUserDto {
  @ApiProperty()
  // @IsNotEmpty()
  userId: string;

  @ApiProperty()
  // @IsNotEmpty()
  isActive: boolean;
}
