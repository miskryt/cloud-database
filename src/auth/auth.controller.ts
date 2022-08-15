import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LocalGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  async signin(@Request() req) {
    return req.user;
  }

  @Post('signup')
  async signup(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    return {
      msg: 'User successfully registered',
      userId: user.id,
    };
  }
}
