import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Todos App API')
  .setDescription('This is todos app api')
  .setVersion('1.0')
  .addTag('Accounts')
  .build();
