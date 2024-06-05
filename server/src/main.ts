import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { API_PREFIX } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get port
  const port = app.get(ConfigService).get('port');

  // Set Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Set app prefix
  app.setGlobalPrefix(API_PREFIX);

  await app.listen(port);
  Logger.log(`Running server on port: ${port}`);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
