import { Seeder } from '@mikro-orm/seeder';
import { Dictionary, EntityManager } from '@mikro-orm/postgresql';
import { Role } from '@/users/entities/role.entity';
import { Role as RoleEnum } from '@/users/enums/role.enum';

export class RolesSeeder extends Seeder {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    const existRoles = await em.findAll(Role);
    const roles: Role[] = [];
    for (const roleName of Object.values(RoleEnum)) {
      const exist = existRoles.some((er) => er.name === roleName);

      if (!exist) {
        const role = new Role({ name: roleName });
        roles.push(role);
      }
    }

    if (roles.length) await em.persistAndFlush(roles);
  }
}
