import {
  ForbiddenException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { AuthDto, CreateUserDto } from './dto';
import { UserAlreadyExistException } from './exceptions/user.exists';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private config: ConfigService) {}

  @HttpCode(HttpStatus.OK)
  async signup(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email.toLowerCase(),
          hash,
        },
      });

      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new UserAlreadyExistException();
        }
      }

      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }

    const passwordValid = await argon.verify(user.hash, password);

    if (user && passwordValid) {
      return user;
    }

    if (!passwordValid) {
      throw new ForbiddenException('Credentials are incorrect!');
    }
  }
}
