import { ApiProperty } from '@nestjs/swagger';

export class GetProfileDtoResponse {
  @ApiProperty({
    example: 'Olivia Jane',
    description: 'User full name',
  })
  fullName: string;

  @ApiProperty({
    example: 'janebetty@gmail.com',
    description: 'User email address',
  })
  email: string;

  @ApiProperty({
    example: 'en',
    description: 'User preferred language',
  })
  language: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: "URL of the user's avatar image",
  })
  avatarUrl: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user has enabled notifications',
  })
  showNotification: boolean;

  @ApiProperty({
    example: 'Notes',
    description: 'User preferred sound',
  })
  sound: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user has enabled AI notifications',
  })
  aiNotifications: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the user has enabled medication reminders',
  })
  medicationReminder: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the user has enabled appointment reminders',
  })
  appointmentReminder: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the user has enabled lab results notifications',
  })
  labResults: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the user has enabled health tips notifications',
  })
  healthTips: boolean;

  @ApiProperty({
    example: true,
    description:
      'Whether the user has enabled personal information notifications',
  })
  personalInformation: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the user has accepted the terms and conditions',
  })
  termsAndConditionsAccepted: boolean;

  @ApiProperty({
    example: true,
    description: 'Whether the user has accepted the privacy policy',
  })
  privacyPolicyAccepted: boolean;
}
