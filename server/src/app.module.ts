import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import globalConfig from './config/global';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './accounts/accounts.module';
import { NonEmptyBodyPipe } from './pipes/non-empty-body.pipe';
import { sanitizeJson } from './utils/mongoose-sanitize-plugin';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [globalConfig],
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('databaseUrl'),
        connectionFactory: (conn) => {
          conn.plugin(sanitizeJson);
          return conn;
        },
      }),
      imports: [ConfigModule],
    }),
    AccountsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [NonEmptyBodyPipe],
})
export class AppModule {}
