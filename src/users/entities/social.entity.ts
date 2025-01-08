import { Entity, Enum, ManyToOne, Opt, Property } from '@mikro-orm/core';
import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { SocialVendor } from '@/users/enums/social-vendor.enum';
import { User } from '@/users/entities/user.entity';
import { ICreateSocial } from '@/users/interfaces/create-social.interface';

@Entity({ tableName: 'socials' })
export class Social extends CustomBaseEntity {
  @Property({ type: String })
  sub!: string & Opt;

  @Enum(() => SocialVendor)
  vendor!: SocialVendor;

  @ManyToOne(() => User, { nullable: false, deleteRule: 'cascade' })
  user!: User;

  constructor(data: ICreateSocial) {
    super();
    Object.assign(this, data);
  }
}
