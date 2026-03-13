import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { IUsersRepository } from './users.repository.interface';
export declare class PrismaUsersRepository implements IUsersRepository {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<any>;
    findAll(organizationId: string, page: number, limit: number, filter?: any): Promise<any>;
    findOne(id: string, organizationId: string): Promise<any | null>;
    findByEmail(email: string): Promise<any | null>;
    update(id: string, organizationId: string, updateUserDto: UpdateUserDto): Promise<any>;
    remove(id: string, organizationId: string): Promise<any>;
    organizationExists(organizationId: string): Promise<boolean>;
}
