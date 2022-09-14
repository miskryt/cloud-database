import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
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

  @UseGuards(JwtGuard)
  @Get('get')
  async getAll(@Request() req) {
    return await this.dataService.get(req.user.userId);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  async delete(@Param() params, @Request() req) {
    return await this.dataService.deletePost(
      Number(params.id),
      Number(req.user.userId),
    );
  }
}
