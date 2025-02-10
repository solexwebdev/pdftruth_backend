import { Module } from '@nestjs/common';
import { UsersService } from '@/domains/users/services/users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@/domains/users/entities/user.entity';
import { Role } from '@/domains/users/entities/role.entity';
import { Social } from '@/domains/users/entities/social.entity';
import { Membership } from '@/domains/users/entities/membership.entity';
import { SocialsService } from '@/domains/users/services/socials.service';
import { RolesService } from '@/domains/users/services/roles.service';
import { MembershipsService } from '@/domains/users/services/memberships.service';
import { AccountsModule } from '@/domains/accounts/accounts.module';
import { RoleFactory } from '@/domains/users/factories/role.factory';
import { UserFactory } from '@/domains/users/factories/user.factory';
import { ProfileFactory } from '@/domains/users/factories/profile.factory';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, Role, Social, Membership] }), AccountsModule, CommonModule],
  providers: [UsersService, RolesService, SocialsService, MembershipsService, RoleFactory, UserFactory, ProfileFactory],
  exports: [UsersService, RolesService, ProfileFactory],
})
export class UsersModule {}
