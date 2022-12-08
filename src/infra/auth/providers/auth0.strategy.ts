import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0') {
  constructor(private config: ConfigService) {
    const auth0Config = config.get('authentication.auth0');
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${auth0Config.issuerUri}.well-known/jwks.json`,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: auth0Config.audience,
      issuer: auth0Config.issuerUri,
      algorithms: ['RS256'],
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return {
      providerUserId: payload.sub,
      provider: 'auth0',
      email: payload.username,
    };
  }
}
