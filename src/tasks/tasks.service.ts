import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async findAll(organizationId: string, page: number = 1, limit: number = 10, filter?: any) {
    const skip = (page - 1) * limit;
    const where = {
      project: { organizationId },
      ...filter,
    };
    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        include: { project: true, user: true },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.task.count({ where }),
    ]);
    return { tasks, total, page, limit };
  }

  async findOne(id: string, organizationId: string) {
    return this.prisma.task.findFirst({
      where: { id, project: { organizationId } },
      include: { project: true, user: true },
    });
  }

  async update(id: string, organizationId: string, updateTaskDto: UpdateTaskDto) {
    return this.prisma.task.updateMany({
      where: { id, project: { organizationId } },
      data: updateTaskDto,
    });
  }

  async remove(id: string, organizationId: string) {
    return this.prisma.task.deleteMany({
      where: { id, project: { organizationId } },
    });
  }
}