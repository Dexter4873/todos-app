import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { API_PREFIX } from './common/constants';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfig } from './config/swagger';

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

  // Set swagger
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(`${API_PREFIX}/docs`, app, document);

  // Set app prefix
  app.setGlobalPrefix(API_PREFIX);

  await app.listen(port);
  Logger.log(`Running server on port: ${port}`);
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
