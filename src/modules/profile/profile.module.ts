import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProfileNotificationController } from './controllers/profile-notification.controller';
import { ProfileController } from './controllers/profile.controller';
import { NotificationPreferences } from './entities/notification_preference.entity';
import { UserProfile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserProfile, NotificationPreferences])],
  providers: [ProfileService],
  controllers: [ProfileController, ProfileNotificationController],
})
export class ProfileModule {}
