import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'IsStrongPassword', async: false })
export class IsValidPasswordValidator implements ValidatorConstraintInterface {
  validate(
    password: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    args?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return (
      typeof password === 'string' &&
      password.length > 7 &&
      password.length <= 50 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[@#$%^&*(),.?":{}|<>_-]/.test(password)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return (
      'Password must be between 7 and 50 characters long and include at least one uppercase letter, ' +
      'one lowercase letter, one number, and one special character.'
    );
  }
}
