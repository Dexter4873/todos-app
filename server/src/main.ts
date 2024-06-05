import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigService).get('port');

  await app.listen(port);
  Logger.log(`Running app on port: ${port}`);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
