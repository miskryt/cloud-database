import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Post,
  Redirect,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, CreateUserDto } from './dto';
import { ValidationError } from 'class-validator';
import { LocalGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: AuthDto, @Res() res) {
    return res.redirect('/users/me');
  }

  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() dto: CreateUserDto) {
    const user = await this.authService.signup(dto);
    return {
      msg: 'User successfully registered',
      userId: user.id,
    };
  }
}
