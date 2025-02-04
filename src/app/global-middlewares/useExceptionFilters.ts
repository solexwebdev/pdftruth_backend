import { INestApplication } from '@nestjs/common';
import { EntityNotFoundFilter } from '@/common/exception-filters/entity-not-found.filter';

export const useExceptionFilters = (app: INestApplication): void => {
  app.useGlobalFilters(new EntityNotFoundFilter());
};
