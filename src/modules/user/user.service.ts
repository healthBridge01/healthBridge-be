import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import dataSource from 'src/database/data-source';

import { UserProfile } from '../profile/entities/profile.entity';

import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = queryRunner.manager.create(User, {
        email: payload.email,
        password: payload.password,
      });
      const savedUser = await queryRunner.manager.save(user);

      const profile = queryRunner.manager.create(UserProfile, {
        user: savedUser,
        fullName: payload.fullName,
        email: savedUser.email,
      });

      savedUser.profile = profile;

      await queryRunner.manager.save(profile);

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
