import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class ServerExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(ServerExceptionsFilter.name);

  catch(exception: Error, host: ArgumentsHost): void {
    this.logger.error(exception, exception.stack);

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const responseBody = {
      key: 'internal-server-error',
      message: exception.message,
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseBody);
  }
}
