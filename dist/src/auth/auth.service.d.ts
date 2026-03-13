import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private prisma;
    private readonly logger;
    constructor(usersService: UsersService, jwtService: JwtService, prisma: PrismaService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(createUserDto: CreateUserDto): Promise<{
        organization: {
            name: string;
            id: string;
        };
        email: string;
        firstName: string;
        lastName: string;
        organizationId: string;
        id: string;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    private sendWelcomeEmail;
    bulkRegister(users: CreateUserDto[]): Promise<any[]>;
    registerWithOrganization(userDto: CreateUserDto, organizationDto?: {
        name: string;
        email: string;
    }): Promise<{
        user: {
            email: string;
            password: string;
            firstName: string;
            lastName: string;
            organizationId: string;
            id: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
        organization: any;
    }>;
}
