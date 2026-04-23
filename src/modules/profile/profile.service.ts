import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as sysMsg from '../../constants/system.messages';
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

  updateAvatar(userId: string, file: Express.Multer.File) {
    console.log(file);

    return this.profileRepository.update(
      { user: { id: userId } },
      { avatarUrl: file.filename },
    );
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
