import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// todo: inject strategies from config
export class ApiAuthGuard extends AuthGuard(['api-key']) {}
