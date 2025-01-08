import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { Social } from '@/users/entities/social.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '@/users/entities/user.entity';
import { SocialVendor } from '@/users/enums/social-vendor.enum';
import { ICreateSocial } from '@/users/interfaces/create-social.interface';

@Injectable()
export class SocialsService {
  constructor(
    @InjectRepository(Social)
    private readonly socialRepository: EntityRepository<Social>,
    private readonly em: EntityManager,
  ) {}

  public async save(payload: {
    user: User;
    sub: string;
    vendor: SocialVendor;
  }): Promise<void> {
    const social = new Social({ ...(payload as ICreateSocial) });

    await this.em.persistAndFlush(social);
  }
}
