import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  ALLOWED_IMAGE_MIME_TYPES,
  MAX_PICTURE_UPLOAD_SIZE,
} from 'src/constants/file-upload.constants';

import * as sysMsg from '../../constants/system.messages';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from '../user/entities/user.entity';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { NotificationPreferences } from './entities/notification_preference.entity';
import { UserProfile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(NotificationPreferences)
    private readonly notificationPreferenceRepository: Repository<NotificationPreferences>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async updateNotificationPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>,
  ) {
    let existing = await this.notificationPreferenceRepository.findOne({
      where: { userProfile: { user: { id: userId } } },
    });

    if (!existing) {
      existing = this.notificationPreferenceRepository.create({
        userProfile: { user: { id: userId } },
        ...preferences,
      });
    } else {
      Object.assign(existing, preferences);
    }

    return this.notificationPreferenceRepository.save(existing);
  }

  async findById(userId: string) {
    const userNotificationPreference =
      await this.notificationPreferenceRepository.findOne({
        where: { userProfile: { user: { id: userId } } },
      });

    const userProfile = await this.profileRepository.findOneBy({
      user: { id: userId },
    });

    return {
      ...userNotificationPreference,
      ...userProfile,
    };
  }

  update(userId: string, dto: UpdateProfileDto) {
    return this.profileRepository.update({ user: { id: userId } }, dto);
  }

  async updateAvatar(userId: string, file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(sysMsg.NO_FILE_FOUND);
    }

    if (!ALLOWED_IMAGE_MIME_TYPES.includes(file.mimetype)) {
      throw new BadRequestException(sysMsg.FILE_TYPE_NOT_ALLOWED);
    }

    if (file.size > MAX_PICTURE_UPLOAD_SIZE) {
      throw new BadRequestException('File size exceeds 5MB limit');
    }

    const profile = await this.profileRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(sysMsg.USER_PROFILE_NOT_FOUND);
    }

    if (profile.avatarUrl) {
      const oldPublicUrl = this.extractPublicIdFromUrl(profile.avatarUrl);
      if (oldPublicUrl) {
        await this.cloudinaryService.deleteImage(oldPublicUrl);
      }
    }

    const uploadResult = await this.cloudinaryService.uploadImage(
      file,
      'profile_avatars',
    );

    profile.avatarUrl = uploadResult.secure_url;
    await this.profileRepository.save(profile);

    return profile;
  }

  private extractPublicIdFromUrl(url: string): string | null {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[a-z]+)?$/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }

  async softDelete(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile', 'profile.notificationPreferences'],
    });

    if (!user) {
      throw new NotFoundException(sysMsg.USER_NOT_FOUND);
    }

    await this.userRepository.softDelete(userId);

    return { message: sysMsg.ACCOUNT_DELETED };
  }
}
