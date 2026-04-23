import {
  BadRequestException,
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
import { ApiBearerAuth } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';

import { MAX_PICTURE_UPLOAD_SIZE } from 'src/constants/file-upload.constants';

import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { User } from '../../user/entities/user.entity';
import { DeleteUserAccountDoc } from '../doc/delete-user-account.doc';
import { GetProfileDoc } from '../doc/get-profile.doc';
import { UpdateProfileNotificationDoc } from '../doc/update-profile-notification.doc';
import { UpdateProfileDoc } from '../doc/update-profile.doc';
import { UpdateProfileAvatar } from '../doc/update-user-avatar.doc';
import { UpdateNotificationDto } from '../dto/update-notification.dto';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../profile.service';

@ApiTags('Profile')
@Controller('profile')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
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

  @UpdateProfileAvatar()
  @Post('avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: MAX_PICTURE_UPLOAD_SIZE },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException('Only image files are allowed'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadAvatar(
    @CurrentUser() user: User,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const profile = await this.profileService.updateAvatar(user.id, file);
    return {
      status_code: 200,
      message: 'Avatar updated successfully',
      data: { avatarUrl: profile.avatarUrl },
    };
  }

  @DeleteUserAccountDoc()
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
