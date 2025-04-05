import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    console.log('response', exception.getResponse());

    const errorMessage =
      (exception.getResponse() as any)?.message ||
      exception.message ||
      'Internal Server Error';

    response.status(status).json({
      data: errorMessage,
      time: new Date().getTime(),
      success: false,
      path: request.url,
      status,
    });
  }
}
