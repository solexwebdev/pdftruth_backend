import { Seeder } from '@mikro-orm/seeder';
import { Dictionary, EntityManager } from '@mikro-orm/postgresql';
import { User } from '@/users/entities/user.entity';

export class UserSeeder extends Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const user = new User({ password: 'password', email: 'test' });

    await em.persistAndFlush(user);
  }
}
