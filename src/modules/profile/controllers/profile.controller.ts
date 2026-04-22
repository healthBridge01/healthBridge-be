import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../user/entities/user.entity';
import { GetProfileDoc } from '../doc/get-profile.doc';
import { UpdateProfileNotificationDoc } from '../doc/update-profile-notification.doc';
import { UpdateProfileDoc } from '../doc/update-profile.doc';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../profile.service';

@ApiTags('Profile')
@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @GetProfileDoc()
  @Get()
  getProfile(@CurrentUser() user: User) {
    return this.profileService.findById(user.id);
  }

  @UpdateProfileDoc()
  @Patch()
  updateProfile(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profileService.update(user.id, dto);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadAvatar(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.updateAvatar(user.id, file);
  }

  @Delete()
  deleteAccount(@CurrentUser() user: User) {
    return this.profileService.softDelete(user.id);
  }

  @UpdateProfileNotificationDoc()
  @Patch('notifications')
  updateProfileNotification(
    @CurrentUser() user: User,
    @Body() notificationPreferenceDto: UpdateNotificationDto,
  ) {
    return this.profileService.updateNotificationPreferences(
      user.id,
      notificationPreferenceDto,
    );
  }
}
