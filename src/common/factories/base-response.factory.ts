import { CustomBaseEntity } from '@/db/entities/custom-base.entity';
import { BaseResponse } from '@/common/responses/base.response';

export abstract class BaseResponseFactory<
  E extends CustomBaseEntity | Record<string, any>,
  R extends BaseResponse,
  Options extends Record<string, undefined> = Record<string, undefined>,
> {
  abstract createResponse(entity: E, options?: Options): R | Promise<R>;
}
