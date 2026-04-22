import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Olivia Jane',
  })
  fullName?: string;

  @ApiProperty({
    example: 'en',
    description: 'User preferred language',
  })
  @IsOptional()
  @IsString()
  language?: string;
}
