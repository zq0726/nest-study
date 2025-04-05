import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponse } from '@/common/types/http';

@Injectable()
export class TransformInterceptor<T = any>
  implements NestInterceptor<T, ApiResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    if (
      request.method === 'post' &&
      response.statusCode === HttpStatus.CREATED
    ) {
      response.status(HttpStatus.OK);
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
