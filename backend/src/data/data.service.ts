import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DataDto } from '../auth/dto/data.dto';

@Injectable()
export class DataService {
  constructor(private prisma: PrismaService) {}

  async add(userId: number, data: DataDto) {
    const record = await this.prisma.data.create({
      data: {
        userId: userId,
        key: data.key,
        value: data.value,
      },
    });

    return record;
  }

  async get(userId: number, take: number, skip: number) {
    const count = await this.prisma.data.count();

    const records = await this.prisma.data.findMany({
      take: take,
      skip: skip,
      where: {
        userId: userId,
      },
    });

    const result = {
      count: count,
      rows: records,
    };

    return result;
  }

  async deletePost(id: number, userId: number) {
    const result = await this.prisma.data.delete({
      where: {
        id: id,
      },
    });

    return result;
  }
}
