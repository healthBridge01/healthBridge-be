import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { NotificationPreferences } from './entities/notification_preference.entity';
import { UserProfile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    @InjectRepository(NotificationPreferences)
    private readonly notificationPreferenceRepository: Repository<NotificationPreferences>,
  ) {}

  async updateNotificationPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>,
  ) {
    let existing = await this.notificationPreferenceRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!existing) {
      existing = this.notificationPreferenceRepository.create({
        userId,
        ...preferences,
      });
    } else {
      Object.assign(existing, preferences);
    }

    return this.notificationPreferenceRepository.save(existing);
  }

  findById(userId: string) {
    return this.profileRepository.findOneBy({ user: { id: userId } });
  }

  update(userId: string, dto: UpdateProfileDto) {
    return this.profileRepository.update({ user: { id: userId } }, dto);
  }

  updateAvatar(userId: string, file: Express.Multer.File) {
    return this.profileRepository.update(
      { user: { id: userId } },
      { avatarUrl: file.filename },
    );
  }

  softDelete(userId: string) {
    return this.profileRepository.softDelete({ user: { id: userId } });
  }
}
