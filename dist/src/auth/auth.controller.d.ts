import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
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
}
