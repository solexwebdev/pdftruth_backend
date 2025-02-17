import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { log } from 'console';
import { Request } from '@/common/types/request.type';
import { EntityManager } from '@mikro-orm/postgresql';
import { Point } from '../entities/point.entity';

@Injectable()
export class CheckPointGuard implements CanActivate {
  constructor(private readonly em: EntityManager) {}
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    {
      const { params }: Request = context.switchToHttp().getRequest();

      const point = await this.em.findOne(Point, {
        account: { id: params.accountId },
      });

      if (!point) throw new ForbiddenException(`Account's points not found.`);

      if (point.balance <= 0) throw new ForbiddenException(`Insufficient points balance on the account.`);

      return true;
    }
  }
}
