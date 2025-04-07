import { ExceptionsFilter } from '@/common/filters/exceptions/exceptions.filter';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import * as compression from 'compression';
import * as helmet from 'helmet';
// import * as csurf from 'csurf';
import { setupSwagger } from '@/common/swagger/setup';

export const init = (app: INestApplication) => {
  // 配置项目版本
  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'v',
    defaultVersion: process.env.version,
  });

  // 配置全局路由前缀
  app.setGlobalPrefix('api');

  // 启用 全局验证管道
  // 通过 @nestjs/common 中的 ValidationPipe 来实现
  app.useGlobalPipes(new ValidationPipe());

  //启用 全局错误处理
  app.useGlobalFilters(new ExceptionsFilter());

  // 使用压缩中间件
  app.use(compression());

  // 使用 Helmet 保护http
  app.use(helmet.default());

  // 使用 csurf 进行 csrf 保护
  // 在使用前 应配置会话存储 和 csrf 密钥
  // app.use(csurf());

  // 配置跨越
  app.enableCors();

  //配置 swagger
  setupSwagger(app);
};
