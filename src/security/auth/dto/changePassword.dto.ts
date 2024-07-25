import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  currentPassword: string;

  @ApiProperty()
  newPassword: string;
}
