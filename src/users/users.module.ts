import { Module } from '@nestjs/common';
import { UsersService } from '@/users/services/users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@/users/entities/user.entity';
import { Role } from '@/users/entities/role.entity';
import { Social } from '@/users/entities/social.entity';
import { Membership } from '@/users/entities/membership.entity';
import { SocialsService } from '@/users/services/socials.service';
import { RolesService } from '@/users/services/roles.service';
import { MembershipsService } from '@/users/services/memberships.service';
import { AccountsModule } from '@/accounts/accounts.module';
import { RoleFactory } from '@/users/factories/role.factory';
import { UserFactory } from '@/users/factories/user.factory';
import { ProfileFactory } from '@/users/factories/profile.factory';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [User, Role, Social, Membership] }), AccountsModule, CommonModule],
  providers: [UsersService, RolesService, SocialsService, MembershipsService, RoleFactory, UserFactory, ProfileFactory],
  exports: [UsersService, RolesService, ProfileFactory],
})
export class UsersModule {}
