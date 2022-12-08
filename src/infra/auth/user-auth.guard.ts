import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// todo: inject strategies from config
export class UserAuthGuard extends AuthGuard(['auth0', 'azure']) {}
