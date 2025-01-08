import { Module } from '@nestjs/common';
import { UsersService } from '@/users/services/users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@/users/entities/user.entity';
import { Role } from '@/users/entities/role.entity';
import { Social } from '@/users/entities/social.entity';
import { Membership } from '@/users/entities/membership.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, Role, Social, Membership])],
  providers: [UsersService],
})
export class UsersModule {}
