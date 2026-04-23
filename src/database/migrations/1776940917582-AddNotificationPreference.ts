import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNotificationPreference1776940917582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "notification_preferences" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "user_profile_id" uuid NOT NULL,
                "showNotification" boolean NOT NULL DEFAULT true,
                "aiNotifications" boolean NOT NULL DEFAULT true,
                "medicationReminder" boolean NOT NULL DEFAULT true,
                "appointmentReminder" boolean NOT NULL DEFAULT true,
                "labResults" boolean NOT NULL DEFAULT true,
                "healthTips" boolean NOT NULL DEFAULT true,
                "personalInformation" boolean NOT NULL DEFAULT true,
                CONSTRAINT "PK_notification_preferences_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_notification_preferences_user_profile_id" UNIQUE ("user_profile_id"),
                CONSTRAINT "FK_notification_preferences_user_profile_id" FOREIGN KEY ("user_profile_id") REFERENCES "user_profiles"("id")
                ON DELETE CASCADE
                ON UPDATE NO ACTION
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "notification_preferences";`);
  }
}
