import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy } from 'passport-azure-ad';

@Injectable()
export class AzureStrategy extends PassportStrategy(BearerStrategy, 'azure') {
  constructor(private config: ConfigService) {
    const azureConfig = config.get('authentication.azure');
    super({
      identityMetadata: `${azureConfig.tenantUrl}v2.0/.well-known/openid-configuration`,
      clientID: azureConfig.clientID,
    });
  }
  async validate(payload: any) {
    return {
      providerUserId: payload.oid,
      provider: 'azure',
      email: payload.preferred_username,
    };
  }
}
