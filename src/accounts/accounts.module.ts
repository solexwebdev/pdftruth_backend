import { Module } from '@nestjs/common';
import { AccountsController } from '@/accounts/controllers/accounts.controller';
import { AccountsService } from '@/accounts/services/accounts.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@/accounts/entities/account.entity';
import { AccountsFactory } from '@/accounts/factories/accounts.factory';
import { AccountFactory } from '@/accounts/factories/account.factory';

@Module({
  imports: [MikroOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService, AccountFactory, AccountsFactory],
  exports: [AccountsService],
})
export class AccountsModule {}
