import { AuthModule } from '@infra/auth/auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { RestModule } from './rest/rest.module';

@Module({
  imports: [RestModule, forwardRef(() => AuthModule)],
})
export class ApiModule {}
