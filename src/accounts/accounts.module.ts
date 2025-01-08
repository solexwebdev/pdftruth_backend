import { Module } from '@nestjs/common';
import { AccountsController } from '@/accounts/controllers/accounts.controller';
import { AccountsService } from '@/accounts/services/accounts.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from '@/accounts/entities/account.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
