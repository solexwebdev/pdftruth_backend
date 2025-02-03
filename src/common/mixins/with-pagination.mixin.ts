import { BaseResponse } from '@/common/responses/base.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';
import { PaginateMetaResponse } from '@/common/responses/paginate-meta.response';

export type ClassType<T = any> = new (...args: any[]) => T;
export const WithPaginatedResponse = <T extends ClassType>(ResourceCls: T) => {
  class PaginatedResponse extends BaseResponse {
    @ResponseProperty({ cls: ResourceCls, each: true })
    readonly data: T[];

    @ResponseProperty({ cls: PaginateMetaResponse })
    readonly meta: PaginateMetaResponse;
  }

  return PaginatedResponse;
};
