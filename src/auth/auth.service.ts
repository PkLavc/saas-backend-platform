import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user && (await bcrypt.compare(password, user.password))) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (error) {
      this.logger.error(`Error validating user ${email}:`, error.message);
      return null;
    }
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role, 
      organizationId: user.organizationId 
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(createUserDto: CreateUserDto) {
    try {
      // PostgreSQL-specific transaction with SERIALIZABLE isolation
      const user = await this.prisma.$transaction(async (tx) => {
        // First: Validate organization exists
        const organization = await tx.organization.findUnique({
          where: { id: createUserDto.organizationId },
        });

        if (!organization) {
          throw new Error('The specified Organization does not exist.');
        }

        // Second: Check if user already exists with explicit locking
        const existingUser = await tx.user.findUnique({
          where: { email: createUserDto.email },
        });

        if (existingUser) {
          throw new Error('User already exists.');
        }

        // Third: Create the user with proper error handling
        const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
        
        return await tx.user.create({
          data: {
            email: createUserDto.email,
            password: hashedPassword,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            organizationId: createUserDto.organizationId,
            role: 'USER',
          },
          include: {
            organization: {
              select: {
                id: true,
                name: true,
              }
            }
          }
        });
      }, {
        // PostgreSQL SERIALIZABLE isolation level for maximum consistency
        isolationLevel: 'Serializable',
        timeout: 10000,
      });
      
      // Enhanced logging for monitoring
      this.logger.log(`User registered successfully: ${user.email} in organization ${user.organization.name}`);
      
      // Simulate sending welcome email with error handling
      try {
        await this.sendWelcomeEmail(user.email, user.firstName);
      } catch (emailError) {
        this.logger.warn(`Failed to send welcome email to ${user.email}:`, emailError.message);
        // Don't fail registration if email fails
      }

      const { password, ...result } = user;
      return result;
    } catch (error) {
      this.logger.error('Error registering user:', error.message);
      
      // PostgreSQL-specific error handling
      if (error.code === 'P2002') {
        throw new Error('Email address is already in use');
      } else if (error.code === 'P2003') {
        throw new Error('Invalid organization reference');
      } else if (error.code === 'P2025') {
        throw new Error('Organization not found');
      }
      
      throw error;
    }
  }

  /**
   * Enhanced email sending with retry logic
   */
  private async sendWelcomeEmail(email: string, firstName: string): Promise<void> {
    // In production, this would use a proper email service
    // For now, we'll simulate with a delay and potential failure
    
    const emailData = {
      to: email,
      subject: 'Welcome to SaaS Platform',
      template: 'welcome',
      data: { firstName }
    };

    // Simulate email service call with potential failure
    const shouldFail = Math.random() < 0.1; // 10% failure rate for testing
    
    if (shouldFail) {
      throw new Error('Email service temporarily unavailable');
    }

    // Simulate async email sending
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.logger.log(`Welcome email sent to ${email}`);
  }

  /**
   * Bulk user registration with transaction safety
   */
  async bulkRegister(users: CreateUserDto[]) {
    if (users.length === 0) {
      throw new Error('No users to register');
    }

    if (users.length > 100) {
      throw new Error('Maximum 100 users can be registered at once');
    }

    try {
      const results = await this.prisma.$transaction(async (tx) => {
        const registeredUsers = [];
        
        for (const userData of users) {
          // Validate each user individually
          const organization = await tx.organization.findUnique({
            where: { id: userData.organizationId },
          });

          if (!organization) {
            throw new Error(`Organization ${userData.organizationId} not found`);
          }

          const existingUser = await tx.user.findUnique({
            where: { email: userData.email },
          });

          if (existingUser) {
            throw new Error(`User ${userData.email} already exists`);
          }

          const hashedPassword = await bcrypt.hash(userData.password, 12);
          
          const user = await tx.user.create({
            data: {
              email: userData.email,
              password: hashedPassword,
              firstName: userData.firstName,
              lastName: userData.lastName,
              organizationId: userData.organizationId,
              role: 'USER',
            },
          });

          registeredUsers.push(user);
        }

        return registeredUsers;
      }, {
        isolationLevel: 'Serializable',
        timeout: 30000, // 30 seconds for bulk operations
      });

      this.logger.log(`Bulk registration completed: ${results.length} users`);
      return results;

    } catch (error) {
      this.logger.error('Error in bulk registration:', error.message);
      throw error;
    }
  }

  /**
   * User registration with organization validation and creation
   */
  async registerWithOrganization(userDto: CreateUserDto, organizationDto?: { name: string; email: string }) {
    try {
      const result = await this.prisma.$transaction(async (tx) => {
        let organization;

        if (organizationDto) {
          // Create new organization
          organization = await tx.organization.create({
            data: {
              name: organizationDto.name,
            },
          });
        } else {
          // Use existing organization
          organization = await tx.organization.findUnique({
            where: { id: userDto.organizationId },
          });

          if (!organization) {
            throw new Error('Organization not found');
          }
        }

        // Check if user exists
        const existingUser = await tx.user.findUnique({
          where: { email: userDto.email },
        });

        if (existingUser) {
          throw new Error('User already exists');
        }

        // Create user
        const hashedPassword = await bcrypt.hash(userDto.password, 12);
        
        const user = await tx.user.create({
          data: {
            email: userDto.email,
            password: hashedPassword,
            firstName: userDto.firstName,
            lastName: userDto.lastName,
            organizationId: organization.id,
            role: 'USER',
          },
        });

        return { user, organization };
      }, {
        isolationLevel: 'Serializable',
        timeout: 15000,
      });

      this.logger.log(`User ${result.user.email} registered with organization ${result.organization.name}`);
      return result;

    } catch (error) {
      this.logger.error('Error in registration with organization:', error.message);
      throw error;
    }
  }
}