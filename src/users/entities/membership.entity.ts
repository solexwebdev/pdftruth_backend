import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { User } from '@/users/entities/user.entity';
import { Account } from '@/accounts/entities/account.entity';
import { Role } from '@/users/entities/role.entity';

@Entity({ tableName: 'memberships' })
export class Membership extends CustomBaseEntity {
  @Property({ type: Boolean, default: false })
  isDefault!: boolean;

  @ManyToOne(() => User, { nullable: false, deleteRule: 'cascade' })
  user!: User;

  @ManyToOne(() => Account, { nullable: false, deleteRule: 'cascade' })
  account!: Account;

  @ManyToOne(() => Role, { nullable: false, deleteRule: 'cascade' })
  role!: Role;
}
