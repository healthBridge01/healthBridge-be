import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';

import { BaseEntity } from '../../../entities/base-entity';

@Entity('notification_preferences')
export class NotificationPreferences extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({ default: true })
  userId: string;

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
