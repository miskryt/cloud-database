import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { DataDto } from '../auth/dto/data.dto';
import { JwtGuard } from '../auth/guard';
import { PrismaService } from '../prisma/prisma.service';
import { DataService } from './data.service';

@Controller('data')
export class DataController {
  constructor(private dataService: DataService) {}

  @UseGuards(JwtGuard)
  @Put('add')
  add(@Request() req, @Body() data: DataDto) {
    return this.dataService.add(req.user.userId, data);
  }
}
