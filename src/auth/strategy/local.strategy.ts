import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({});
  }

  async validate(payload: { id: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    delete user.hash;
    return user;
  }
}
