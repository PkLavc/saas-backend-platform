import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  async create(createOrganizationDto: CreateOrganizationDto) {
    return this.prisma.organization.create({
      data: createOrganizationDto,
    });
  }

  async findAll(page: number = 1, limit: number = 10, filter?: any) {
    const skip = (page - 1) * limit;
    const where = { ...filter };
    const [organizations, total] = await Promise.all([
      this.prisma.organization.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.organization.count({ where }),
    ]);
    return { organizations, total, page, limit };
  }

  async findOne(id: string) {
    return this.prisma.organization.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateOrganizationDto: UpdateOrganizationDto) {
    return this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.organization.delete({
      where: { id },
    });
  }
}