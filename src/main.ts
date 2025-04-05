import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as pc from 'picocolors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3700);
  console.log(
    pc.green(
      `\n
      ╔══════════════════════════════════════════════╗
      ║                                              ║
      ║   ${pc.yellow('NestJS Server is running!')}   ║
      ║   ${pc.yellow('http://localhost:3700')}   ║   
      `,
    ),
  );
}
bootstrap();
