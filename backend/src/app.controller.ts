import { UseGuards, Controller, Get } from '@nestjs/common';
import { AuthGuard } from './guards/auth.guard';
import { RequiredScopes } from './decorators/required-scopes.decorator';
import { ScopeGuard } from './guards/scope.guard';
import { Scope } from './enums/scopes.enum';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor() {}

  @UseGuards(ScopeGuard)
  @RequiredScopes(Scope.READ_TEST)
  @Get('/test')
  auth(): { message: string } {
    return { message: 'Success!' };
  }
}
