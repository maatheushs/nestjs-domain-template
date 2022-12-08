import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export class ApiDocSetup {
  public static load(app: INestApplication) {
    const configService = app.get(ConfigService);

    const auth0Config = configService.get('authentication.auth0');
    const azureConfig = configService.get('authentication.azure');

    const config = new DocumentBuilder()
      .setTitle('${template.project_name}')
      .setDescription('[A detalhar]')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
        },
        'ApiPrivateKey',
      )
      .addOAuth2(
        {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: `${auth0Config.issuerUri}authorize?audience=${auth0Config.audience}`,
              tokenUrl: auth0Config.audience,
              scopes: {
                openid: 'OpenId',
                profile: 'Profile',
                email: 'E-mail',
              },
            },
          },
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'Auth0',
      )
      .addOAuth2(
        {
          type: 'oauth2',
          flows: {
            implicit: {
              authorizationUrl: `${azureConfig.tenantUrl}oauth2/v2.0/authorize`,
              scopes: { 'User.Read': 'Read user profile' },
            },
          },
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
        },
        'Azure',
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('apidoc', app, document);
  }
}
