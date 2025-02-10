import { Entity, Enum } from '@mikro-orm/core';
import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { Role as UserRole } from '@/domains/users/enums/role.enum';
import { ICreateRole } from '@/domains/users/interfaces/create-role.interface';

@Entity({ tableName: 'roles' })
export class Role extends CustomBaseEntity {
  @Enum(() => UserRole)
  name!: UserRole;

  constructor(data: ICreateRole) {
    super();
    Object.assign(this, data);
  }
}
