import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';

import { ProfileController } from './controllers/profile.controller';
import { NotificationPreferences } from './entities/notification_preference.entity';
import { UserProfile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserProfile, NotificationPreferences, User]),
  ],
  providers: [ProfileService],
  controllers: [ProfileController],
  exports: [ProfileService],
})
export class ProfileModule {}
