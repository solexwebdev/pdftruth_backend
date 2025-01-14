import { INestApplication } from '@nestjs/common';

export const useCors = (app: INestApplication): void => {
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  });
};
