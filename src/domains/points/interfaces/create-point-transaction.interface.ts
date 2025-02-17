import { PointTransaction } from '@/domains/points/entities/point-transaction.entity';
import { TransactionType } from '@/domains/points/enums/transaction-type.enum';

export interface ICreatePointTransaction extends Pick<PointTransaction, any> {
  amount: number;
  transactionType: TransactionType;
  description: string;
}
