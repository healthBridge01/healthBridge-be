import { Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateProfileNotificationDoc } from '../doc/update-profile-notification.doc';
import { NotificationPreferences } from '../entities/notification_preference.entity';

@ApiTags('Profile Notifications')
@Controller('profile/notification')
export class ProfileNotificationController {
  constructor(
    @InjectRepository(NotificationPreferences)
    private readonly notificationRepo: Repository<NotificationPreferences>,
  ) {}

  @UpdateProfileNotificationDoc()
  @Patch()
  async updateNotificationPreferences(
    userId: string,
    preferences: Partial<NotificationPreferences>,
  ) {
    let existing = await this.notificationRepo.findOne({
      where: { user: { id: userId } },
    });

    if (!existing) {
      existing = this.notificationRepo.create({ userId, ...preferences });
    } else {
      Object.assign(existing, preferences);
    }

    return this.notificationRepo.save(existing);
  }
}
