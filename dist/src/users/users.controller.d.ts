import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto, req: any): Promise<any>;
    findAll(req: any, page: number, limit: number, email?: string): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<any>;
    remove(id: string, req: any): Promise<any>;
}
