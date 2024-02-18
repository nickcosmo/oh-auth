import { SetMetadata } from '@nestjs/common';

export const RequiredScopes = (...scopes: string[]) =>
  SetMetadata('scopes', scopes);
