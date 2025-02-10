import { User } from '@/domains/users/entities/user.entity';

export interface ICreateUser extends Partial<User> {
  email: string;
}
