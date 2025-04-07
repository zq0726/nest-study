import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as pc from 'picocolors';
import { init } from './config/app.config';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const appPort = process.env.port || 3700;

  // 一些公共配置
  init(app);

  await app.listen(appPort);
  console.log(
    pc.green(
      `\n
      ══════════════════════════════════════════════
                                                    
        ${pc.yellow('NestJS Server is running!')}   
        ${pc.yellow(`http://localhost:${appPort}`)}      
      `,
    ),
  );
}
bootstrap();
