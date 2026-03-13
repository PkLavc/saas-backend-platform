import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(createProjectDto: CreateProjectDto, req: any): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    findAll(req: any, page: number, limit: number, name?: string): Promise<{
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
    findOne(id: string, req: any): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    update(id: string, updateProjectDto: UpdateProjectDto, req: any): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
    remove(id: string, req: any): Promise<{
        organizationId: string;
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    }>;
}
