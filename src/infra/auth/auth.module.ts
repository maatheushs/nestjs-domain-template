import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiAuthGuard } from './api-auth.guard';
import { ApiKeyStrategy } from './providers/api-key.strategy';
import { Auth0Strategy } from './providers/auth0.strategy';
import { AzureStrategy } from './providers/azure.strategy';
import { UserAuthGuard } from './user-auth.guard';

@Module({
  imports: [ConfigModule],
  providers: [
    Auth0Strategy,
    AzureStrategy,
    ApiKeyStrategy,
    UserAuthGuard,
    ApiAuthGuard,
  ],
})
export class AuthModule {}
