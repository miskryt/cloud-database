import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DataDto } from '../auth/dto/data.dto';

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  async add(userId: number, data: DataDto) {
    const record = this.prisma.data.create({
      data: {
        userId: userId,
        key: data.key,
        value: data.value,
      },
    });

    return record;
  }
}
