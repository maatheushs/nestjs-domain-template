import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export const config: any = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  subscribers: [__dirname + '/../infra/database/**/*.subscriber{.ts,.js}'],
  logging: process.env.DATABASE_LOGGING === 'true',
  logger: process.env.DATABASE_LOGGER || 'advanced-console',
  synchronize: false,
  migrationsRun: (process.env.DATABASE_MIGRATION_RUN || 'true') === 'true',
  migrations: [__dirname + '/../infra/database/migrations/**/*{.ts,.js}'],
};

export default registerAs('database', () => ({
  ...config,
}));
