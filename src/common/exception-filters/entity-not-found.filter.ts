import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { NotFoundError } from '@mikro-orm/core';

@Catch(NotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(_: NotFoundError, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse();

    response.status(HttpStatus.NOT_FOUND).json({
      message: 'Entry not found.',
      isNotHumanreadable: false,
    });
  }
}
