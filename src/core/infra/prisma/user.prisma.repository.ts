import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserMap } from 'src/core/application/mappers/user.map';
import { UserRepository } from 'src/core/application/ports/user.repository';
import { User } from 'src/core/domain/user';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string) {
    const userData = await this.prisma.user.findUnique({
      where: { id },
    });

    return userData ? UserMap.toDomain(userData) : undefined;
  }

  async register(user: User, password: string) {
    await this.prisma.user.create({
      data: {
        ...user.data,
        password,
      },
    });
  }
}
