import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import applicationConfig from '@config/application.config';
import envValidation from './env.validation';
import databaseConfig from '@config/database.config';
import queueConfig from '@config/queue.config';
import authenticationConfig from '@config/authentication.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: envValidation,
      validationOptions: {
        abortEarly: true,
      },
      load: [
        applicationConfig,
        databaseConfig,
        queueConfig,
        authenticationConfig,
      ],
      isGlobal: true,
    }),
  ],
})
export class ConfigurationModule {}
