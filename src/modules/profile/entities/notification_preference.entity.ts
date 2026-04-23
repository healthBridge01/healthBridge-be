import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../../../entities/base-entity';

import { UserProfile } from './profile.entity';

@Entity('notification_preferences')
export class NotificationPreferences extends BaseEntity {
  @OneToOne(() => UserProfile, (profile) => profile.notificationPreferences)
  @JoinColumn({ name: 'user_profile_id' })
  userProfile: UserProfile;

  @Column({ default: true })
  showNotification: boolean;

  @Column({ default: true })
  aiNotifications: boolean;

  @Column({ default: true })
  medicationReminder: boolean;

  @Column({ default: true })
  appointmentReminder: boolean;

  @Column({ default: true })
  labResults: boolean;

  @Column({ default: true })
  healthTips: boolean;

  @Column({ default: true })
  personalInformation: boolean;
}
