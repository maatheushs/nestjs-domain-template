import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export default registerAs('authentication', () => ({
  azure: {
    tenantUrl: process.env.AZURE_TENANT_URL,
    clientID: process.env.AZURE_CLIENT_ID,
  },
  auth0: {
    issuerUri: process.env.AUTH0_ISSUER_URI,
    audience: process.env.AUTH0_ISSUER_AUDIENCE,
  },
  apiPrivateKey: process.env.API_PRIVATE_KEY,
}));
