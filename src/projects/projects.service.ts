import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    return this.prisma.project.create({
      data: createProjectDto,
    });
  }

  async findAll(organizationId: string, page: number = 1, limit: number = 10, filter?: any) {
    const skip = (page - 1) * limit;
    const where = { organizationId, ...filter };
    const [projects, total] = await Promise.all([
      this.prisma.project.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.project.count({ where }),
    ]);
    return { projects, total, page, limit };
  }

  async findOne(id: string, organizationId: string) {
    return this.prisma.project.findUnique({
      where: { id, organizationId },
    });
  }

  async update(id: string, organizationId: string, updateProjectDto: UpdateProjectDto) {
    return this.prisma.project.update({
      where: { id, organizationId },
      data: updateProjectDto,
    });
  }

  async remove(id: string, organizationId: string) {
    return this.prisma.project.delete({
      where: { id, organizationId },
    });
  }
}