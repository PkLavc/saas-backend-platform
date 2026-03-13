import { PrismaService } from '../prisma/prisma.service';
import { SetupSystemDto } from './dto/setup-system.dto';
export declare class BootstrapService {
    private prisma;
    constructor(prisma: PrismaService);
    setupSystem(setupDto: SetupSystemDto): Promise<{
        message: string;
        organization: {
            id: string;
            name: string;
        };
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
        };
    }>;
    isSystemInitialized(): Promise<boolean>;
}
