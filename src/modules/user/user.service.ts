import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { NotificationPreferences } from '../profile/entities/notification_preference.entity';
import { UserProfile } from '../profile/entities/profile.entity';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByResetToken(token: string) {
    return this.userRepository.findOne({
      where: { reset_token: token },
    });
  }

  async create(payload) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create(User, payload);
      const savedUser = await queryRunner.manager.save(user);

      const profile = queryRunner.manager.create(UserProfile, {
        user: savedUser,
        fullName: `${payload.first_name} ${payload.middle_name} ${payload.last_name}`,
        email: payload.email,
      });
      const savedProfile = await queryRunner.manager.save(profile);

      const preferences = queryRunner.manager.create(NotificationPreferences, {
        userProfile: savedProfile,
        showNotification: true,
        aiNotifications: true,
        medicationReminder: true,
        appointmentReminder: true,
        labResults: true,
        healthTips: true,
        personalInformation: true,
      });
      await queryRunner.manager.save(preferences);

      savedProfile.notificationPreferences = preferences;
      await queryRunner.manager.save(savedProfile);

      await queryRunner.manager.update(User, savedUser.id, {
        profile: { id: savedProfile.id },
      });
      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  save(user: User) {
    return this.userRepository.save(user);
  }
}
