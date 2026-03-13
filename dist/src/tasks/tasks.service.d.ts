import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTaskDto: CreateTaskDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        projectId: string;
        userId: string | null;
    }>;
    findAll(organizationId: string, page?: number, limit?: number, filter?: any): Promise<{
        tasks: ({
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
            project: {
                organizationId: string;
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            status: string;
            projectId: string;
            userId: string | null;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string, organizationId: string): Promise<{
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
        project: {
            organizationId: string;
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        projectId: string;
        userId: string | null;
    }>;
    update(id: string, organizationId: string, updateTaskDto: UpdateTaskDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string, organizationId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
