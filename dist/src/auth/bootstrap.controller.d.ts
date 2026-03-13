import { BootstrapService } from './bootstrap.service';
import { SetupSystemDto } from './dto/setup-system.dto';
export declare class BootstrapController {
    private bootstrapService;
    constructor(bootstrapService: BootstrapService);
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
}
