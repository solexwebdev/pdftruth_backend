import { Account } from '@/accounts/entities/account.entity';

export interface ICreateAccount extends Partial<Account> {
  name: string;
}
