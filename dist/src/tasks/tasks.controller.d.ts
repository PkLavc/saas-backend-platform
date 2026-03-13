import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
export declare class TasksController {
    private readonly tasksService;
    constructor(tasksService: TasksService);
    create(createTaskDto: CreateTaskDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        projectId: string;
        userId: string | null;
    }>;
    findAll(req: any, page: number, limit: number, status?: string): Promise<{
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
    findOne(id: string, req: any): Promise<{
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
    update(id: string, updateTaskDto: UpdateTaskDto, req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
    remove(id: string, req: any): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
