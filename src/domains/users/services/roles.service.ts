import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Role } from '@/domains/users/entities/role.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Role as RoleEnum } from '@/domains/users/enums/role.enum';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: EntityRepository<Role>,
  ) {}

  public async findByName(name: RoleEnum): Promise<Role> {
    return this.roleRepository.findOneOrFail({ name });
  }
}
