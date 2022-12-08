import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private config: ConfigService) {
    super(
      {
        header: 'Authorization',
        prefix: 'Bearer ',
      },
      true,
      async (apiKey, done) => {
        return this.validate(apiKey)
          .then(() => done(null, true))
          .catch((error) => done(error));
      },
    );
  }
  async validate(apiKey: string) {
    if (this.config.get<string>('authentication.apiPrivateKey') === apiKey) {
      return {
        agent: 'system',
      };
    } else {
      throw new UnauthorizedException();
    }
  }
}
