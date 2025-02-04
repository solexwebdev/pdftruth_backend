import { BadRequestException, INestApplication, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigEnv } from '@/common/enums/config-env.enum';
import { Environment } from '@/common/enums/environment.enum';

export const useValidation = (app: INestApplication, configService: ConfigService): void => {
  const isProduction = configService.get(ConfigEnv.NODE_ENV) === Environment.Production;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: isProduction,
      transform: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const getPrettyClassValidatorErrors = (
          validationErrors: ValidationError[],
          parentProperty = '',
        ): Array<{ property: string; errors: string[] }> => {
          const errors: { property: string; errors: string[] }[] = [];

          const getValidationErrorsRecursively = (validationErrors: ValidationError[], parentProperty = '') => {
            for (const error of validationErrors) {
              const propertyPath = parentProperty ? `${parentProperty}.${error.property}` : error.property;

              if (error.constraints) {
                errors.push({
                  property: propertyPath,
                  errors: Object.values(error.constraints),
                });
              }

              if (error.children?.length) {
                getValidationErrorsRecursively(error.children, propertyPath);
              }
            }
          };

          getValidationErrorsRecursively(validationErrors, parentProperty);

          return errors;
        };

        const errors = getPrettyClassValidatorErrors(validationErrors);

        return new BadRequestException({
          message: 'validation error',
          errors: errors,
        });
      },
    }),
  );
};
