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
exports.BootstrapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
const user_roles_1 = require("../constants/user-roles");
let BootstrapService = class BootstrapService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async setupSystem(setupDto) {
        const existingUsers = await this.prisma.user.count();
        const existingOrgs = await this.prisma.organization.count();
        if (existingUsers > 0 || existingOrgs > 0) {
            throw new common_1.ForbiddenException('System is already initialized. Setup endpoint can only be used on a fresh database.');
        }
        return this.prisma.$transaction(async (tx) => {
            const organization = await tx.organization.create({
                data: {
                    name: setupDto.name,
                },
            });
            const hashedPassword = await bcrypt.hash(setupDto.password, 10);
            const user = await tx.user.create({
                data: {
                    email: setupDto.email,
                    password: hashedPassword,
                    firstName: setupDto.firstName,
                    lastName: setupDto.lastName,
                    role: user_roles_1.UserRole.SUPER_ADMIN,
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
    async isSystemInitialized() {
        const [userCount, orgCount] = await Promise.all([
            this.prisma.user.count(),
            this.prisma.organization.count(),
        ]);
        return userCount > 0 || orgCount > 0;
    }
};
exports.BootstrapService = BootstrapService;
exports.BootstrapService = BootstrapService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BootstrapService);
//# sourceMappingURL=bootstrap.service.js.map