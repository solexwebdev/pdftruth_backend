import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { Account } from '@/domains/accounts/entities/account.entity';
import { TransactionType } from '@/domains/points/enums/transaction-type.enum';
import { ICreatePointTransaction } from '@/domains/points/interfaces/create-point-transaction.interface';

@Entity({ tableName: 'point_transactions' })
export class PointTransaction extends CustomBaseEntity {
  @ManyToOne(() => Account, { nullable: false, deleteRule: 'cascade' })
  account!: Account;

  @Property({ type: 'integer', default: 0, nullable: false })
  amount!: number;

  @Enum(() => TransactionType)
  transactionType!: TransactionType;

  @Property({ type: 'text', default: null, nullable: true })
  description!: string | null;

  constructor(data: ICreatePointTransaction) {
    super();
    Object.assign(this, data);
  }
}
