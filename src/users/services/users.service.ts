import { Injectable } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IdType } from '@/db/types/id.type';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  public async findById(id: IdType): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }
}
