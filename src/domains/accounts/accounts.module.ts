import { forwardRef, Module } from '@nestjs/common';
import { AccountsController } from '@/domains/accounts/controllers/accounts.controller';
import { AccountsService } from '@/domains/accounts/services/accounts.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@/domains/accounts/entities/account.entity';
import { AccountsFactory } from '@/domains/accounts/factories/accounts.factory';
import { AccountFactory } from '@/domains/accounts/factories/account.factory';
import { UsersModule } from '@/domains/users/users.module';
import { MyAccountFactory } from '@/domains/accounts/factories/my-account.factory';

@Module({
  imports: [MikroOrmModule.forFeature([Account]), forwardRef(() => UsersModule)],
  controllers: [AccountsController],
  providers: [AccountsService, AccountFactory, MyAccountFactory, AccountsFactory],
  exports: [AccountsService],
})
export class AccountsModule {}
