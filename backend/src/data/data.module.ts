import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { JwtStrategy } from '../auth/strategy';
import { JwtModule } from '@nestjs/jwt';
import { DataService } from './data.service';

@Module({
  controllers: [DataController],
  providers: [JwtStrategy, DataService],
  exports: [],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
})
export class DataModule {}
