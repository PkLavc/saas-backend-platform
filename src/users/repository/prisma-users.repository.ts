import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUsersRepository } from './users.repository.interface';
import { PrismaClientKnownRequestError, PrismaClientInitializationError } from '@prisma/client/runtime/library';
import { ConflictException, ServiceUnavailableException, NotFoundException } from '@nestjs/common';

@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      // Use database transaction to prevent race condition
      return await this.prisma.$transaction(async (tx) => {
        // Validate organization exists within transaction
        const organization = await tx.organization.findUnique({
          where: { id: createUserDto.organizationId },
        });

        if (!organization) {
          throw new BadRequestException('The specified Organization does not exist.');
        }

        // Check for existing user with same email within transaction
        const existingUser = await tx.user.findUnique({
          where: { email: createUserDto.email },
        });

        if (existingUser) {
          throw new ConflictException('Email already exists');
        }

        // Create user within the same transaction
        return await tx.user.create({
          data: createUserDto,
        });
      });
    } catch (error) {
      // Handle specific Prisma foreign key constraint error
      if (error.code === 'P2003') {
        throw new ConflictException('The specified Organization does not exist.');
      }
      
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Email already exists');
        }
      }
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException('Database connection failed');
      }
      throw error;
    }
  }

  async findAll(organizationId: string, page: number, limit: number, filter?: any): Promise<any> {
    try {
      const safePage = page || 1;
      const safeLimit = limit || 10;
      const skip = (safePage - 1) * safeLimit;
      const where = { organizationId, ...filter };
      const [users, total] = await Promise.all([
        this.prisma.user.findMany({
          where,
          skip,
          take: safeLimit,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.user.count({ where }),
      ]);
      return { users, total, page: safePage, limit: safeLimit };
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException('Database connection failed');
      }
      throw error;
    }
  }

  async findOne(id: string, organizationId: string): Promise<any | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { id, organizationId },
      });
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException('Database connection failed');
      }
      throw error;
    }
  }

  async findByEmail(email: string): Promise<any | null> {
    try {
      return await this.prisma.user.findUnique({
        where: { email },
      });
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException('Database connection failed');
      }
      throw error;
    }
  }

  async update(id: string, organizationId: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      return await this.prisma.user.update({
        where: { id, organizationId },
        data: updateUserDto,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException('Database connection failed');
      }
      throw error;
    }
  }

  async remove(id: string, organizationId: string): Promise<any> {
    try {
      return await this.prisma.user.delete({
        where: { id, organizationId },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('User not found');
        }
      }
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException('Database connection failed');
      }
      throw error;
    }
  }

  async organizationExists(organizationId: string): Promise<boolean> {
    try {
      const organization = await this.prisma.organization.findUnique({
        where: { id: organizationId },
      });
      return !!organization;
    } catch (error) {
      if (error instanceof PrismaClientInitializationError) {
        throw new ServiceUnavailableException('Database connection failed');
      }
      throw error;
    }
  }
}
