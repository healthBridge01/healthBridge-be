import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProfile1776940595668 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user_profiles" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "user_id" uuid NOT NULL,
                "fullName" character varying NOT NULL,
                "email" character varying,
                "sound" character varying DEFAULT 'Note',
                "avatarUrl" character varying,
                "language" character varying NOT NULL DEFAULT 'en',
                "termsAndConditionsAccepted" boolean NOT NULL DEFAULT false,
                "privacyPolicyAccepted" boolean NOT NULL DEFAULT false,
                CONSTRAINT "PK_user_profiles_id" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_user_profiles_email" UNIQUE ("email"),
                CONSTRAINT "UQ_user_profiles_user_id" UNIQUE ("user_id"),
                CONSTRAINT "FK_user_profiles_user_id" FOREIGN KEY ("user_id")
                    REFERENCES "users"("id")
                    ON DELETE CASCADE
                    ON UPDATE NO ACTION
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS "notification_preferences";`);
    await queryRunner.query(`DROP TABLE IF EXISTS "user_profiles";`);
  }
}
