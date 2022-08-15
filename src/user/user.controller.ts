import { Controller, Get, UseGuards } from '@nestjs/common';
import { LocalGuard } from '../auth/guard';
import { AuthenticatedGuard } from '../auth/guard/authenticated.guard';

@Controller('users')
export class UserController {
  @UseGuards(AuthenticatedGuard)
  @Get('me')
  getMe() {
    return 'I am the user';
  }
}
