import { Collection, Entity, Enum, Index, OneToMany, Opt, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { UserStatus } from '@/domains/users/enums/user-status.enum';
import { Social } from '@/domains/users/entities/social.entity';
import { Membership } from '@/domains/users/entities/membership.entity';
import { ICreateUser } from '@/domains/users/interfaces/create-user.interface';
import { Exclude } from 'class-transformer';

@Entity({ tableName: 'users' })
export class User extends CustomBaseEntity {
  @Property({ unique: true, nullable: false })
  email!: string;

  @Property({ nullable: true, hidden: true })
  @Exclude()
  password?: string;

  @Property({ nullable: true })
  nickname?: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @Property({ persist: false })
  get fullName() {
    return `${this.firstName} ${this.lastName}`?.trim();
  }

  @Property({ nullable: true })
  emailConfirmationToken!: string;

  @Enum({ items: () => UserStatus, default: UserStatus.ACTIVE })
  status!: UserStatus;

  @Index()
  @Property({ nullable: true, type: 'timestamptz' })
  deletedAt?: Date & Opt;

  @OneToMany(() => Social, (social) => social.user)
  socials = new Collection<Social>(this);

  @OneToMany(() => Membership, (membership) => membership.user)
  memberships = new Collection<Membership>(this);

  constructor(data: ICreateUser) {
    super();
    Object.assign(this, data);
  }
}
