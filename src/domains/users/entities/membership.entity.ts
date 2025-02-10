import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';
import { User } from '@/domains/users/entities/user.entity';
import { Account } from '@/domains/accounts/entities/account.entity';
import { Role } from '@/domains/users/entities/role.entity';
import { ICreateMembership } from '@/domains/users/interfaces/create-membership.interface';

@Entity({ tableName: 'memberships' })
export class Membership extends CustomBaseEntity {
  @Property({ type: Boolean, default: false })
  isDefault!: boolean;

  @ManyToOne(() => User, { nullable: false, deleteRule: 'cascade' })
  user!: Rel<User>;

  @ManyToOne(() => Account, { nullable: false, deleteRule: 'cascade' })
  account!: Rel<Account>;

  @ManyToOne(() => Role, { nullable: false, deleteRule: 'cascade' })
  role!: Rel<Role>;

  constructor(data: ICreateMembership) {
    super();
    Object.assign(this, data);
  }
}
