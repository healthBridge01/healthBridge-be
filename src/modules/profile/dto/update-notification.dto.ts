import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @ApiProperty({
    description: 'Whether to show notifications',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  showNotification?: boolean;

  @ApiProperty({
    description: 'Whether to receive AI-generated notifications',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  aiNotifications?: boolean;

  @ApiProperty({
    description: 'Whether to receive medication reminders',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  medicationReminder?: boolean;

  @ApiProperty({
    description: 'Whether to receive appointment reminders',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  appointmentReminder?: boolean;

  @ApiProperty({
    description: 'Whether to receive lab results notifications',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  labResults?: boolean;

  @ApiProperty({
    description: 'Whether to receive health tips notifications',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  healthTips?: boolean;

  @ApiProperty({
    description: 'Whether to receive personal information change notifications',
    example: false,
  })
  @IsOptional()
  @IsBoolean()
  personalInformation?: boolean;
}
