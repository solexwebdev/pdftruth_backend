import { DeepPartial } from '@mikro-orm/core';

export abstract class BaseResponse<T = unknown> {
  constructor(object: DeepPartial<T>) {
    Object.assign(this, object);
  }
}
