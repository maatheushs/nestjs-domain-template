import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [ConfigurationModule, DatabaseModule, EventModule],
})
export class InfraModule {}
