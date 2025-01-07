import { Module } from '@nestjs/common';
import { UsersService } from '@/users/services/users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UsersService],
})
export class UsersModule {}
