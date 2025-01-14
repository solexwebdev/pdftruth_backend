import { ClsManageResponse } from '@/common/types/cls-manage-response.type';
import { Transform, TransformFnParams } from 'class-transformer';

export function toNestedType<T>(
  value: any,
  cls: ClsManageResponse<T>,
): T | T[] {
  if (!value) return value;

  return Array.isArray(value) ? value.map((v) => new cls(v)) : new cls(value);
}

export function ToNestedType<T>(
  cls: ClsManageResponse<T>,
): (target: unknown, key: string) => void {
  return Transform((params: TransformFnParams) =>
    toNestedType(params.value, cls),
  );
}
