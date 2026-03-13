"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
const prisma_service_1 = require("../prisma/prisma.service");
const common_2 = require("@nestjs/common");
let AuthService = AuthService_1 = class AuthService {
    constructor(usersService, jwtService, prisma) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.logger = new common_2.Logger(AuthService_1.name);
    }
    async validateUser(email, password) {
        try {
            const user = await this.usersService.findByEmail(email);
            if (user && (await bcrypt.compare(password, user.password))) {
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        catch (error) {
            this.logger.error(`Error validating user ${email}:`, error.message);
            return null;
        }
    }
    async login(user) {
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
    async register(createUserDto) {
        try {
            const user = await this.prisma.$transaction(async (tx) => {
                const hashedPassword = await bcrypt.hash(createUserDto.password, 12);
                return await tx.user.create({
                    data: {
                        email: createUserDto.email,
                        password: hashedPassword,
                        firstName: createUserDto.firstName,
                        lastName: createUserDto.lastName,
                        role: 'USER',
                        organization: {
                            connect: { id: createUserDto.organizationId }
                        }
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
            });
            this.logger.log(`User registered successfully: ${user.email} in organization ${user.organization.name}`);
            try {
                await this.sendWelcomeEmail(user.email, user.firstName);
            }
            catch (emailError) {
                this.logger.warn(`Failed to send welcome email to ${user.email}:`, emailError.message);
            }
            const { password, ...result } = user;
            return result;
        }
        catch (error) {
            this.logger.error('Error registering user:', error.message);
            if (error.code === 'P2002') {
                throw new Error('Email address is already in use');
            }
            else if (error.code === 'P2003') {
                throw new Error('Invalid organization reference');
            }
            else if (error.code === 'P2025') {
                throw new Error('Organization not found');
            }
            else if (error.code === 'P2034') {
                throw new Error('Concurrent modification detected, please retry');
            }
            throw error;
        }
    }
    async sendWelcomeEmail(email, firstName) {
        const emailData = {
            to: email,
            subject: 'Welcome to SaaS Platform',
            template: 'welcome',
            data: { firstName }
        };
        const shouldFail = Math.random() < 0.1;
        if (shouldFail) {
            throw new Error('Email service temporarily unavailable');
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        this.logger.log(`Welcome email sent to ${email}`);
    }
    async bulkRegister(users) {
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
            });
            this.logger.log(`Bulk registration completed: ${results.length} users`);
            return results;
        }
        catch (error) {
            this.logger.error('Error in bulk registration:', error.message);
            throw error;
        }
    }
    async registerWithOrganization(userDto, organizationDto) {
        try {
            const result = await this.prisma.$transaction(async (tx) => {
                let organization;
                if (organizationDto) {
                    organization = await tx.organization.create({
                        data: {
                            name: organizationDto.name,
                        },
                    });
                }
                else {
                    organization = await tx.organization.findUnique({
                        where: { id: userDto.organizationId },
                    });
                    if (!organization) {
                        throw new Error('Organization not found');
                    }
                }
                const existingUser = await tx.user.findUnique({
                    where: { email: userDto.email },
                });
                if (existingUser) {
                    throw new Error('User already exists');
                }
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
            });
            this.logger.log(`User ${result.user.email} registered with organization ${result.organization.name}`);
            return result;
        }
        catch (error) {
            this.logger.error('Error in registration with organization:', error.message);
            throw error;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = AuthService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map