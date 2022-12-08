import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {
  constructor(private configService: ConfigService) {}
  @Get()
  getAppName(): string {
    return (
      'nestjs-domain-template<br>Node mode: ' +
      this.configService.get('application.nodeEnv')
    );
  }
}
