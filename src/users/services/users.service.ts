import { Injectable } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { IdType } from '@/db/types/id.type';
import { ICreateUser } from '@/users/interfaces/create-user.interface';
import { EntityManager } from '@mikro-orm/core';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  public async findById(id: IdType): Promise<User> {
    return this.userRepository.findOneOrFail({ id });
  }

  public async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOneOrFail({ email });
  }

  public async save(payload: ICreateUser): Promise<User> {
    const user = new User({ ...(payload as ICreateUser) });
    await this.em.persistAndFlush(user);
    return user;
  }
}
