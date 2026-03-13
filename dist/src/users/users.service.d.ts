import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaUsersRepository } from './repository/prisma-users.repository';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: PrismaUsersRepository);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(organizationId: string, page?: number, limit?: number, filter?: any): Promise<any>;
    findOne(id: string, organizationId: string): Promise<any>;
    findByEmail(email: string): Promise<any>;
    update(id: string, organizationId: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string, organizationId: string): Promise<any>;
    organizationExists(organizationId: string): Promise<boolean>;
}
