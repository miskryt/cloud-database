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

  async search(userId: number, take: number, skip: number, search: string) {
    const count = await this.prisma.data.count({
      where: {
        userId: userId,
        value: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });

    skip = skip * take;

    const records = await this.prisma.data.findMany({
      take: take,
      skip: skip,

      where: {
        userId: userId,
        OR: [
          {
            value: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            key: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });

    const result = {
      count: count,
      rows: records,
    };

    return result;
  }

  async get(userId: number, take: number, skip: number) {
    const count = await this.prisma.data.count({
      where: {
        userId: userId,
      },
    });

    skip = skip * take;

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
