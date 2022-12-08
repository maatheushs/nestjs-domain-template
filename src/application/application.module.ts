import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { HealthModule } from './health/health.module';
import { QueueModule } from './queue/queue.module';
import { EventBusModule } from './event-bus/event-bus.module';

@Module({
  imports: [ApiModule, HealthModule, QueueModule, EventBusModule],
})
export class ApplicationModule {}
