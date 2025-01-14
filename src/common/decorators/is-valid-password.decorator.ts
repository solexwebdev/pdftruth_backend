import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsValidPasswordValidator } from '@/common/validators/is-valid-password.validator';

export function IsValidPassword(
  validationOptions?: ValidationOptions & { nullable?: boolean },
) {
  return function (object: NonNullable<unknown>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPasswordValidator,
    });
  };
}
