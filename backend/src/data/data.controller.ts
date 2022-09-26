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
    if (String(req.query.search).length > 0) {
      return await this.dataService.search(
        Number(req.user.userId),
        Number(req.query.pageSize),
        Number(req.query.page),
        String(req.query.search),
      );
    } else {
      return await this.dataService.get(
        Number(req.user.userId),
        Number(req.query.pageSize),
        Number(req.query.page),
      );
    }
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
