import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({ type: 'string', required: true, format: 'binary' })
  file: Express.Multer.File;

  @ApiProperty({ required: true })
  moduleName: string;
}
