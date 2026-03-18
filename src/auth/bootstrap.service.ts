import { Injectable, ForbiddenException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { SetupSystemDto } from './dto/setup-system.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../constants/user-roles';

@Injectable()
export class BootstrapService {
  constructor(private prisma: PrismaService) {}

  async setupSystem(setupDto: SetupSystemDto) {
    // Prevent setup if Prisma is in mock mode (no real database available)
    if (this.prisma.getIsMockMode()) {
      throw new Error('Database connection failed - setup requires a real database connection');
    }

    // Check if system is already initialized
    const existingUsers = await this.prisma.user.count();
    const existingOrgs = await this.prisma.organization.count();

    if (existingUsers > 0 || existingOrgs > 0) {
      throw new ForbiddenException('System is already initialized. Setup endpoint can only be used on a fresh database.');
    }

    return this.prisma.$transaction(async (tx) => {
      // Create the root organization using the name field
      const organization = await tx.organization.create({
        data: {
          name: setupDto.name,
        },
      });

      // Hash the password
      const hashedPassword = await bcrypt.hash(setupDto.password, 10);

      // Create the super admin user
      const user = await tx.user.create({
        data: {
          email: setupDto.email,
          password: hashedPassword,
          firstName: setupDto.firstName,
          lastName: setupDto.lastName,
          role: UserRole.SUPER_ADMIN,
          organizationId: organization.id,
        },
      });

      return {
        message: 'System initialized successfully',
        organization: {
          id: organization.id,
          name: organization.name,
        },
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
      };
    });
  }

  async isSystemInitialized(): Promise<boolean> {
    const [userCount, orgCount] = await Promise.all([
      this.prisma.user.count(),
      this.prisma.organization.count(),
    ]);

    return userCount > 0 || orgCount > 0;
  }
}
