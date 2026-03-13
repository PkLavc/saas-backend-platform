import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createProjectDto: CreateProjectDto): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAll(organizationId: string, page?: number, limit?: number, filter?: any): Promise<{
        projects: {
            organizationId: string;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        }[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, organizationId: string): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    update(id: string, organizationId: string, updateProjectDto: UpdateProjectDto): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    remove(id: string, organizationId: string): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
}
