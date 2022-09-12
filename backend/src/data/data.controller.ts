import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { DataDto } from '../auth/dto/data.dto';
import { JwtGuard } from '../auth/guard';

@Controller('data')
export class DataController {
  @UseGuards(JwtGuard)
  @Put('add')
  add(@Request() req, @Body() data: DataDto) {
    console.log(req.user);
  }
}
