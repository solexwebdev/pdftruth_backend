import { BaseResponse } from '@/common/responses/base.response';
import { ResponseProperty } from '@/common/decorators/response-property.decorator';

export type ClassType<T = any> = new (...args: any[]) => T;
export const withArrayResponse = <T extends ClassType>(ResourceCls: T) => {
  class ArrayResponse extends BaseResponse {
    @ResponseProperty({ each: true, cls: ResourceCls })
    readonly items: T[];
  }

  return ArrayResponse;
};
