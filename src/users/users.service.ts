import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(organizationId: string, page: number = 1, limit: number = 10, filter?: any) {
    const skip = (page - 1) * limit;
    const where = { organizationId, ...filter };
    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { users, total, page, limit };
  }

  async findOne(id: string, organizationId: string) {
    return this.prisma.user.findUnique({
      where: { id, organizationId },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, organizationId: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id, organizationId },
      data: updateUserDto,
    });
  }

  async remove(id: string, organizationId: string) {
    return this.prisma.user.delete({
      where: { id, organizationId },
    });
  }
}