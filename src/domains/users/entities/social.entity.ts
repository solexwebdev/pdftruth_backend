import { Entity, Enum, ManyToOne, Opt, Property, Rel } from '@mikro-orm/core';
import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { SocialVendor } from '@/domains/users/enums/social-vendor.enum';
import { User } from '@/domains/users/entities/user.entity';
import { ICreateSocial } from '@/domains/users/interfaces/create-social.interface';

@Entity({ tableName: 'socials' })
export class Social extends CustomBaseEntity {
  @Property({ type: String })
  sub!: string & Opt;

  @Enum(() => SocialVendor)
  vendor!: SocialVendor;

  @ManyToOne(() => User, { nullable: false, deleteRule: 'cascade' })
  user!: Rel<User>;

  constructor(data: ICreateSocial) {
    super();
    Object.assign(this, data);
  }
}
