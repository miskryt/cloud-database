import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.engine('handlebars', engine());
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'node_modules/bootstrap/dist/'));
  app.useStaticAssets(join(__dirname, '..', 'node_modules/bootstrap-icons/'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('handlebars');

  await app.listen(3000);
}
bootstrap();
