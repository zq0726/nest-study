import { ExceptionsFilter } from '@/common/filters/exceptions/exceptions.filter';
import { INestApplication, ValidationPipe } from '@nestjs/common';

export const init = (app: INestApplication) => {
  // 启用 全局验证管道
  // 通过 @nestjs/common 中的 ValidationPipe 来实现
  app.useGlobalPipes(new ValidationPipe());

  //启用 全局错误处理
  app.useGlobalFilters(new ExceptionsFilter());
};
