import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('queue.redis.host'),
          port: configService.get('queue.redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class QueueModule {}
