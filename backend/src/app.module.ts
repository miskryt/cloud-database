import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataModule } from './data/data.module';

@Module({
  imports: [AuthModule, UserModule, PrismaModule, DataModule],
})
export class AppModule {}
