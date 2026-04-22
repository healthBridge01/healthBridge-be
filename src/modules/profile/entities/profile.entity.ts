import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { User } from 'src/modules/user/entities/user.entity';

import { BaseEntity } from '../../../entities/base-entity';

import { NotificationPreferences } from './notification_preference.entity';

@Entity('user_profiles')
export class UserProfile extends BaseEntity {
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => NotificationPreferences, (np) => np.user, { cascade: true })
  notificationPreferences: NotificationPreferences;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  fullName: string;

  @Column({ nullable: false, unique: true })
  emailAddress: string;

  @Column({ nullable: false })
  sound: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: 'en' })
  language: string;

  @Column({ default: false })
  termsAndConditionsAccepted: boolean;

  @Column({ default: false })
  privacyPolicyAccepted: boolean;
}
