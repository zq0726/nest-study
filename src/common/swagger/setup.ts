import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { getPackage } from '@/utils/getPackage';

export const setupSwagger = (app: INestApplication) => {
  const description = getPackage().description;
  const options = new DocumentBuilder()
    .setTitle('nest 学习')
    .setDescription(description)
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);
};
