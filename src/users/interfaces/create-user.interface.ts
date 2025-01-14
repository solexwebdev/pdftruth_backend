import { User } from '@/users/entities/user.entity';

export interface ICreateUser extends Partial<User> {
  email: string;
}
