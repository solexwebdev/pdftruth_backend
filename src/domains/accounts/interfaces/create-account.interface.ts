import { Account } from '@/domains/accounts/entities/account.entity';

export interface ICreateAccount extends Partial<Account> {
  name: string;
}
