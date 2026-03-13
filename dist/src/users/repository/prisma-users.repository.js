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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaUsersRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const library_1 = require("@prisma/client/runtime/library");
const common_2 = require("@nestjs/common");
let PrismaUsersRepository = class PrismaUsersRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createUserDto) {
        try {
            return await this.prisma.$transaction(async (tx) => {
                const organization = await tx.organization.findUnique({
                    where: { id: createUserDto.organizationId },
                });
                if (!organization) {
                    throw new common_1.BadRequestException('The specified Organization does not exist.');
                }
                const existingUser = await tx.user.findUnique({
                    where: { email: createUserDto.email },
                });
                if (existingUser) {
                    throw new common_2.ConflictException('Email already exists');
                }
                return await tx.user.create({
                    data: createUserDto,
                });
            });
        }
        catch (error) {
            if (error.code === 'P2003') {
                throw new common_2.ConflictException('The specified Organization does not exist.');
            }
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new common_2.ConflictException('Email already exists');
                }
            }
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_2.ServiceUnavailableException('Database connection failed');
            }
            throw error;
        }
    }
    async findAll(organizationId, page, limit, filter) {
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
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_2.ServiceUnavailableException('Database connection failed');
            }
            throw error;
        }
    }
    async findOne(id, organizationId) {
        try {
            return await this.prisma.user.findUnique({
                where: { id, organizationId },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_2.ServiceUnavailableException('Database connection failed');
            }
            throw error;
        }
    }
    async findByEmail(email) {
        try {
            return await this.prisma.user.findUnique({
                where: { email },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_2.ServiceUnavailableException('Database connection failed');
            }
            throw error;
        }
    }
    async update(id, organizationId, updateUserDto) {
        try {
            return await this.prisma.user.update({
                where: { id, organizationId },
                data: updateUserDto,
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_2.NotFoundException('User not found');
                }
            }
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_2.ServiceUnavailableException('Database connection failed');
            }
            throw error;
        }
    }
    async remove(id, organizationId) {
        try {
            return await this.prisma.user.delete({
                where: { id, organizationId },
            });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new common_2.NotFoundException('User not found');
                }
            }
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_2.ServiceUnavailableException('Database connection failed');
            }
            throw error;
        }
    }
    async organizationExists(organizationId) {
        try {
            const organization = await this.prisma.organization.findUnique({
                where: { id: organizationId },
            });
            return !!organization;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientInitializationError) {
                throw new common_2.ServiceUnavailableException('Database connection failed');
            }
            throw error;
        }
    }
};
exports.PrismaUsersRepository = PrismaUsersRepository;
exports.PrismaUsersRepository = PrismaUsersRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUsersRepository);
//# sourceMappingURL=prisma-users.repository.js.map