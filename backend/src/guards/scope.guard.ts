import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuthData } from 'src/interfaces/auth-data.interface';

@Injectable()
export class ScopeGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authData = request['authData'] as IAuthData;
    const scopes = this.reflector.getAllAndOverride<string[]>('scopes', [
      context.getHandler(),
      context.getClass(),
    ]);
    return scopes.every((scope) => authData.permissions.includes(scope));
  }
}
