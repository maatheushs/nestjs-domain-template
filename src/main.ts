import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { ApiDocSetup } from '@application/api/apidoc.setup';
import { BusinessExceptionsFilter } from '@infra/errors/business-exception.filter';
import { ServerExceptionsFilter } from '@infra/errors/server-exception.filter';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);

  ApiDocSetup.load(app);

  const configService = app.get(ConfigService);

  app.useLogger(configService.get('application.logLevel'));
  app.useGlobalFilters(new BusinessExceptionsFilter());
  app.useGlobalFilters(new ServerExceptionsFilter());

  await app.listen(configService.get('application.port'));
}

bootstrap();
