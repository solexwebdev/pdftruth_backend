import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from '@/common/types/request.type';

export const UserToken = createParamDecorator(
  (_, context: ExecutionContext) => {
    return (context.switchToHttp().getRequest() as Request).tokenData;
  },
);
