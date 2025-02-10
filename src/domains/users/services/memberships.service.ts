import { Injectable } from '@nestjs/common';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Membership } from '@/domains/users/entities/membership.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Account } from '@/domains/accounts/entities/account.entity';
import { User } from '@/domains/users/entities/user.entity';
import { UserEvent } from '@/domains/users/enums/user-event.enum';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@/domains/users/events/user-created.event';
import { RolesService } from '@/domains/users/services/roles.service';
import { AccountsService } from '@/domains/accounts/services/accounts.service';
import { Role as RoleEnum } from '@/domains/users/enums/role.enum';
import { UsersService } from '@/domains/users/services/users.service';
import { Role } from '@/domains/users/entities/role.entity';
import { ICreateMembership } from '@/domains/users/interfaces/create-membership.interface';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: EntityRepository<Membership>,
    private readonly em: EntityManager,
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
    private readonly accountsService: AccountsService,
  ) {}

  @OnEvent(UserEvent.Create)
  public async handleUserCreatedEvent(event: UserCreatedEvent): Promise<void> {
    const account = await this.accountsService.save({ name: event.nickname });
    const roleOwner = await this.rolesService.findByName(RoleEnum.OWNER);

    await this.save({
      user: { id: event.userId },
      role: roleOwner,
      account,
    });
  }

  public async save(payload: { user: Partial<User>; account: Account; role: Role }): Promise<Membership> {
    const membership = new Membership({
      ...(payload as ICreateMembership),
      isDefault: true,
    });

    await this.em.persistAndFlush(membership);

    return membership;
  }
}
