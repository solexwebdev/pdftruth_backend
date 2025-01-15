import { ClsManageResponse } from '@/common/types/cls-manage-response.type';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ToNestedType } from '@/common/decorators/to-nested-type.decorator';

interface IResponseProperty<T> {
  nullable?: boolean;
  each?: boolean;
  cls?: ClsManageResponse<T> | null;
  enum?: object | undefined;
}

export function ResponseProperty<T>({
  nullable = false,
  each = false,
  cls = null,
  ...rest
}: IResponseProperty<T> = {}) {
  return applyDecorators(
    cls
      ? ApiProperty({ type: each ? [cls] : cls, required: !nullable })
      : ApiProperty({ isArray: each, nullable, enum: rest.enum }),
    Expose(),
    cls ? ToNestedType(cls) : (a: unknown): unknown => a,
    cls ? Type(() => cls) : (a: unknown): unknown => a,
  );
}
