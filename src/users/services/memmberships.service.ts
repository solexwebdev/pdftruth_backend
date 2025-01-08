import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Membership } from '@/users/entities/membership.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Account } from '@/accounts/entities/account.entity';
import { Role } from '@/users/entities/role.entity';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: EntityRepository<Membership>,
    private readonly em: EntityManager,
  ) {}

  public async save(payload: {
    user: User;
    account: Account;
    role: Role;
  }): Promise<Membership> {
    const membership = this.em.create(Membership, payload, { partial: true });

    await this.em.persistAndFlush(membership);

    return membership;
  }
}
