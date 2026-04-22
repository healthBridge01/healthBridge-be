import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserProfile } from './entities/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
  ) {}

  findById(userId: string) {
    return this.profileRepository.findOneBy({ userId });
  }

  update(userId: string, dto: UpdateProfileDto) {
    return this.profileRepository.update({ userId }, dto);
  }

  updateAvatar(userId: string, file: Express.Multer.File) {
    return this.profileRepository.update(
      { userId },
      { avatarUrl: file.filename },
    );
  }

  softDelete(userId: string) {
    return this.profileRepository.softDelete({ userId });
  }
}
